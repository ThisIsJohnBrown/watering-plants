let connection = new WebSocket(`ws://${location.host}`);

export const connect = () => {
  connection.onopen = () => {
    console.log("open");
  };
  connection.onclose = function(e) {
    console.log(
      "Socket is closed. Reconnect will be attempted in 1 second.",
      e.reason
    );
    setTimeout(function() {
      connect();
    }, 1000);
  };

  connection.onerror = function(err) {
    console.error("Socket encountered error: ", err.message, "Closing socket");
    connection.close();
  };
};

const sendEvent = (event, data) => {
  connection.send(
    JSON.stringify({
      event: event,
      data,
    })
  );
};

connect();

export { connection, sendEvent };
