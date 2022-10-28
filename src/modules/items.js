export default class Item {
    constructor(description) {
        const { name, imported, basic_applies, quantity, raw_price } = this.parse_description(description);
        this.name = name;
        this.imported = imported;
        this.basic_applies = basic_applies;
        this.quantity = quantity;
        this.total = this.calculate_taxes(raw_price);
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
}