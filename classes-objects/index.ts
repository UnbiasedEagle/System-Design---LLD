/*
A class is a blueprint, template, or recipe for creating objects.
It defines what an object will contain (its data) and what it will be able to do (its behavior).

It groups related data (attributes) and actions (methods) together.
Defines attributes to represent the state or data of an object.
Defines methods (functions inside a class) to represent the behavior or actions the object can perform.
*/

class Car {
  private brand: string;
  private model: string;
  private speed: number;

  constructor(brand: string, model: string) {
    this.brand = brand;
    this.model = model;
    this.speed = 0;
  }

  accelerate(increment: number) {
    this.speed += increment;
  }

  displayStatus() {
    console.log(`${this.brand} is running at ${this.speed} km/h.`);
  }
}

/*
An object is an instance of a class.
It’s a real-world manifestation of the class blueprint, something you can interact with, store data in, and invoke methods on.
*/

const corolla = new Car("Toyota", "Corolla");
const mustang = new Car("Ford", "Mustang");

corolla.accelerate(20);
mustang.accelerate(40);

corolla.displayStatus();
mustang.displayStatus();
