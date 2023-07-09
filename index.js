const request = require('request');
const fs = require('fs');

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

// function fetchDetails(type, category, version) {
//     return sendRequest(`fetchDetails/${type}/${category}${version ? "/" + version : ""}`)
// }

function downloadJar(type, category, version, output) {
    return new Promise((resolve) => {
        let file = fs.createWriteStream(output);
        resolve(request.get(`https://serverjars.com/api/fetchJar/${type}/${category}${version ? "/" + version : ""}`).pipe(file));
    });
}

module.exports = { fetchLatest, downloadJar, fetchAll, fetchTypes, fetchSubTypes, fetchDetails };
