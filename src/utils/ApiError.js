// Error class is provided by Node.js to handle errors

// we are overriding some of the methods of Error class to provide a better error message to user
class ApiError extends Error {
  constructor(
    message = "Something went wrong",
    statuscode,
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statuscode = statuscode;
    this.data = null;
    this.errors = errors;
    this.message = message;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
