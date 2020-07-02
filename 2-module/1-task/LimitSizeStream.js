const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.options = options;
    this.chunksSize = 0;
  }

  _transform(chunk, encoding, callback) {
    let error = null;

    this.chunksSize += chunk.length;

    if (this.chunksSize > this.options.limit) {
      error = new LimitExceededError();
      throw error;
    }

    callback(error, chunk);
  }
}

module.exports = LimitSizeStream;
