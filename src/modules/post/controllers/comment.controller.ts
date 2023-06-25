import { Body, Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { CreateCommentDto } from "../dtos/create-comment.dto";
import { Request, Response } from 'express'
import { CommentService } from "../services/comment.service";

@Controller("comments")
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}
  
  @Post()
  async create(@Req() req: Request, @Body() createCommentDto: CreateCommentDto, @Res() res: Response) {
    const user = req.user;
    const comment = await this.commentService.create(user.id, createCommentDto);
    return res.status(HttpStatus.OK).json(comment);
  }
}