import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productServce;
    constructor(productServce: ProductsService);
    addProduct(prodTitle: string, prodDesc: string, prodPrice: number): Promise<{
        id: string;
    }>;
    getAllProducts(): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
    }[]>;
    getProduct(prodId: string): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
    }>;
    updateProduct(prodId: string, prodTitle: string, prodDesc: string, prodPrice: number): Promise<import("./product.model").Product>;
    removeProduct(prodId: string): Promise<string>;
}
