import { Product } from './product.model';
import { Model } from 'mongoose';
export declare class ProductsService {
    private readonly productModel;
    private products;
    constructor(productModel: Model<Product>);
    insertProduct(title: string, desc: string, price: number): Promise<string>;
    getProducts(): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
    }[]>;
    getProduct(productId: string): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
    }>;
    updateProduct(productId: string, title: string, description: string, price: number): Promise<Product>;
    deleteProduct(prodId: string): Promise<void>;
    private findProduct;
    private findProduct_old;
}
