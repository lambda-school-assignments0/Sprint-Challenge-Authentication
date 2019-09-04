const db = require("../database/dbConfig.js");

function add(user) {
    return db("users").insert(user);
}

function findBy(category) {
    return db("users").where(category);
}

module.exports = {
    add,
    findBy
}