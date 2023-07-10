const request = require('request')
const fs = require('fs')
const { join, normalize, extname } = require("path")

function sendRequest(urlParts) {
    return new Promise((resolve, reject) => {
        request.get('https://serverjars.com/api/' + urlParts, (error, response, body) => {
            if (error) {
                reject({ title: 'Error Occurred', message: 'Try again later!' })
            } else {
                try {
                    body = JSON.parse(body);
                    if (body.status === 'error') {
                        reject(body.error);
                    } else {
                        resolve(body.response)
                    }
                } catch (e) {
                    reject({
                        title: 'JSON Parse Error Occurred',
                        message: 'Unable to parse JSON response from server'
                    })
                }

            }
            resolve();
        });
    });
}

function fetchTypes() {
    return sendRequest('fetchTypes')

}

// Categories
function fetchSubTypes(mainType = "vanilla") {
    return sendRequest(`fetchTypes/${mainType}`)
}

function fetchAll({ type = "vanilla", category = "vanilla", max = 3 } = {}) {
    return sendRequest(`fetchAll/${type}/${category}/${max}`)
}

function fetchLatest({ type = "vanilla", category = "vanilla" } = {}) {
    return sendRequest(`fetchLatest/${type}/${category}`)
}

function fetchDetails({ type = "vanilla", category = "vanilla", version = "" } = {}) {
    return sendRequest(`fetchDetails/${type}/${category}/${version}`)
}

async function downloadJar({ type = "vanilla", category = "vanilla", version = "", downloadPath = process.cwd(), name } = {}) {
    const jarName = name ? name + extname(await fetchDetails({ type: type, category: category, version: version }).then(jar => jar.file)) : ((version || category !== "vanilla") ? await fetchDetails({ type: type, category: category, version: version }).then(jar => jar.file) : await fetchLatest().then(jar => jar.file))
    return new Promise((resolve) => {
        let file = fs.createWriteStream(join(normalize(downloadPath), jarName))
        resolve(request.get(`https://serverjars.com/api/fetchJar/${type}/${category}/${version}`).pipe(file))
    })
}

module.exports = { fetchLatest, downloadJar, fetchAll, fetchTypes, fetchSubTypes, fetchDetails }
