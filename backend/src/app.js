const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Bienvenue !");
  } else if (req.url === "/bonjour") {
    res.end("Bonjour !");
  } else {
    res.end("Page inconnue");
  }
});

server.listen(3000);
