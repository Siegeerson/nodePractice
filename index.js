const http = require('http');
const path = require('path');
const fs   = require('fs');
const server = http.createServer((req,res)=> {
    console.log(req.url);
    // if(req.url == '/'){
    //     fs.readFile(path.join(__dirname,'public','index.html'), (err, content)=>{
    //          if(err) throw err;
    //          res.writeHead(200,{'Content-Type':'text/html'})
    //          res.end(content);
    //     })
    // }
    // if(req.url == '/api/users'){
    //     const users = [
    //         {name:'Bob', age: 29},
    //         {name:'Ted', age: 20}
    //     ];
    //     res.writeHead(200, {'Content-Type': 'application/json'});
    //     res.end(JSON.stringify(users));
    // }
    let filePath = path.join(
        __dirname,
        'public',
        req.url === '/' ?
        'index.html' : req.url
    );
    let extname = path.extname(filePath);
    // set content type
    let contentType = 'text/html';
    switch(extname){
        case '.js':
            contentType = 'text/javascript';
            break;
    }
    fs.readFile(filePath, (err, content) => {
        if(err){
            console.log(filePath);
            if(err.code == 'ENOENT') {
                // page not found
                fs.readFile(
                    path.join(
                        __dirname,
                        'public',
                        '404.html'
                    ),
                    (err, content) => {
                        res.writeHead(200, {'Content-Type': 'text/HTML'});
                        res.end(content,'utf-8');
                    }

                )
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf8');
        }
    })
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>console.log(`Server running on port ${PORT}`));