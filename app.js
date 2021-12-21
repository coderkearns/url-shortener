
const express = require('express');
const api = require('./api');

const app = express();

// Add logging middleware
// not using debug mode - only requests that create new urls will be logged
app.use(require("./logger")(true))

// GET /s?url=<url>
app.get('/s', (req, res) => {
    if (!req.query.url) {
        res.json({ status: 'error', message: 'url is required' });
        return;
    }
    const url = api.newUrl(req.query.url);
    res.json({ status: 'ok', url });
});

// POST /s, { url: <ul> }
app.post('/s', (req, res) => {
    if (!req.body.url) {
        res.json({ status: 'error', message: 'url is required' });
        return;
    }
    const url = api.newUrl(req.body.url);
    res.json({ status: 'ok', url });
});

// GET /e/<shortened url>
app.get('/e/:url', (req, res) => {
    const url = api.getUrl(req.params.url);
    if (!url) {
        res.json({ status: 'error', message: 'url not found' });
        return;
    }
    res.json({ status: 'ok', url });
});

// GET /r?url=<shortened url>
app.get('/r', (req, res) => {
    if (!req.query.url) {
        res.json({ status: 'error', message: 'url is required' });
        return;
    }
    const url = api.getUrl(req.query.url);
    res.redirect(url);
});

// GET /r/<shortened url>
app.get('/r/:url', (req, res) => {
    const url = api.getUrl(req.params.url);
    if (!url) {
        res.json({ status: 'error', message: 'url not found' });
        return;
    }
    res.redirect(url);
});

// GET /all
app.get('/all', (req, res) => {
    const urls = api.getUrls()
    res.json({ status: 'ok', urls });
});

// GET /
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: "Goto /s to shorten a url, /e to expand a url, /r to redirect to a url, /all to get all urls" })
})

module.exports = app;