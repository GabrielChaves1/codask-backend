import { IsNotEmpty, IsString, IsUUID } from "class-validator"
import { UUID } from "node:crypto"

export class CreateCommentDto {
  @IsUUID()
  @IsNotEmpty()
  postId: UUID

  @IsString()
  @IsNotEmpty()
  content: string
}