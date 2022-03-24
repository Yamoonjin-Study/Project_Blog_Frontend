const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const cors = require('cors');
const router = require('./router');
const { addUser, removeUser, getUser, getUserList } = require('./users.js');
const { addChatUser, removeChatUser, getChatUsersInRoom } = require(
  './chatUsers.js');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
// 서버 설정
const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
app.use(cors());
app.use(router);

io.on('connection', (socket) => {
  console.log('새로운 connection이 발생하였습니다.');

  socket.on('login', ({ userId, username }, callback) => {
    if (getUser(userId)) {
      removeUser(userId);
    }
    const { error, user } = addUser(
      { socketId: socket.id, userId: userId, username: username },
    );
    if (error) {
      console.log(error);
      callback({ error: error });
    } else {
      callback({ user: user });
      console.log('접속되었습니다!');
      console.log(
        user.username + '님, 반갑습니다. 소켓서버에 연결되었습니다. 실시간으로 활동정보를 알려드릴게요.');
    }
  });

  socket.on('reconnection', ({ userId, username }, callback) => {
    if (getUser(userId)) {
      removeUser(userId);
    }
    const { error, user } = addUser({
      socketId: socket.id, userId: userId, username: username,
    });
    if (error) {
      console.log(error);
      callback({ error: error });
    } else {
      callback({ user: user });
      console.log('소켓 서버에 재연결되었습니다!');
    }
  });

  //알람 메시지가 왔을때 이벤트(해당 사용자에게 알람 메시지 데이터를 보내줌)
  socket.on('alarm', ({ toUserId, fromUserId, alarmMessage }, callback) => {
    callback('good');
    let toUser = getUser(toUserId);
    let fromUser = getUser(fromUserId);
    console.log(alarmMessage);
    io.to(toUser.socketId).emit('alarm message', { alarmMessage, fromUser });
  });

  //메세지가 왔을때
  socket.on('sendChat', ({ toUsers }, callback) => {
    callback('good');
    let chatMessage = 'message가 왔습니다.';
    for (let i = 0; i < toUsers.length; i++) {
      let toUser = getUser(toUsers[i].id);

      if(toUser){
        io.to(toUser.socketId).emit('chat message', { chatMessage });
      }
    }
  });
// socket.on('join', ({ name, room }, callback) => {
//   const { error, user } = addUser({ id: socket.id, name, room });
//   if (error) {
//     callback({ error: '에러가 발생했어요.' });
//   }
//
//   socket.emit('message', {
//     user: 'admin',
//     text: `${user.name}, ${user.room}에 오신것을 환영합니다.`,
//   });
//
//   socket.broadcast.to(user.room).emit('message', {
//     user: 'admin',
//     text: `${user.name} 님이 가입하셨습니다.`,
//   });
//
//   io.to(user.room).emit('roomData', {
//     room: user.room,
//     users: getUsersInRoom(user.room),
//   });
//   socket.join(user.room);
//
//   callback();
// });
//
// socket.on('sendMessage', (message, callback) => {
//   const user = getUser(socket.id);
//   io.to(user.room).emit('message', { user: user.name, text: message });
//   callback();
// });

  socket.on('getUsers', (callback) => {
    const users = getUserList();
    callback({ users });
  });

  socket.on('disconnect', (userId) => {
    removeUser(userId);
    console.log('연결이 끊어졌어요.');
  });
})
;
server.listen(PORT, () => console.log(`서버가 ${PORT} 에서 시작되었어요`));