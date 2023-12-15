export class Dish {
  constructor(name = "", price = 0.0, description = "", image = "") {
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
  }
}

export class MenuSection {
  constructor(name = "", dishes) {
    this.name = name;
    this.dishes = dishes;
  }
}