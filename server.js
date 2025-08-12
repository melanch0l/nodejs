const http = require('http');
const url = require('url');
const fs = require('fs');
//this is sync read only read once
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');

const server = http.createServer((req, res) => {
  const path = req.url;
  if (path === '/' || path === '/home') {
    res.end('This is HOME');
  } else if (path === '/product') {
    //this is asyn file read since asyn everytime callback func is trigger data reading is made : not ideal
    // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
    //     //for better dir detection
    // const objfile = JSON.parse(data);
    // res.writeHead(200, {'Content-type': 'application/json'});
    // res.end(data);});
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(404, {
      'content-type': 'text/html',
    });
    res.end('<h1>Error!</h1>');
  }
});
server.listen(8000, '127.0.0.1', () => {
  console.log('Listen at port 8000');
});
