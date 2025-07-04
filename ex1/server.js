const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
  let file = './public' + (req.url === '/' ? '/index.html' : req.url);
  let ext = path.extname(file);
  let types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml'
  };

  fs.readFile(file, (err, data) => {
    if (err) {
      fs.readFile('./public/404.html', (_, d) => {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(d || '404');
      });
    } else {
      res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
      res.end(data);
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
