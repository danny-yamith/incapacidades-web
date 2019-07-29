<template>
  <div class="qs-app-shell container-fluid no-gutters">
    <div class="app-shell row h-100">
      <div class="side-nav col-3 d-flex flex-column h-100 shadow">
        <div class="title row">
          <!-- <img src="../../assets/img/logo.png"> -->
        </div>
        <div class="menu row flex-grow-1">
          <QsMenu />
        </div>
      </div>
      <div class="content col offset-md-3 p-0 d-flex flex-column">
        <QsNavbar class="nav-bar" />
        <QsProgressBar
          v-if="isLoading"
          :indeterminate="isLoadingIndeterminate"
        />
        <div class="main d-flex flex-grow-1">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QsNavbar from '@/components/atoms/QsNavbar'
import QsProgressBar from '@/components/atoms/QsProgressBar'
import QsMenu from '@/components/molecules/QsMenu'
import { mapGetters } from 'vuex';
 
export default {
  components: {
    QsNavbar,
    QsProgressBar,
    QsMenu,
  },
  computed: {
    ...mapGetters('login', {
      token: 'token'
    }),
  },
  created() {
    console.log('shell created')
    this.axios.defaults.headers.common = {
      "Authorization": this.token,
    }
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
    height: 100vh;
    overflow-y: auto;

    .side-nav {
      z-index: 1;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;

      .title {
        height: 100px;
        background: #343A40;
      }
      .menu {
        background: #FFFFFF;
      }
    }
    .content {
      height: 100vh;
      .main {
        height: 100vh;
        overflow-y: auto;
      }
    }
  }
}
</style>
