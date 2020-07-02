const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.row = '';
  }

  _transform(chunk, encoding, callback) {
    const endOfLineIndex = chunk.indexOf(os.EOL);

    if (endOfLineIndex === -1) {
      this.row += chunk.toString();

      callback(null);
    } else {
      const row = this.row + chunk.toString().slice(0, endOfLineIndex);

      this.row = chunk.toString().slice(endOfLineIndex + 2);

      callback(null, row);
    }
  }

  _flush(callback) {
    callback(null, this.row.toString());
  }
}

module.exports = LineSplitStream;
