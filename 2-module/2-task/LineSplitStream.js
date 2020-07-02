const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.row = '';
  }

  _transform(chunk, encoding, callback) {
    chunk = chunk.toString();
    const endOfLineIndex = chunk.indexOf(os.EOL);

    if (endOfLineIndex === -1) {
      this.row += chunk;

      callback(null);
    } else {
      const row = this.row + chunk.slice(0, endOfLineIndex);

      this.row = chunk.slice(endOfLineIndex + 2);

      callback(null, row);
    }
  }

  _flush(callback) {
    callback(null, this.row);
  }
}

module.exports = LineSplitStream;
