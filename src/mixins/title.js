import { mapMutations, mapState } from "vuex";

function getTitle(vm) {
    const {title} = vm.$options
    if (title) {
        return typeof title === 'function'
            ? title.call(vm)
            : title
    }
}

export default {
  created() {
    const title = getTitle(this)
    if(title) {
      document.title = title
    }
  },
  computed: {
    ...mapState([ 'title' ])
  },
  methods: {
    ...mapMutations([ 'setTitle' ])
  },
}