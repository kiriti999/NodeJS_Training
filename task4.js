// Import Node.js core modules
const http = require('http');
const url = require("url");
const fs = require('fs');

//create web server
var server = http.createServer(function (req, res) {
    const query = url.parse(req.url, true);
    const filePath = JSON.parse(JSON.stringify(query.query)).path;
    const route = query.pathname;

    // Default route
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();
    }
    // Read
    else if (route == "/readFile" && req.method === 'GET') {
        fs.readFile(filePath, 'utf8', (err, text) => {
            if (err) {
                sendErrorMessage(err);
            } else {
                res.writeHead(200);
                res.write(text);
                res.end();
            }
        });
    }
    else if (route == "/writeFile" && req.method === 'POST') {

        res.writeHead(200);
        fs.access(file, fs.constants.F_OK, (err) => {
            console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
            if (err) {
                sendErrorMessage(err);
            } else {
                fs.writeFile(filePath, 'sample updated', (err, data) => {
                    if (err) {
                        sendErrorMessage(err);
                    } else {
                        console.log('file has been saved');
                    }
                });
            }
        });

        res.end();
    }
    else if (route == "/deleteFile" && req.method === 'GET') {
        fs.unlink(filePath, (err, file) => {
            if (err) {
                sendErrorMessage(err);
            } else {
                res.writeHead(200);
                res.write(`${filePath}: deleted`);
                res.end();
            }
        });
    }
    res.end('Invalid Request!');
});

server.listen(5000); //6 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')

function sendErrorMessage(err) {
    res.status(500).send({ error: err.message });
}