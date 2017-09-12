# webpack-critical

> Extracts & inlines Critical CSS with Webpack


## Install

```
$ npm install webpack-critical --save-dev
```

> **Important:** You _must_ also install & configure [`html-webpack-plugin`](https://github.com/jantimon/html-webpack-plugin)!


## Usage

```js
// webpack.config.js
const { resolve } = require('path');
const HTML = require('html-webpack-plugin');
const WebpackCritical = require('webpack-critical');

const dist = resolve('build');

module.exports = {
  output: {
    path: dist
  },
  // ...
  plugins: [
    new HTML({ ... })
    new WebpackCritical({
      context: dist
      ignore: [/bootstrap/, '@font-face']
    })
  ]
}
```


## API

### WebpackCritical(options)

#### options.context

Type: `String`<br>
Default: `process.cwd()`

The directory context to search for your (built) stylesheet.

> **Note:** In most cases, this should match your `output.path` value.

#### options.ignore

Type: `String`, `RegExp`, `Function`, or `Array`<br>
Default: `['@font-face', /import/, /url\(/]`

Patterns to ignore CSS styles or files. Refer to [`filter-css`](https://github.com/bezoerb/filter-css#pattern) for more information.

#### options.stylesheet

Type: `String`<br>
Default: `null`

The filename or filepath (relative to `context`) of a specific CSS stylesheet to use for inlining.

If no value is passed, the primary CSS asset is used (as determined by [`html-webpack-plugin`](https://github.com/jantimon/html-webpack-plugin)). If you are [extracting a stylesheet](https://github.com/webpack-contrib/extract-text-webpack-plugin#usage), this will be the correct value _99%_ of the time.


## Credit

Inspired by [Dan Denny](https://github.com/dandenney)'s article on [Building a Small PWA with Preact and Firebase](https://dandenney.com/posts/front-end-dev/building-a-small-pwa-with-preact-and-firebase), which lead me to take a much closer look at [`critical`](https://github.com/addyosmani/critical), maintained by [Addy Osmani](https://github.com/addyosmani) and [Ben Zörb](https://github.com/bezoerb).


## License

MIT © [Luke Edwards](https://lukeed.com)
