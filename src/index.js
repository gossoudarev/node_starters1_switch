import http from 'http';
import path from 'path';
import fs from 'fs';
import {promisify as $} from 'util';
const PORT = 4321;
http
.createServer(
  (req, res) => {
     console.log(req.url);
     switch (req.url) {
       case '/hello':
         res.end('I greet you, stranger!');
         break;
       case '/1.txt':
       case '/2.txt':
         console.log('i got this!')
         $(fs.readFile)( path.join(__dirname, req.url) )
         .then( data => res.end (String(data)) )
         .catch( error => res.end('Cannot serve this file') );
         break;
       default:
         res.end('I always say the same thing!');
     }
     //res.end('I always say the same thing!');
})
.listen(PORT,
    ()=>console.log(`Started: ${PORT} # ${process.pid} `));
