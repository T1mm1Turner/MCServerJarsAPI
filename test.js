const { fetchTypes, fetchAll } = require("./index.js")

async function test() {
    console.log(await fetchTypes())
    console.log(await fetchAll())
}

test()