// npx @11ty/eleventy --serve --input=./src
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/*.css");  
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/robots.txt");
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified
    }

    return content
  });
  eleventyConfig.addNunjucksAsyncFilter('postcss', (cssCode, done) => {
    postcss([tailwindcss(require('./tailwind.config.js')), autoprefixer()])
      .process(cssCode)
      .then(
        (r) => done(null, r.css),
        (e) => done(e, null)
      );
  });
  return {
    htmlTemplateEngine: "njk",
    dir: {
      // ⚠️ This value is relative to your input directory.
      includes: "_includes",
      input: "./src",
      output: ".site"
    },
  }
};

