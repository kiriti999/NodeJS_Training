const http = require('http'); // Import Node.js core module
const url = require("url");
const fs = require('fs');

var server = http.createServer(function (req, res) {   //create web server
    const query = url.parse(req.url, true);
    const filePath = JSON.parse(JSON.stringify(query.query)).path;
    const route = query.pathname;

    // Default
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();
    }
    // Read
    else if (route == "/readFile" && req.method === 'GET') {
        fs.readFile(filePath, 'utf8', (err, text) => {
            if (err) {
                res.status(500).send({ error: err.message });
            } else {
                res.write(text);
                res.end();
            }
        });
    }
    else if (req.url == "/admin") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is admin Page.</p></body></html>');
        res.end();
    }
    else
        res.end('Invalid Request!');
});

server.listen(5000); //6 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')