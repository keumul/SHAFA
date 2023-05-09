class UserLoginDto {
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }
  }
  
  class UserAuthDto {
    constructor(username, password, email) {
      this.username = username;
      this.password = password;
      this.email = email;
    }
  }
  
  module.exports = {
    UserLoginDto,
    UserAuthDto,
  };
  