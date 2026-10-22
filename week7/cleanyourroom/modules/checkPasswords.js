const checkModeratorPassword = (password) => password === 'modpwd123';

const checkAdminPassword = (password) => password === 'adminazerty123';

module.exports = {
  checkModeratorPassword,
  checkAdminPassword,
};
