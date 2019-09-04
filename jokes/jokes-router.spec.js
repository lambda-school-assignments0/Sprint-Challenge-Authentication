const request = require("supertest");

const jokes = require("./jokes-router.js");

describe("jokes-router.js", () => {
    describe("GET '/'", () => {
        // test status code
        it("should return 200", async () => {
            const res = await request(jokes).get("/");
            expect(res.status).toBe(200);
        });

        // test format
        it("should return a json object", async () => {
            const res = await request(jokes).get("/");
            expect(res.type).toBe("application/json");
        });
    });
});
