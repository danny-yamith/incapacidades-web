<template>
  <div class="qs-app-shell container-fluid no-gutters">
    <div class="app-shell row h-100">
      <div class="side-nav col-3">
        <div class="title row">
          <!-- <img src="../../assets/img/logo.png"> -->
        </div>
        <div class="menu row" />
      </div>
      <div class="content col p-0 d-flex flex-column">
        <QsNavbar class="nav-bar">
          <b-navbar-brand href="#">
            NavBar
          </b-navbar-brand>
          <b-navbar-toggle target="nav-collapse" />
        </QsNavbar>
        <div class="main flex-grow-1">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QsNavbar from '@/components/atoms/QsNavbar'
 
export default {
  components: {
    QsNavbar,
  },
  mounted() {
    this.$router.push({
      name: 'incapacidades'
    })
  },
}
</script>

<style lang="scss" scoped>
.qs-app-shell {
  .app-shell {
    .title {
      background: red;
    }
    .content {
      .main {
        overflow-y: auto;
      }
    }
  }
}
</style>
