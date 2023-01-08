"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const product_model_1 = require("./product.model");
let ProductsService = class ProductsService {
    constructor() {
        this.products = [];
    }
    insertProduct(title, desc, price) {
        const id = Math.random().toString();
        const newProduct = new product_model_1.Product(id, title, desc, price);
        this.products.push(newProduct);
        return id;
    }
    getProducts() {
        return [...this.products];
    }
    getProduct(productId) {
        const product = this.products.find((prod) => prod.id === productId);
        if (!product) {
            throw new common_1.NotFoundException('Could not find product with product id: ' + productId);
        }
        return Object.assign({}, product);
    }
    updateProduct(productId, title, description, price) {
        const [product, index] = this.findProduct(productId);
        const updatedProduct = Object.assign({}, product);
        if (title)
            updatedProduct.title = title;
        if (description)
            updatedProduct.description = description;
        if (price)
            updatedProduct.price = price;
        this.products[index] = updatedProduct;
        return updatedProduct;
    }
    deleteProduct(prodId) {
        const [_, index] = this.findProduct(prodId);
        this.products.splice(index, 1);
        return [...this.products];
    }
    findProduct(id) {
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex];
        if (!product) {
            throw new common_1.NotFoundException('Could not find product with product id: ' + id);
        }
        return [product, productIndex];
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map