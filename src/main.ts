import WebSocket, { AddressInfo, Data, Server } from "ws";

export default class Main {
  /**
   * 起動
   */
  public run(): void {
    const info: AddressInfo = { port: 8080, family: "", address: "" };
    const server: Server = new Server(info);
    server.on("connection", (socket, message) => {
      console.log("connection");
      socket.on("message", (data) =>
        this.onMessage(socket, data, server.clients)
      );
    });
    server.on("close", () => {
      console.log("close");
    });
    server.on("error", () => {
      console.log("error");
    });
    server.on("headers", (headers, message) => {
      console.log("headers");
    });
    server.on("listening", () => {
      console.log("listening");
    });
  }

  private onMessage(
    sender: WebSocket,
    data: Data,
    clients: Set<WebSocket>
  ): void {
    // 自分以外の全員に送る
    clients.forEach((value) => {
      if (sender != value) {
        value.send(data);
      }
    });
  }
}
