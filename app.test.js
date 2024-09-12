const request = require("supertest");

const app = require("./app");
const db = require("./db");

test("returns 404 on fake path", async function() {
    const res = await request(app).get("/aasdlasdf");
    expect(res.statusCode).toEqual(404);
});

afterAll(function() {
    db.end();
})