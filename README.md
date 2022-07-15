### How to start

`npm start` to start proxy server

For example, if you have started local http server on `http://localhost:8000`, to start https proxy server just run `PORT=8000 npm start`. Your proxy server will be accessible on `https://localhost:443` or simply `https://locahost`

### Options

| VARIABLE | DEFAULT VALUE | DESCRIPTION |
|---|---|---|
| KEY | '/selfsigned.key' | path to .key file |
| CERT | '/selfsigned.crt' | path to .crt file |
| HTTP_PORT | 80 | will be used to listen for http connections and upgrade it to https |
| HTTPS_PORT | 443 | will be used as https port |
| SERVER_HOST | '0.0.0.0' | address to target proxy |
| SERVER_PATH | '/' | URL prefix for all incoming requets |
| HOST | 'localhost' | address of targeted hostame |
| PORT | 3000 | redirect requests to this port on targeted hostname |
| pathname | '' | URL prefix for all outgoing requests |
