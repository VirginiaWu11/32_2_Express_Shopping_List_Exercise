process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let eggs = { name: "eggs", price: 2.5 };

beforeEach(() => {
    items.push(eggs);
});

afterEach(() => {
    items.length = 0;
});

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ items: [eggs] });
    });
});

describe("GET /items/:name", () => {
    test("Get item by name", async () => {
        const res = await request(app).get(`/items/${eggs.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item: eggs });
    });
    test("Respond with 404 for invalid item", async () => {
        const res = await request(app).get(`/items/bananas`);
        expect(res.statusCode).toBe(404);
    });
});

describe("POST /items", () => {
    test("Adding an Item", async () => {
        const newItem = { name: "chocolate", price: 3 };
        const res = await request(app).post(`/items`).send(newItem);
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ item: newItem });
    });
    test("Responds with 400 if name is missing", async () => {
        const res = await request(app).post(`/items`).send({ price: 3 });
        expect(res.statusCode).toBe(400);
    });
    test("Responds with 400 if price is missing", async () => {
        const res = await request(app)
            .post(`/items`)
            .send({ name: "chocolate" });
        expect(res.statusCode).toBe(400);
    });
});
