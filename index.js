const join = require('path').join;
const readFile = require('fs').readFile;
const critical = require('inline-critical');
const minifier = require('html-minifier').minify;
const filterCSS = require('filter-css');

const context = process.cwd();
const ignore = ['@font-face', /import/, /url\(/];

class WebpackCritical {
	constructor(opts) {
		this.generate = this.generate.bind(this);
		this.opts = Object.assign({ ignore, context }, opts);
	}

	generate(data, callback) {
		const file = join(this.opts.context, data.assets.css[0]);
		readFile(file, 'utf8', (err, buf) => {
			const css = filterCSS(buf, this.opts.ignore);
			const result = critical(data.html, css, this.opts);
			const html = minifier(result, data.plugin.options.minify);
			callback(null, { html });
		});
	}

	apply(compiler) {
		compiler.plugin('compilation', bundle => {
			bundle.plugin('html-webpack-plugin-after-html-processing', this.generate);
		});
	}
}

module.exports = WebpackCritical;
