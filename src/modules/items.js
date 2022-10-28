export default class Item {
    constructor(description) {
        const { name, imported, basic_applies, quantity, raw_price } = this.parse_description(description);
        this.name = name;
        this.imported = imported;
        this.basic_applies = basic_applies;
        this.quantity = quantity;
        this.taxes = this.calculate_taxes(raw_price);
        this.total = (raw_price + this.taxes).toFixed(2);
    }

    repr() {
        return `${this.quantity} ${this.name}: ${this.total}`;
    }

    parse_description(description) {
        const [qtydesc, price] = description.split(' at ');
        const imported = 0 || 1*qtydesc.includes('imported');
        let [qty, , ...name] = qtydesc.split('');
        name = name.join('');
        const basic_applies = this.determine_type(name);
        const quantity = parseInt(qty);
        const raw_price = quantity * price;
        return { name, imported, basic_applies, quantity, raw_price };
    }

    determine_type(name) {
        const no_basic_tax_products = [
            'chocolate', 'bar', 'apple', 'sandwich', 'food', 'drink',
            'pills', 'band', 'aid', 'syringe', 'medicine',
            'book', 'notebook'
        ];
        return 1 - no_basic_tax_products.some((product) => name.includes(product));
    }

    calculate_taxes(raw_price) {
        const basic_tax = .1;
        const import_tax = .05;
        const total_tax = basic_tax*this.basic_applies + import_tax*this.imported;
        const precision = .05;
        const rounding = 1.0 / precision;
        const total = raw_price * total_tax;
        const corrected_total = Math.round(total * 100) / 100; // corrects bad binary to decimal rounding efforts
        return Math.ceil(corrected_total * rounding) / rounding;
    }
}