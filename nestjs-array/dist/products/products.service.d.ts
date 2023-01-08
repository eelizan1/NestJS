import { Product } from './product.model';
export declare class ProductsService {
    private products;
    insertProduct(title: string, desc: string, price: number): string;
    getProducts(): Product[];
    getProduct(productId: string): Product;
    updateProduct(productId: string, title: string, description: string, price: number): Product;
    deleteProduct(prodId: string): Product[];
    private findProduct;
}
