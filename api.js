const { nanoid } = require("nanoid");
const path = require("path");
const DB = require("./db");

const nano = () => nanoid(5)
const urls = new DB(path.join(__dirname, "urls.json"));

function newUrl(url) {
    const shortUrl = nano();
    urls.set(shortUrl, url);
    return shortUrl;
}

function getUrl(short) {
    return urls.get(short);
}

function getUrls() {
    return urls.object()
}

module.exports = {
    newUrl,
    getUrl,
    getUrls
}