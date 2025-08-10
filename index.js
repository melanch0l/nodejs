const fs = require('fs');

//this code is synchronous: line by line (blocking code)
// const readfs = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(readfs);
// const writefs = `this is my first knowledge about nodejs and avocado: ${readfs}\nThis file is created at ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', writefs);
// console.log(fs.readFileSync('./txt/output.txt', 'utf-8'));

//this code is asynchronous: non-blocking code
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    console.log(data1);
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        if (err) return console.log("Error 😭");
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            if (err) return console.log("Error 😭"); //control+command+space:emoji
            console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
                if (err) return console.log("Error 😭"); //control+command+space:emoji
                console.log("Your file has been written 👍");
            });
        });
    }); //shift+option+f:formatcode
});
