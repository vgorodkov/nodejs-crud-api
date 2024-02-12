const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts', // Entry point of your TypeScript application
  target: 'node', // Set the target environment to Node.js
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output filename
  },
};
