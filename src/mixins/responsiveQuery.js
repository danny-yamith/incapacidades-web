
function isPhone(){
  return this.$mq == 'xs'
    || this.$mq == 'sm'
}

function isNotPhone(){
  return !this.isPhone()
}

function isTablet(){
  return this.$mq == 'md'
}

function isNotTablet(){
  return !this.isTablet()
}

function isDesktop(){
  return this.isNotPhone() && this.isNotTablet()
}

function isNotDesktop(){
  return !this.isDesktop()
}

export default {
  methods: {
    isPhone,
    isNotPhone,
    isTablet,
    isNotTablet,
    isDesktop,
    isNotDesktop,
  },
}