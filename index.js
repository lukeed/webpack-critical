const critical = require('critical');

const ignore = ['font-face', /@import/, /url\(/];

class WebpackCritical {
	constructor(opts) {
		this.generate = this.generate.bind(this);
		this.opts = Object.assign({ minify:true, inline:true, ignore }, opts);
	}

	generate(data, callback) {
		console.log(data);
		// hard-set option values
		this.opts.html = data.html;
		this.opts.dest = data.outputName;
		this.opts.css = [`build/ssr-build${ data.assets.css[0] }`];

		critical.generate(this.opts, (err, result) => {
			data.html = result;
			callback(null, data);
		});
	}

	apply(compiler) {
		compiler.plugin('compilation', bundle => {
			bundle.plugin('html-webpack-plugin-after-html-processing', this.generate);
		});
	}
}

module.exports = WebpackCritical;
