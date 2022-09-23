const http = require('http')
const { PORT = 8000 } = process.env

const fs = require('fs')
const path = require('path')
const FILE_DIRECTORY = path.join(__dirname, '../public')

const mimeType = {
    ".jpg" : "image/jpg",
    ".png" : "image/png",
    ".css" : "text/css",
    ".js" : "text/javascript"
}

function getFile(isHTML, fileName) {
    const file = path.join(FILE_DIRECTORY, fileName)
    if (isHTML) {
        return fs.readFileSync(file, 'utf-8')
    } else {
        return fs.readFileSync(file)
    }
}

function onRequest(req, res) {
    if (req.url == "/") {
        res.writeHead(200)
        res.end(getFile(true, "index.html"))
        return
    } else if (req.url == "/cars") {
        res.writeHead(200)
        res.end(getFile(true, "cars.html"))
    } else if (req.url.match('png.*|jpg.*|css|js.*') != null) {
        const urlClient = req.url.match('^[^?]*')[0].split('/')[2]
        const extension = path.extname(urlClient)
        res.writeHead(200, {"Content-Type" : mimeType[extension]})
        res.end(getFile(false, req.url))
        return
    } else {
        res.writeHead(404)
        res.end("error 404: not found")
        return
    }
}

const server = http.createServer(onRequest)

server.listen(PORT, '0.0.0.0', () => {
    console.log("server berjalan di http://0.0.0.0:%d", PORT)
})