import { Injectable, NotFoundException } from '@nestjs/common';
import { toUSVString } from 'util';
import { Product } from './product.model';

@Injectable() // allows us to inject this service into controllers
export class ProductsService {
  private products: Product[] = []; // array of Products

  public insertProduct(title: string, desc: string, price: number): string {
    const id: string = Math.random().toString();
    const newProduct = new Product(id, title, desc, price);

    // add to products array
    this.products.push(newProduct);
    return id;
  }

  public getProducts(): Product[] {
    // this.products is reference types and we will return a pointer to that same list memory
    // therefore we shold return a copy. We can use a spread operator to return a new array with the contents
    return [...this.products];
  }

  public getProduct(productId: string): Product {
    // use find method to check if current searched product matches product id
    const product = this.products.find((prod) => prod.id === productId);

    if (!product) {
      throw new NotFoundException(
        'Could not find product with product id: ' + productId,
      );
    }

    return { ...product }; // create copy and return
  }

  public updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ): Product {
    // extract data
    const [product, index] = this.findProduct(productId);

    // create copy
    const updatedProduct = { ...product };

    if (title) updatedProduct.title = title;
    if (description) updatedProduct.description = description;
    if (price) updatedProduct.price = price;

    // update products array with updated product
    this.products[index] = updatedProduct;

    return updatedProduct;
  }

  public deleteProduct(prodId: string): Product[] {
    // we can use underscore to indicate we dont care about the product and just want the index
    const [_, index] = this.findProduct(prodId);

    // delete product from array
    this.products.splice(index, 1);

    return [...this.products];
  }

  // returns a tuple with a product and its index in the products array
  private findProduct(id: string): [Product, number] {
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
