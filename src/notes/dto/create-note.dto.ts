import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNumber()
  categoryId: number;
}
