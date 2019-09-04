const request = require("supertest");

const auth = require("./auth-router.js");

describe("auth-router.js", () => {
    describe("POST '/register'", () => {
        // test status code
        it("should return 201", async () => {
            const res = await request(auth)
                .post("/register")
                .send({ username: "testuser1", password: "password123" })
                .set("Accept", "application/json");
            expect(res.status).toBe(201);
        });

        // test format
        it("should return a json object", async () => {
            const res = await request(auth).get("/");
            expect(res.type).toBe("application/json");
        });
    });
});
