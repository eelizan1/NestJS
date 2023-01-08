// export class Product {
//   id: string;
//   title: string;
//   description: string;
//   price: number;

//   constructor(id: string, title: string, description: string, price: number) {
//     this.id = id;
//     this.title = title;
//     this.description = description;
//     this.price = price;
//   }
// }

// short hand way of writing the class above
export class Product {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public price: number,
  ) {}
}
