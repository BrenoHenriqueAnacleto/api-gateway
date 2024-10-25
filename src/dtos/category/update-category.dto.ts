import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<Event>;
}
