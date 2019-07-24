<template>
  <b-navbar 
    class="navbar" 
    type="dark" 
    variant="dark"
  >
    <b-navbar-brand href="#">
      NavBar
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" />

    <b-collapse 
      id="nav-collapse" 
      is-nav
    >
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template slot="button-content">
            {{ userName }}
          </template>
          <b-dropdown-item 
            href="#" 
            @click="logOut"
          >
            Cerrar sesión
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('login', {
      user: 'user',
    }),
    userName() {
      return this.user.firstName
    },
  },
  methods: {
    ...mapActions('login', {
      logOutStore: 'logOut',
    }),
    logOut(){
      this.logOutStore()
        .then(() => {
          this.$router.push({ name: 'login' })
        })
    }
  },
}
</script>

<style lang="scss" scoped>
.navbar {
}
</style>
