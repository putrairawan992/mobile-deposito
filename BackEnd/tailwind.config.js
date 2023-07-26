const withMT = require("@material-tailwind/html/utils/withMT");

module.exports = withMT({
  content: ["./public/**/*.js", "./resources/**/*.blade.php"],
  theme: {
    extend: {},
  },
  plugins: [],
});