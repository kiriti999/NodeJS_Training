const http = require('http'); // Import Node.js core module
const url = require("url");
const fs = require('fs');
const qs = require('querystring');

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
        console.log('filePath ', filePath);
        fs.readFile(filePath, 'utf8', (err, text) => {
            if (err) {
                sendError(err, res);
            } else {
                res.write(text);
                res.end();
            }
        });
    }
    else if (route == "/writeFile" && req.method === 'POST') {

        let WriteFilePath = '';
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            WriteFilePath = body.toString().split('\n')[3].trim();
            console.log('WriteFilePath: ', WriteFilePath);
        });

        fs.stat('D:/e5/NodeJS_Training/data.txt', (err, stats) => {
            if (err) {
                console.error(err);
                return
            }
            if (stats.isFile()) {
                fs.writeFileSync('D:/e5/NodeJS_Training/data.txt', JSON.stringify('updated'), { flag: 'w' });
                res.end('file updated');
            } else {
                sendError(err);
            }
        })
    }
    else if (route == "/deleteFile" && req.method === 'DELETE') {
        fs.unlink('D:/e5/NodeJS_Training/data.txt', function (err) {
            if (err) {
                sendError(err);
            } else {
                res.end('file deleted!');
            };
        });
    }
    else
        res.end('Invalid req!');
});

server.listen(5000); //6 - listen for any incoming reqs

console.log('Node.js web server at port 5000 is running..');

function sendError(err, res) {
    if (err.errno && err.errno === -4058) {
        console.log(`File not found, Error code: ${err.errno.toString()}`);
        res.end(`File not found, Error code: ${err.errno.toString()}`);
    }
    res.end('Error occurred');
    return;
}