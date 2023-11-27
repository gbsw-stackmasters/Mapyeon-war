import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import UsersEntity from 'src/entities/auth.entity';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    private readonly jwtService: JwtService
  ){}
async isEmaliExist(req: Request, res: Response) {
    const {id} = req.body;

    try{
        if(!id) throw ({status: 400, message:"이메일을 입력해주세요"});
        const isExist = await this.userRepository.findOne({
            where: {
                id
            }
        });

        if(isExist){
            return res.json({
                success:false,
                message:"등록된 메일입니다."
            })
        }
        return res.json({
            success:true,
            message:"등록가능한 메일입니다."
        })


    }catch(err){
        return res.status(err.status).json({
            success:false,
            message: err.message
        })  
    }
}

async login(req: Request, res: Response) {
    const {id, pw} = req.body;

    try{
        if (!id) throw ({ status: 400, message: '이메일을 입력해주세요' })
        if (!pw) throw ({ status: 400, message: '비밀번호를 입력해주세요' })

        const isExist = await this.userRepository.findOne({
            where: {id} //email만 비교하여 추출
        });
        
        if(!isExist){
            return res.json({
                success:false,
                message: '없는 아이디 입니다'
            })  
        }

        if(await bcrypt.compare(pw,isExist.pw)){ // hash 암호를 비교
            const token = await this.jwtService.sign(
                {
                  uuid: isExist.uuid
                },
                {
                  secret: process.env.SECRET_TOKEN,
                }
              );
              res.cookie('successLogin', token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
            return res.status(200).json({
                success: true,
                message: "로그인 완료",
                token
            })
        }
        return res.json({
            success:false,
            message: '비밀번호가 틀렸습니다'
        })  


    } catch (err){
        return res.status(err.status).json({
            success:false,
            message: err.message
        })  
    }

}

async register(req: Request, res: Response) {
    const { id, pw,isEmailAuth,type,name,email } = req.body;

    try {
        if (!id) throw ({ status: 400, message: '닉네임을 입력해주세요' })
        if (!email) throw ({ status: 400, message: '이메일을 입력해주세요' })
        if (!pw) throw ({ status: 400, message: '비밀번호를 입력해주세요' })
        if (!name) throw ({ status: 400, message: '이름을 입력해주세요' })
        if (!type)  throw ({ status: 400, message: '타입을 입력해주세요' })
        if(!isEmailAuth) throw({status: 400, message: '이메일 인증을 해주세요'})
    } catch (err) {
        return res.status(err.status).json({
            success:false,
            message: err.message
        });
    }
    const password = await bcrypt.hash(pw, 10)

    await this.userRepository.insert({
      id,
      pw:password,
      email,
      type,
      name
    })

    return res.status(200).json({
        success: true,
        message: '회원가입 완료'
    })
}

async logout(res:Response){
    res.clearCookie("successLogin")
    res.json({
        success:true,
        message:"로그아웃 완료"
    })
}

async isLogin(req:Request,res:Response){
    const successLogin = req.headers.authorization;

    if(!successLogin){   
        return res.json({
            success:false
        })
    }

    try{
        const verify = await this.jwtService.verify(successLogin,{secret: process.env.SECRET_TOKEN});
        const users =  await this.userRepository.findOne({
            where: {
                uuid: verify.uuid
            }
        })
        return res.json({
            success:true,
            users
            
        })

    } catch(err){
        return res.status(403).json({
            success: false,
            message: "잘못된 접근입니다."
        })
    }
}
async list(req:Request,res:Response){
    const successLogin = req.headers.authorization;
    const verify = this.jwtService.verify(successLogin,{secret: process.env.SECRET_TOKEN})
    const user = await this.userRepository.findOne({
        where: {
            uuid: verify.uuid
        },
    });
    try{
        if(!user){ throw {status: 400 , message: "잘못된 토큰입니다"}};
        if(user.type !== 'admin'){ throw {status: 403 , message: "어드민이 아닙니다."}};
    }catch(err){
        return res.status(err.status ?? 500).json({
            success: false,
            massage: err.message ?? 'Internal Error',
        });
    }

    const users = await this.userRepository.find();
    
    return res.status(200).json({
        success: true,
        users
    })
}
async changeType(req:Request,res:Response){
    const successLogin = req.headers.authorization;
    const {uuid,type} = req.body;
    const verify = this.jwtService.verify(successLogin,{secret: process.env.SECRET_TOKEN})
    const user = await this.userRepository.findOne({
        where: {
            uuid: verify.uuid
        },
    });

    try{
        if(!user){ throw {status: 400 , message: "잘못된 토큰입니다"}};
        if(user.type !== 'admin'){ throw {status: 403 , message: "어드민이 아닙니다."}};
        if(!type){ throw {status: 400, meessage: "type를 입력해주세요"}};
        if(!uuid){ throw {status: 400, meessage: "uuid를 입력해주세요"}};
    }catch(err){
        return res.status(err.status ?? 500).json({
            success: false,
            massage: err.message ?? 'Internal Error',
        });
    }
    
    const result = await this.userRepository.update(
        {uuid},
        {type}
    )

    return res.status(200).json({
        success: true,
        message: "변경완료"
    })


}
}

