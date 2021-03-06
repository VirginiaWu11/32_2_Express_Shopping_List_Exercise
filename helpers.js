const ExpressError = require("./expressError");
const items = require("./fakeDB");

class Helpers {
    static checkForName(name) {
        if (!name) throw new ExpressError("Name is required", 400);
    }
    static checkForPrice(price) {
        if (!price) throw new ExpressError("Price is required", 400);
    }
    static findItem(name) {
        return items.find((item) => item.name === name);
    }
    static updateItem(existingItem, name, price) {
        existingItem.name = name;
        existingItem.price = price;
        return existingItem;
    }
}

module.exports = Helpers;
