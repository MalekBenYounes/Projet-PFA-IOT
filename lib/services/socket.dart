// import 'package:socket_io_client/socket_io_client.dart' as IO;

// class SocketManager {
//   static final SocketManager _instance = SocketManager._internal();

//   factory SocketManager() {
//     return _instance;
//   }

//   SocketManager._internal() {
//     _socket = IO.io('ws://localhost:4070');
//   }

//   late IO.Socket _socket;

//   void connect()  {
//      _socket.connect();
//   }

//   void disconnect()  {
//      _socket.close();
//   }

//   void sendMessage(String message)  {
//     _socket.emit('message', message);
//   }


//   IO.Socket get socket => _socket;
// }