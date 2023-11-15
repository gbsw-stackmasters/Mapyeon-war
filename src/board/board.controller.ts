import { Controller, Get, Post, Body, Patch, Param, Delete,Req,Res } from '@nestjs/common';
import { BoardService } from './board.service';
import {Request,Response} from 'express';
@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post('/create')
    Create(@Req() req:Request,@Res() res:Response){
        return this.boardService.create(req,res);
    }

    @Delete('/delete')
    Delete(@Req() req:Request,@Res() res:Response){
        return this.boardService.delete(req,res);
    }

    @Get('/get/list')
    GetList(@Req() req:Request,@Res() res:Response){
        return this.boardService.getList(req,res);
    }

    @Get('/get/infor')
    Infor(@Req() req:Request,@Res() res:Response){
        return this.boardService.infor(req,res);
    }
}