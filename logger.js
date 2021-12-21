module.exports = function logger(debug = false) {
    // If debug is true, then we will log all requests
    // otherwise requests that create new urls
    return function (req, res, next) {
        const method = req.method;
        const url = req.url;
        // get body from req.body if post method, or req.query if get method
        const body = req.method === "POST" ? req.body : req.query;
        const bodyString = JSON.stringify(body);

        if (debug) {
            console.log(`[${method}] ${url} ${bodyString}`);
        } else {
            // GET /s or POST /s creates new url
            if (url.startsWith("/s") && (method === "GET" || method === "POST")) {
                console.log(`[${method}] ${url} ${bodyString}`);
            }
        }

        next();
    }
}