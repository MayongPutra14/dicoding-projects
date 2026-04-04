import http from "http";

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Topic-Module", "Learn Web Server");
  response.setHeader("Powered-By", "Node.js");
  const { method, url } = request;

  if (url === "/") {
    if (method === "GET") {
      response.statusCode = 200;
      response.end(JSON.stringify({
        message: "Ini adalah Hompage"
      }));
    } else {
      response.statusCode = 400;
     response.end(JSON.stringify({
        message: `Halaman tidak dapat diakses dengan method ${method} request.`
      }));
    }
  } else if (url === "/about") {
    if (method === "GET") {
      response.statusCode = 200;
      response.end(JSON.stringify({
        message: "Ini adalah halaman /about"
      }));
    } else if (method === "POST") {
      response.statusCode = 200;
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.end(JSON.stringify({
        message: `Hello, ${name}! ini adalah halaman /about`
      }));
      });
    } else {
      response.statusCode = 404;
      response.end(JSON.stringify({
        message: `Halaman tidak dapat diakses dengan method ${method} request.`
      }));
    }
  } else {
    response.end(JSON.stringify({
      message: 'Halaman tidak ditemukan!',
    }));
    response.statusCode = 400;
  }
};

const server = http.createServer(requestListener);
const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server sedang Berjalan pada http://${host}:${port} `);
});
