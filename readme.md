# webpack-critical

> Extracts & inlines Critical CSS (above-the-fold) with Webpack


## Install

```
$ npm install webpack-critical --save-dev
```

> **Important:** You _must_ also install & configure [`html-webpack-plugin`](https://github.com/jantimon/html-webpack-plugin)!


## Usage

```js
// webpack.config.js
const WebpackCritical = require('webpack-critical');

module.exports = {
  // ...
  plugins: [
    new WebpackCritical({  })
  ]
}
```


## API

### WebpackCritical(options)

#### options.logger

Type: `Function`<br>
Default: `str => console.log(str)`

Replace the default function -- ideal for prepending a symbol or namespace to your messages.

Function receives a (colorized) message `string` as its only parameter.


## Credit

Pulled from [Dan Denny](https://github.com/dandenney)'s article on [Building a Small PWA with Preact and Firebase](https://dandenney.com/posts/front-end-dev/building-a-small-pwa-with-preact-and-firebase) and its [source code](https://github.com/dandenney/building-a-small-pwa-with-preact-and-firebase).


## License

MIT © [Luke Edwards](https://lukeed.com)
