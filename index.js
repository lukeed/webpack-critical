const basename = require('path').basename;
const minifier = require('html-minifier').minify;
const critical = require('inline-critical');
const filterCSS = require('filter-css');

const context = process.cwd();
const ignore = ['@font-face', /import/, /url\(/];

class WebpackCritical {
	constructor(opts) {
		this.opts = Object.assign({ ignore, context }, opts);
	}

	apply(compiler) {
		const opts = this.opts;

		compiler.plugin('compilation', bundle => {
			bundle.plugin('html-webpack-plugin-after-html-processing', (data, cb) => {
				const file = opts.stylesheet || basename(data.assets.css[0]);
				const source = bundle.assets[file].source();
				const css = filterCSS(source, opts.ignore);
				const result = critical(data.html, css, opts);
				const html = minifier(result.toString(), data.plugin.options.minify);
				cb(null, { html });
			});
		});
	}
}

module.exports = WebpackCritical;
