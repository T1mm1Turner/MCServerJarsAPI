const ServerJars = require("./index.js")

async function test() {
    console.log(await ServerJars.fetchTypes())
    console.log(await ServerJars.fetchSubTypes("servers"))
    console.log(await ServerJars.fetchAll())
    console.log(await ServerJars.fetchDetails())
}

test()