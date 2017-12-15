const http = require('http');
const fs = require('fs');
const url = require('url');


// 서버 생성
http.createServer((req, res) => {
   console.log(req, res);
   let pathname = url.parse(req.url).pathname;

   console.log("Request for " + pathname + " received.");

   if(pathname=="/"){
       pathname = "/index.html";
   }

   fs.readFile(pathname.substr(1), (err, data) => {
      if (err) {
         console.log(err);
         res.writeHead(404, {'Content-Type': 'text/html'});
      }else{
         res.writeHead(200, {'Content-Type': 'text/html'});

         // 파일을 읽어와서 responseBody 에 작성
         res.write(data.toString());
      }
      // responseBody 전송
      res.end();
   });
}).listen({
    host: '0.0.0.0',
    port: 9081,
});


console.log('Server running at http://127.0.0.1:9081/');
