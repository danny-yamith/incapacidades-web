<template>
  <div class="qs-app-shell container-fluid no-gutters">
    <div class="app-shell row h-100">
      <transition name="slide-left">
        <div 
          v-if="showDrawer"
          class="side-nav col-8 col-sm-6 col-md-3 d-flex flex-column h-100 shadow"
        >
          <div 
            class="title row"
            :style="{ background: themeColor.nav_bar_bg}"
          >
            <img 
              class="p-3"
              :src="`${baseUrl}bfile/getEntLogoByPoolName?ownerId=1&poolName=${poolName}`"
            >
          </div>
          <div class="menu row flex-grow-1">
            <QsMenu @menu-selected="hideMenu" />
          </div>
        </div>
      </transition>
      <transition name="opacity">
        <div 
          v-if="isPhone() && showMenu"
          class="col-12 h-100 empty"
          @click="toggleMenu"
        />
      </transition>
      <div class="content col offset-md-3 p-0 d-flex flex-column">
        <QsNavbar 
          class="nav-bar"
          @toggle-navbar="toggleMenu"
        />
        <QsProgressBar
          v-if="isLoading"
          :indeterminate="isLoadingIndeterminate"
          class="progress"
        />
        <div 
          ref="main" 
          class="main d-flex flex-grow-1"
        >
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
import { baseUrl } from '@/utils/constants';
 
export default {
  components: {
    QsNavbar,
    QsProgressBar,
    QsMenu,
  },
  data(){
    return {
      showMenu: false,
      baseUrl,
    }
  },
  computed: {
    ...mapGetters('login', {
      token: 'token',
      themeColor: 'themeColor',      
    }),
    showDrawer() {
      let show = this.isNotPhone() || this.showMenu
      return show
    },
    poolName() {
      return this.$route.params.poolName
    },
  },
  watch: {
    '$mq'(newValue){
      if(this.isNotPhone()) this.showMenu = false
    },
    $route() {
      this.$refs.main.scrollTop = 0
    },
  },
  created() {
    this.axios.defaults.headers.common = {
      "Authorization": this.token,
    }
  },
  mounted() {
    // this.$router.push({
    //   name: 'incapacidades'
    // })
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    hideMenu(){
      this.showMenu = false
    }
  },
}
</script>

<style lang="scss" scoped>
.qs-app-shell {
  .app-shell {
    height: 100vh;
    overflow-y: auto;

    .side-nav {
      z-index: 3;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;

      .title {
        height: 100px;

        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .menu {
        background: #FFFFFF;
      }
    }

    .empty {
      z-index: 1;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0,0,0,.5);
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

.slide-left-enter-active,
.slide-left-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter {
  transform: translate(-25em, 0);
}

.slide-left-leave-active {
  transform: translate(-25em, 0);
}



.opacity-enter-active,
.opacity-leave-active,
.opacity-enter-active,
.opacity-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.opacity-enter,
.opacity-leave-active {
  opacity: 0;
}

.opacity-leave-active,
.opacity-enter {
  opacity: 0;
}


</style>
