
function isMovile(){
  console.log(this.$mq)
  return this.$mq == 'xs'
    || this.$mq == 'sm'
}

function isNotMovile(){
  return !this.isMovile()
}

function isTablet(){
  console.log(this.$mq)
  return this.$mq == 'md'
}

function isNotTablet(){
  return !this.isTablet()
}

function isDesktop(){
  return this.isNotMovile() && this.isNotTablet()
}

function isNotDesktop(){
  return !this.isDesktop()
}

export default {
  methods: {
    isMovile,
    isNotMovile,
    isTablet,
    isNotTablet,
    isDesktop,
    isNotDesktop,
  },
}