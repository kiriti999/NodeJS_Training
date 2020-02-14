// Import Node.js core modules
const http = require('http'); 
const url = require("url");
const fs = require('fs');

//create web server
http.createServer(function (req, res) {   
    const query = url.parse(req.url, true);
    const route = query.pathname;

    let WriteFilePath = '';
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        WriteFilePath = body.toString().split('\n')[3].trim();
    });

    // Default
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();
    }

    // Read
    else if (route == "/readFile" && req.method === 'GET') {
        const filePath = JSON.parse(JSON.stringify(query.query)).path;
        readFile(res, filePath);
    }

    //write
    else if (route == "/writeFile" && req.method === 'POST') {
        writeFile(res, 'D:/e5/NodeJS_Training/data.txt');
        // writeFile(res, WriteFilePath);
    }

    //delete
    else if (route == "/deleteFile" && req.method === 'DELETE') {
        deleteFile(res, WriteFilePath);
    }

    else
        res.end('Invalid req!');
}).listen(5000);


function readFile(res, path) {
    console.log('read path:', path);
    fs.readFile(path || 'D:/e5/NodeJS_Training/data.txt', 'utf8', (err, text) => {
        if (err) {
            sendError(res, err);
        } else {
            res.write(text);
            res.end();
        }
    });
}

function writeFile(res, path) {
    console.log('write path:', path);
    fs.stat(path, (err, stats) => {
        if (err) {
            sendError(res, err);
            console.error(err);
            return
        }
        if (stats.isFile()) {
            fs.writeFileSync(path || 'D:/e5/NodeJS_Training/data.txt', JSON.stringify('updated'), { flag: 'w' });
            res.end('file updated');
        } else {
            sendError(err);
        }
    })
}

function deleteFile(res, path) {
    console.log('delete path:', path);
    fs.unlink(path || 'D:/e5/NodeJS_Training/data.txt', function (err) {
        if (err) {
            sendError(res, err);
        } else {
            res.end('file deleted!');
        };
    });
}

function sendError(res, err) {
    if (err.errno && err.errno === -4058) {
        console.log(`File not found, Error code: ${err.errno.toString()}`);
        res.end(`File not found, Error code: ${err.errno.toString()}`);
    }
    res.end('Error occurred');
    return;
}