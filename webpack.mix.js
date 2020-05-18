let mix = require("laravel-mix")
const tailwindcss = require("tailwindcss")

const purgecss = require("@fullhuman/postcss-purgecss")({

  // Specify the paths to all of the template files in your project
  content: [
    "./resources/**/*.vue",
    // etc.
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
})

mix.setPublicPath("dist")
    .js("resources/js/field.js", "js")
    .sass("resources/sass/field.scss", "css")
    .options({
      processCssUrls: false,
      postCss: [
        tailwindcss("./tailwind.config.js"),
        ...process.env.NODE_ENV === "production"
        ? [purgecss]
        : []
      ],
    })
