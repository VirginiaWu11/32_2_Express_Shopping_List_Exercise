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
