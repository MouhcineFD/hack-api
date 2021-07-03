import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { IStatus } from './shared';

export class CreateConfigProdcutDTO {
  @IsNotEmpty()
  @IsString()
  config: string;
  @IsNotEmpty()
  @IsString()
  amount: string;
  @IsString()
  @IsNotEmpty()
  duration: string;
}

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  status: IStatus;
  @IsString()
  source: string;
  @IsString()
  productName: string;
  @IsString()
  creationDate: string;
}
