import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Request,Response } from 'express';
import BoardEntity from 'src/entities/board.entity';
import AuthEntity from 'src/entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import UsersEntity from 'src/entities/auth.entity';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>,
        @InjectRepository(UsersEntity)
        private readonly authRepository: Repository<AuthEntity>,
        private readonly jwtService: JwtService
    ){}
    async create(req: Request,res: Response) {
        const successLogin = req.headers.authorization;
        const {title,content,isShow} = req.body;
        const verify = this.jwtService.verify(successLogin,{secret: process.env.SECRET_TOKEN})
        const user = await this.authRepository.findOne({
            where: {
                uuid: verify.uuid
            },
        });

        try{
            if(!title){ throw {status: 400, message: '제목을 입력해주세요'} };
            if(!content){ throw {status: 400, message: '내용을 입력해주세요'} };
            if(!user){ throw {status: 400 , message: "잘못된 토큰입니다"}};
            if(isShow === null) { throw {status: 400 , message: "보여줄껀지 알려주세요"}};
        }catch(err){
            return res.status(err.status ?? 500).json({
                success: false,
                massage: err.message ?? 'Internal Error',
            });
        }

        await this.boardRepository.insert({
            title,
            content,
            user,
            isShow
        })

        return res.status(200).json({
            success: true,
            message: '마음의 편지 작성완료'
        })

    }

    async delete(req: Request, res: Response){
        const successLogin = req.headers.authorization;
        const {uuid} = req.body;
        const verify = this.jwtService.verify(successLogin,{secret: process.env.SECRET_TOKEN})
        const user = await this.authRepository.findOne({
            where: {
                uuid: verify.uuid
            },
        });

        try{
            if(!uuid){ throw{status: 400, message: '다시 선택해주세요'}};
            if(!user){ throw{status: 400, message: '잘못된 토큰입니다'}};
            if(user.type !== 'admin') { throw{status: 403, message: '잘못된 접근입니다'}};
        }catch(err){
            return res.status(err.status ?? 500).json({
                success: false,
                massage: err.message ?? 'Internal Error',
            });
        }

            await this.boardRepository.delete(uuid)

            return res.status(200).json({
                success: true,
                message: '마음의 편지가 성공적으로 삭제되었습니다'
            })
    }

    async getList(req: Request,res: Response) {
        const successLogin = req.headers.authorization;
        const {page} = req.query;
        const verify = this.jwtService.verify(successLogin,{secret: process.env.SECRET_TOKEN})
        const user = await this.authRepository.findOne({
            where: {
                uuid: verify.uuid
            },
        });

        try{
            if(!page){ throw {status: 400, message: "페이지를 넣어주세요"}};
            if(!user){ throw {status: 400 , message: "잘못된 토큰입니다"}};
        }catch(err){
            return res.status(err.status ?? 500).json({
                success: false,
                massage: err.message ?? 'Internal Error',
            });
        }
        const take = 9;
        const skip = 9 * (Number(page) - 1);
        let list;
        if(user.type !== 'stu'){
            list = await this.boardRepository.find({
                order: {
                    createdAt: "DESC"
                },
                take,
                skip
            });
        }else{
            list = await this.boardRepository.find({
                where:{
                    isShow: true
                },
                order: {
                    createdAt: "DESC"
                },
                take,
                skip
            });
            
        }
        let lists;
        if(user.type !== 'stu'){
            lists = await this.boardRepository.find();
        }else{
            lists = await this.boardRepository.find({
                where:{
                    isShow: true
                }
            });
        }
        const length = lists.length / 9;

        return res.status(200).json({
            success: true,
            list,
            length: Math.ceil(length)
        })

    }

    async infor(req: Request,res: Response) {
        const successLogin = req.headers.authorization;
        const {uuid} = req.query;
        
        const verify = this.jwtService.verify(successLogin,{secret: process.env.SECRET_TOKEN})
        const user = await this.authRepository.findOne({
            where: {
                uuid: verify.uuid
            },
        });
        const infor = await this.boardRepository.findOne({
            where: {
                uuid: String(uuid)
            }
        });
        
        try{
            if(!uuid){ throw {status: 400, message: "선택을 해주세요"}};
            if(!user){ throw {status: 400 , message: "잘못된 토큰입니다"}};
            if(!infor){ throw {status: 400 , message: "없는 마편입니다"}};
            
        }catch(err){
            return res.status(err.status ?? 500).json({
                success: false,
                massage: err.message ?? 'Internal Error',
            });
        }

        return res.status(200).json({
            success: true,
            infor
        });
    }


}
