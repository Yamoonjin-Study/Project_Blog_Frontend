const chatUsers = [];

const addChatUser = ({ id, name, room }) => {
//이름의 공백 제거
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingChatUser = chatUsers.find(
    (chatUser) => chatUser.room === room && chatUser.name === name,
  );

  if (!name || !room) {
    return { error: '사용자 이름과 방이 필요합니다.' };
  }
  if (existingChatUser) {
    return { error: '이미 사용중인 이름입니다.' };
  }

  const chatUser = { id, name, room };

  chatUsers.push(chatUser);

  return { chatUser };
};

const removeChatUser = (id) => {
  const index = chatUsers.findIndex((chatUser) => chatUser.id === id);

  if (index !== -1) {
    return chatUsers.splice(index, 1)[0];
  }
};

const getChatUsersInRoom = (room) => chatUsers.filter(
  (user) => user.room === room);

module.exports = {
  addChatUser,
  removeChatUser,
  getChatUsersInRoom,
};