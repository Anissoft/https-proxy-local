import express from 'express';
import path from 'path';
import proxy from 'express-http-proxy';
import { createServer as createHttpServer  } from 'http';
import { createServer as createHttpsServer } from 'https';
import { readFileSync } from 'fs';

const __dirname = path.resolve();
// SERVER OPTIONS
const selfSignedKeyPath   = process.env.KEY || '/selfsigned.key';
const selfSignedCertPath  = process.env.CERT || '/selfsigned.crt';
const httpPort            = process.env.HTTP_PORT || 80;
const httpsPort           = process.env.HTTPS_PORT || 443;
const listenHostanme      = process.env.SERVER_HOST || '0.0.0.0';
const proxyPath           = process.env.SERVER_PATH || '/';
// TARGET OPTIONS
const port                = process.env.PORT || 3000;
const host                = process.env.HOST || 'localhost';
const pathname            = process.env.PATHNAME || '';
const applicationUrl = port 
  ? `${host}:${port}${pathname}`
  : process.env.URL;

if (!applicationUrl) {
  console.error('Please specify URL or PORT [, PATHNAME]');
  process.exit(1);
}

const key = readFileSync(path.join(__dirname, selfSignedKeyPath));
const cert = readFileSync(path.join(__dirname, selfSignedCertPath));

if (!key || !cert) {
  console.error('Please generate self signed certificate or provide correct locataion to them via KEY and CERT');
  process.exit(1);
}

const app = express();
app.use((req,res, next) => {
  if (req.protocol !== 'https') {
    return res.redirect(302, 'https://' + req.get('host') + req.url)
  }

  next();
})
app.use(proxyPath, proxy(applicationUrl, {
  
}));

const httpServer = createHttpServer(app);
const httpsServer = createHttpsServer({ key: key, cert: cert }, app);

httpServer.listen(httpPort, listenHostanme,  () => {
  console.log(`Redirect from http://${listenHostanme}:${httpsPort}${proxyPath} to https://${listenHostanme}:${httpsPort}${proxyPath}`);
});

httpsServer.listen(httpsPort, listenHostanme, () => {
  console.log(`Proxy from https://${listenHostanme}:${httpsPort}${proxyPath} to http://${applicationUrl}`);
});
