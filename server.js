const http = require('http');
const server = http.createServer((req, res) => {
    res.end("This is Responed Data");
});
server.listen(8000, '127.0.0.1', () => {
    console.log("Listen at port 8000");     
});