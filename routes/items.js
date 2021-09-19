const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const items = require("../fakeDb");

// app.js app.use with prefix routes with /items, so these routes do not need /items

//1. this should render a list of shopping items
router.get("/", (req, res) => {
    res.json({ items });
});

// Here is what a response looks like:
// [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]

//2. this route should accept JSON data and add it to the shopping list.
router.post("/", (req, res) => {});

// Here is what a sample req,resuest/response looks like:
// {“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}

//3. this route should display a single item’s name and price.
router.get("/", (req, res) => {});
// Here is what a sample response looks like:
// {“name”: “popsicle”, “price”: 1.45}

//4.  this route should modify a single item’s name and/or price.
router.patch("/:name", (req, res) => {});
// Here is what a sample req,resuest/response looks like:
// {“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}

//5. this route should allow you to delete a specific item from the array.
router.delete("/:name", (req, res) => {});
// Here is what a sample response looks like:
// {message: “Deleted”}

module.exports = router;
