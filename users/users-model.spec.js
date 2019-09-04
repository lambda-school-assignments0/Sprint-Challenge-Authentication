const db = require("../database/dbConfig.js");

const Users = require("./users-model.js");

describe("users-model", () => {
    describe("add(user)", () => {
        beforeEach(async () => {
            await db("users").truncate();
        });

        it("should insert provided users into the db", async () => {
            await Users.add({
                username: "testuser1",
                password: "password123"
            });

            await Users.add({
                username: "testuser2",
                password: "password123"
            });

            const users = await db("users");
            expect(users).toHaveLength(2);
        });
    });

    describe("findBy(category)", () => {
        beforeEach(async () => {
            await db("users").truncate();
        });

        it("should find testuser3", async () => {
            await Users.add({
                username: "testuser1",
                password: "password123"
            });

            await Users.add({
                username: "testuser2",
                password: "password123"
            });

            await Users.add({
                username: "testuser3",
                password: "password123"
            });

            const user = await Users.findBy({ username: "testuser3" }).first();
            expect(user.username).toBe("testuser3");
        })
    });
});
