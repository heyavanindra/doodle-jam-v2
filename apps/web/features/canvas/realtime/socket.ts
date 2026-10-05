export class SocketClient {
  private socket: WebSocket | null = null;

  connect(url: string) {
    this.socket = new WebSocket(url);
  }

  send(message: unknown) {
    if (this.socket?.readyState !== WebSocket.OPEN) {
      return;
    }

    this.socket.send(JSON.stringify(message));
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
  }
}
