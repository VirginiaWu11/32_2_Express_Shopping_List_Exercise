const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const items = require("../fakeDB");
const {
    checkForName,
    checkForPrice,
    updateItem,
    findItem,
} = require("../helpers.js");

// app.js app.use with prefix routes with /items, so these routes do not need /items

//1. this should render a list of shopping items
router.get("/", (req, res) => {
    res.json({ items });
});

// Here is what a response looks like:
// [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]

//2. this route should accept JSON data and add it to the shopping list.
router.post("/", (req, res, next) => {
    try {
        checkForName(req.body.name);
        checkForPrice(req.body.price);
        const newItem = { name: req.body.name, price: req.body.price };
        items.push(newItem);
        return res.status(201).json({ item: newItem });
    } catch (e) {
        return next(e);
    }
});

// Here is what a sample req,resuest/response looks like:
// {“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}

//3. this route should display a single item’s name and price.
router.get("/:name", (req, res, next) => {
    try {
        checkForName(req.params.name);
        let foundItem = findItem(req.params.name);
        if (foundItem === undefined) {
            throw new ExpressError("Item not found", 404);
        }
        return res.json({ item: foundItem });
    } catch (e) {
        return next(e);
    }
});

// Here is what a sample response looks like:
// {“name”: “popsicle”, “price”: 1.45}

//4.  this route should modify a single item’s name and/or price.
router.patch("/:name", (req, res, next) => {
    try {
        checkForName(req.params.name);
        checkForName(req.body.name);
        checkForName(req.body.price);
        let foundItem = findItem(req.params.name);
        foundItem = updateItem(foundItem, req.body.name, req.body.price);
        if (foundItem === undefined) {
            throw new ExpressError("Item not found", 404);
        }
        return res.json({ item: foundItem });
    } catch (e) {
        return next(e);
    }
});
// Here is what a sample req,resuest/response looks like:
// {“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}

//5. this route should allow you to delete a specific item from the array.
router.delete("/:name", (req, res, next) => {
    const foundItem = items.findIndex((item) => item.name === req.params.name);
    if (foundItem === -1) {
        throw new ExpressError("Item not found", 404);
    }
    items.splice(foundItem, 1);
    res.json({ message: "Deleted" });
});
// Here is what a sample response looks like:
// {message: “Deleted”}

module.exports = router;
