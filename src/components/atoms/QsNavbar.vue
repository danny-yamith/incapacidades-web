<template>
  <b-navbar 
    ref="nav_bar"
    class="navbar shadow-sm"     
  >
    <b-navbar-brand 
      v-if="isPhone()"
      href="#"
      @click="toggleNavbar"
    >
      <img src="../../assets/img/menu.png">
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" />

    <b-collapse 
      id="nav-collapse" 
      is-nav
    >    
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown 
          ref="nav_item"
          right            
        >
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
import { log } from 'util';

export default {
  data() {
    return {
      styleObject: {
        background:'red',
        color: 'blue',
        fontSize: '13px'
      }
    }    
  },
  computed: {
    ...mapGetters('login', {
      user: 'user',
      themeColor: 'themeColor',
    }),
    userName() {
      return this.user ? this.user.firstName : ''
    },
  },
  mounted(){
   var navBar = this.$refs.nav_bar;
   navBar.style.background = this.themeColor.nav_bar_bg
   
   var navItems= this.$refs.nav_item.$children;   
   navItems.forEach(element => {     
      element.$el.style.color = this.themeColor.nav_bar_text 
   });
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
    },
    toggleNavbar(){
      this.$emit('toggle-navbar')
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  z-index: 2;
}
</style>
