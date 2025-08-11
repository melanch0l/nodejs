const http = require('http');
const url = require('url');
const fs = require('fs');
//this is sync read only read once temp=key, product=value in json.parse(data) array 
const replacetemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}
const overview = fs.readFileSync('./templates/overview.html', 'utf-8');
const productemp = fs.readFileSync('./templates/product.html', 'utf-8');
const template = fs.readFileSync('./templates/template-card.html', 'utf-8');

//Even though the content looks like JavaScript object syntax, it’s really just text.
// JSON.parse() takes that text and turns it into a real JS object or array so you can use it programmatically:
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataobj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    //overview
    if (pathname === '/overview' || pathname === '/') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const cardstemplate = dataobj.map(el => replacetemplate(template, el)).join('');//make array to string with join
        const output = overview.replace('{%PRODUCT_CARDS%}', cardstemplate);
        res.end(output);
    } else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = dataobj[query.id];
        const output = replacetemplate(productemp, product);
        console.log(output);
        res.end(output);
    }

});
server.listen(8000, '127.0.0.1', () => {
    console.log("Listen at port 8000");
});