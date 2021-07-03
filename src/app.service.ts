import { Injectable } from '@nestjs/common';
import { CreateProductDTO, CreateConfigProdcutDTO } from './app.dto';
import { IStatus } from './shared';

type IAccount = { status: boolean; code: number };
type IProduct = {
  id: string;
  status: IStatus;
  source: string;
  productName: string;
  creationDate: string;
  config?: string;
  amount?: string;
  duraction?: string;
};

const account = {
  status: false,
  code: 0,
};

const productList: IProduct[] = [];

@Injectable()
export class AppService {
  public active() {
    account.status = true;
    account.code = Math.floor(Math.random() * 899999 + 100000);
    return { status: 'ok' };
  }

  public get(): IAccount {
    return account;
  }

  public addProduct(product: CreateProductDTO) {
    const { id, status, productName, creationDate, source } = product;
    productList.push({
      id,
      status,
      productName,
      creationDate,
      source,
    });
    return product;
  }

  public listOfProduct() {
    return productList;
  }

  private findProductByID(id: string) {
    const findProduct = productList.find((obj) => obj.id == id);
    return findProduct;
  }

  public updateStatusProduct(id: string, status: IStatus) {
    const findProduct = this.findProductByID(id);
    findProduct.status = status;
  }

  public getStatusProduct(id: string) {
    const { status } = this.findProductByID(id);
    return status;
  }

  public addPaymentConfig(id: string, productConfig: CreateConfigProdcutDTO) {
    const idProduct = this.findProductByID(id);
    const { amount, config, duration } = productConfig;
    idProduct.amount = amount;
    idProduct.config = config;
    idProduct.duraction = duration;
    return idProduct;
  }
}
