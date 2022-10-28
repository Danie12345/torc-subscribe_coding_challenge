export default class Item {
  constructor(description) {
    const {
      name, imported, basicApplies, quantity, rawPrice,
    } = this.parseDescription(description);
    this.name = name;
    this.imported = imported;
    this.basicApplies = basicApplies;
    this.quantity = quantity;
    this.taxes = this.calculateTaxes(rawPrice);
    this.total = (rawPrice + this.taxes).toFixed(2);
  }

  repr() {
    return `${this.quantity} ${this.name}: ${this.total}`;
  }

  parseDescription(description) {
    const [qtydesc, price] = description.split(' at ');
    const imported = 0 || 1 * qtydesc.includes('imported');
    let [qty, , ...name] = qtydesc.split('');
    name = name.join('');
    const basicApplies = this.determineType(name);
    qty = parseInt(qty, 10);
    const rawPrice = qty * price;
    return {
      name, imported, basicApplies, qty, rawPrice,
    };
  }

  determineType(name) {
    const noBasicTaxProducts = [
      'chocolate', 'bar', 'apple', 'sandwich', 'food', 'drink',
      'pills', 'band', 'aid', 'syringe', 'medicine',
      'book', 'notebook',
    ];
    return 1 - noBasicTaxProducts.some((product) => name.includes(product));
  }

  calculateTaxes(rawPrice) {
    const basicTax = 0.1;
    const importTax = 0.05;
    const totalTax = basicTax * this.basicApplies + importTax * this.imported;
    const precision = 0.05;
    const rounding = 1.0 / precision;
    const total = rawPrice * totalTax;
    const correctedTotal = Math.round(total * 100) / 100; // corrects binary to decimal rounding
    return Math.ceil(correctedTotal * rounding) / rounding;
  }
}