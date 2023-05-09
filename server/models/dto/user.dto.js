class UserDTO {
  constructor(user) {
    this.id = user.id;
    this.username = user.username;
    this.role = user.role;
    this.email = user.email;
  }
}

module.exports = UserDTO;
