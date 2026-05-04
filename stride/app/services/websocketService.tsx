
async function connectWebsocket(): Promise<WebSocket> {

  //   return new Promise((resolve, reject) => {

  //     const socket = new WebSocket("YOUR_WS_URL");

  //     socket.onopen = () => {
  //       resolve(socket);
  //     };

  //     socket.onerror = (error) => {
  //       reject(error);
  //     };

  //   });
  // }{

  return new Promise((resolve, reject) => {
    const socket = new WebSocket('ws://guava-3a7j.onrender.com/ws');

    socket.onopen = () => {
      console.log("Websocket connected");
      resolve(socket);
    }

    socket.onerror = (error) => {
      /* Error occurred */
      console.log("websocket error", error)
      console.log("websocketmessage", JSON.stringify(error, null, 2))
      reject(error);

    };

    socket.onclose = (event) => {
      /* Connection closed */
      console.log("websocket connection closed")

    };

    socket.onmessage = (event) => {
      /* Message received */
      console.log("receivedmessage", event.data)
    };

  });


}
export default connectWebsocket;