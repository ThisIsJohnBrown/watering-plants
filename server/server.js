const express = require("express");
const ws = require("ws");
const serveStatic = require("serve-static");
const history = require("connect-history-api-fallback");
const enforce = require("express-sslify");
require("dotenv").config();
const cors = require("cors");
const apiRoutes = require("./routes/api");
const firebase = require("./firebase");
const firestoreDb = firebase.firestore();

const plantsCollection = firestoreDb.collection("plants");
let plants = null;

plantsCollection.onSnapshot(querySnapshot => {
  const newPlants = {};
  querySnapshot.docs.forEach(doc => {
    newPlants[doc.id] = doc.data();
    newPlants[doc.id].id = doc.id;
  });
  plants = newPlants;
  wsServer.clients.forEach(client => {
    if (client !== ws) {
      client.send(
        JSON.stringify({
          event: "updatePlants",
          data: {
            plants,
          },
        })
      );
    }
  });
});

const app = express();
app.use(cors());
if (process.env.ENVIRONMENT !== "local") {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.use("/api", apiRoutes);

app.use(history());
app.use(serveStatic("../client/dist"));

const wsServer = new ws.Server({ noServer: true });
wsServer.on("connection", socket => {
  //  when a client connect, send them the latest and greatest plants list
  socket.send(
    JSON.stringify({
      event: "updatePlants",
      data: {
        plants,
      },
    })
  );
  socket.on("message", message => {
    const event = JSON.parse(message);
    if (event.event === "setLevel") {
      plantsCollection.doc(event.data.id).update({
        level: event.data.level,
      });
    } else if (event.event === "setPlantInfo") {
      console.log(event);
      plantsCollection.doc(event.data.id).update({
        name: event.data.name,
      });
    }
  });
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`👂 on port ${port}`);
});

server.on("upgrade", (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit("connection", socket, request);
  });
});
