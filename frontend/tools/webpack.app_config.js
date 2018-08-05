// App-specific back-end Webpack config should be here
const serverConfig = {
  entry: {
    index: [
      'babel-polyfill',
      './src/server/index.js',
    ],
  },
};

// App-specific web front-end Webpack config should be here
const webConfig = {
  entry: {
    bundle: [
      'babel-polyfill',
      './src/client/index.jsx',
    ],
  },
};

// App-specific Android React Native front-end Webpack config should be here
const androidConfig = {
  entry: {
    index: [
      require.resolve('./react-native-polyfill.js'),
      './src/mobile/index.js',
    ],
  },
};

// App-specific iOS React Native front-end Webpack config should be here
const iOSConfig = {
  entry: {
    index: [
      require.resolve('./react-native-polyfill.js'),
      './src/mobile/index.js',
    ],
  },
};

const dependencyPlatforms = {
  "validator": "server",
  "express-validator": "server",
  "etag": "server",
  "request-promise": "server",
  "body-parser": "server",
  "bootstrap": "server",
  "config": "server",
  "dataloader": "server",
  "expo": ["ios", "android"],
  "web3": ["web", "server"],
  "express": "server",
  "graphql-server-express": "server",
  "graphql-subscriptions": "server",
  "graphql-tools": "server",
  "history": "web",
  "immutability-helper": ["ios", "android", "web"],
  "isomorphic-fetch": "server",
  "knex": "server",
  "persistgraphql": ["server", "web"],
  "performance-now": "server",
  "react-dom": "web",
  "react-ga": "web",
  "react-helmet": "web",
  "react-hot-loader": "web",
  "react-native": ["ios", "android"],
  "react-native-web": "web",
  "react-redux": "web",
  "react-router": "web",
  "react-router-dom": ["web", "ios", "android"],
  "react-router-redux": "web",
  "react-transition-group": "web",
  "reactstrap": "web",
  "redux-devtools-extension": "web",
  "redux-form": "web",
  "serialize-javascript": "server",
  "source-map-support": "server",
  "styled-components": ["server", "web"],
};

export { webConfig, serverConfig, androidConfig, iOSConfig, dependencyPlatforms };
