const WebSocket = require('ws');

const wss = new WebSocket.Server({port:8081}, () =>{
  console.log("Signalling server in now listening on port 8080")
});

wss.broadcast = (ws,data) =>{
  wss.clients.forEach((client) =>{
    if(client !== ws && client.readyState == WebSocket.OPEN){
      client.send(data);
    }
  });
};

wss.on('connection', ws =>{
  console.log(`Client connected. Total connected clients: ${wss.clients.size}`);

  ws.on('message', message => {
    console.log(message +"\n\n");
    wss.broadcast(ws.message);
  });
  ws.on('close', ws => {
    console.log(`Client disconnect. Total connect clients: ${wss.clients.size}`);
  });
  ws.on('error', error =>{
    console.log(`Client error. Total connected clients:${wss.clients.size}`);
  });
});
