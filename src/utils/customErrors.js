class NotFoundUserDuringLoginError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundUserDuringLoginError";
  }
}

class IncorrectLoginOrPasswordError extends Error {
  constructor(message) {
    super(message);
    this.name = "IncorrectLoginOrPasswordError";
  }
}

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthorizationError";
  }
}

module.exports = { NotFoundUserDuringLoginError, IncorrectLoginOrPasswordError, AuthorizationError }