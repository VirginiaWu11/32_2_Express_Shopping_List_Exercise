const ExpressError = require("./expressError");

class Helpers {
    static checkForName(name) {
        if (!name) throw new ExpressError("Name is required", 400);
    }
    static checkForPrice(price) {
        if (!price) throw new ExpressError("Price is required", 400);
    }
}

module.exports = Helpers;
