Nova.booting((Vue, router, store) => {
    Vue.component('index-vapor-nova-upload', require('./components/IndexField'))
    Vue.component('detail-vapor-nova-upload', require('./components/DetailField'))
    Vue.component('form-vapor-nova-upload', require('./components/FormField'))
})
