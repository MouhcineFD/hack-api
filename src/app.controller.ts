import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDTO, CreateConfigProdcutDTO } from './app.dto';
import { AppService } from './app.service';
import { Response } from 'express';
import { IStatus } from './shared';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/account/info')
  get(@Res() res: Response) {
    const data = this.appService.get();
    return res.status(200).json({ data });
  }

  @Post('/account/active')
  active(@Res() res: Response) {
    this.appService.active();
    return res.status(201).json({ passed: 'ok' });
  }

  @Post('/product')
  @UsePipes(ValidationPipe)
  product(@Res() res: Response, @Body() createProductDTO: CreateProductDTO) {
    const add = this.appService.addProduct(createProductDTO);
    if (!add) {
      throw new BadRequestException('Something wen wrong');
    }
    return res.status(201).json({ passed: 'ok' });
  }

  @Get('/product/list')
  getProduct(@Res() res: Response) {
    const products = this.appService.listOfProduct();
    return res.status(200).json({ products });
  }

  @Put('/product/:tran/status/:status')
  updateStatus(
    @Res() res: Response,
    @Param('tran') tran: string,
    @Param('status') status: IStatus,
  ) {
    if (!tran) {
      throw new BadRequestException('Transaction id not provided');
    }
    if (!status) {
      throw new BadRequestException('Status not provided');
    }
    this.appService.updateStatusProduct(tran, status);
    return res.status(200).json({});
  }

  @Get('/product/:tran/status')
  getStatus(@Res() res: Response, @Param('tran') tran: string) {
    if (!tran) {
      throw new BadRequestException('Transaction id not provided');
    }
    const status = this.appService.getStatusProduct(tran);
    return res.status(200).json({ status });
  }

  @Put('/product/:tran/config')
  addConfigProduct(
    @Res() res: Response,
    @Param('tran') tran: string,
    @Body() createConfigProdcutDTO: CreateConfigProdcutDTO,
  ) {
    if (!tran) {
      throw new BadRequestException('Transaction id not provided');
    }
    const updatePayment = this.appService.addPaymentConfig(
      tran,
      createConfigProdcutDTO,
    );
    if (!updatePayment) {
      throw new BadRequestException('Something wen wrong');
    }
    return res.status(200).json({ passed: 'ok' });
  }
}
