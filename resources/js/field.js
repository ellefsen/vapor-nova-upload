import MasonryWall from "@yeger/vue2-masonry-wall"

Nova.booting((Vue, router, store) => {
  Vue.use(MasonryWall)

  Vue.component("index-vapor-nova-upload", require("./components/IndexField"))
  Vue.component("detail-vapor-nova-upload", require("./components/DetailField"))
  Vue.component("form-vapor-nova-upload", require("./components/FormField"))
})
