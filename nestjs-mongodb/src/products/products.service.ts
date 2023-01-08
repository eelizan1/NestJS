import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable() // allows us to inject this service into controllers
export class ProductsService {
  private products: Product[] = []; // array of Products

  // 'Product' is defined from the product module mongoose injection schema name
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      title: title,
      description: desc,
      price: price,
    });

    // save to database
    const result = await newProduct.save();

    return result.id as string; // specify promise type
  }

  public async getProducts() {
    const products = await this.productModel.find().exec();

    // re-map to remove the _id and __v from mongo properties and return new object
    return products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    }));
  }

  public async getProduct(productId: string) {
    // use find method to check if current searched product matches product id
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  public async updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(productId);

    if (title) updatedProduct.title = title;
    if (description) updatedProduct.description = description;
    if (price) updatedProduct.price = price;

    updatedProduct.save();
    return updatedProduct;
  }

  public async deleteProduct(prodId: string) {
    // deleteOne requires am object filter and use the mongoose _id
    try {
      await this.productModel.deleteOne({ _id: prodId }).exec();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error when deleting from db with id: ' +
          prodId +
          ' with exception: ' +
          error,
      );
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product;

    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      // invalid mongo id's
      throw new NotFoundException(
        'Could not find product with product id: ' + id,
      );
    }

    // valid mongo id's
    if (!product) {
      throw new NotFoundException(
        'Could not find product with product id: ' + id,
      );
    }

    return product;
  }

  // returns a tuple with a product and its index in the products array
  private findProduct_old(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];

    if (!product) {
      throw new NotFoundException(
        'Could not find product with product id: ' + id,
      );
    }

    return [product, productIndex];
  }
}
