import Vue from "vue"
if (!Vue.__global_mixin_) {
  Vue.__global_mixin_ = true
  Vue.mixin({
    computed: {

    },
    methods: {
      moment(date) {
        return this.$moment(date).format("DD/MM/YYYY HH:mm:ss")
      },
    }
  })
}