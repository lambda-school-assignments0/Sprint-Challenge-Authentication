const request = require("supertest");

const server = require("./server.js");

describe("server.js", () => {
    describe("GET '/'", () => {
        // test status code
        it("should return 200", async () => {
            const res = await request(server).get("/");
            expect(res.status).toBe(200);
        });

        // test format
        it("should return a json object", async () => {
            const res = await request(server).get("/");
            expect(res.type).toBe("application/json");
        });

        // test json body structure
        it("should return { server: 'up' }", async () => {
            const res = await request(server).get("/");
            expect(res.body).toEqual({ server: "up" });
        });
    });
});
