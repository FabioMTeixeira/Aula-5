const http = require('http');
const url = require('url');
const PORT = 8000;

const jsonResponse = (res, body, statusCode, headers) => {
    if(!headers) {
        headers = {
            'Content-type': 'application/json'
        };
    };
    if(!statusCode) {
        statusCode = 200;
    };

    res.writeHead(statusCode, headers);

    if(!body) {
        body = "{}";
    };
    res.end(body);
}

const controllers = {
    teste: (req, res) => {      
        const body = '{"message": "OK"}';

        jsonResponse(res, body);
    },
    createTeste: (req, res) => {  
        const statusCode = 201;    
        const body = '{"message": "Created"}';

        jsonResponse(res, body, statusCode);
    },
    notFound: (req, res) => {
        const statusCode = 404;
        const body = '{"message": "Not found"}';

        jsonResponse(res, body, statusCode);
            }
}

const app = (req, res) => {
    const uri = url.parse(req.url);
    const path = uri.pathname;
    const method = req.method;

    if(method === 'GET' && path === '/teste') controllers.teste(req, res);
    else if (method === 'POST' && path === '/teste') controllers.createTeste(req, res);
    else controllers.notFound(req, res);
}

http.createServer(app).listen(PORT);

console.log('Servidor rodando.');
