const http = require('http');
const url = require( 'url');
const server = http.createServer((req, res) => {
    const path = req.url;
    if (path === '/' || path === '/home'){
        res.end("This is HOME")
    }else if (path === '/product'){
        res.end("This is PRODUCT")
    }else{
        res.writeHead(404,{
            "content-type": "text/html"
        });
        res.end("<h1>Error!</h1>");
    }
});
server.listen(8000, '127.0.0.1', () => {
    console.log("Listen at port 8000");     
});