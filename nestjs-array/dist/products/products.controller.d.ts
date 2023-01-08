import { ProductsService } from './products.service';
import { Product } from './product.model';
export declare class ProductsController {
    private readonly productServce;
    constructor(productServce: ProductsService);
    addProduct(prodTitle: string, prodDesc: string, prodPrice: number): {
        id: string;
    };
    getAllProducts(): Product[];
    getProduct(prodId: string): Product;
    updateProduct(prodId: string, prodTitle: string, prodDesc: string, prodPrice: number): Product;
    removeProduct(prodId: string): Product[];
}
