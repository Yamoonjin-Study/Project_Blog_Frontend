const users = [];

const addUser = ({ socketId, userId, nickName }) => {

  const existingUser = users.find(
    (user) => user.nickName === nickName,
  );

  if (!nickName) {
    return { error: '사용자 이름이 필요합니다.' };
  }
  if (existingUser) {
    removeUser(userId);
  }
  const user = { socketId, userId, nickName };

  users.push(user);

  return { user };
};

const removeUser = (userId) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].userId === userId) {
      users.splice(i, 1);
      i--;
    }
  }
  return users;
};

const getUser = (userId) => users.find((user) => user.userId === userId);

const getUserList = () => JSON.stringify(users);

module.exports = { addUser, removeUser, getUser, getUserList };