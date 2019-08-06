<template>
  <div 
    class="login-page"
    :class="[{ phone: isPhone() }]"
  >
    <div 
      v-if="isNotPhone()"
      class="logo"
    >
      <img :src="`${baseUrl}bfile/getEntLogoByPoolName?ownerId=1&poolName=${poolName}`">
    </div>
    <DualRadialSlicer 
      class="dual-radial-slicer"
      :primary-side="side"
      :show-controls="false"
      :class="[ { phone: isPhone() } ]"
    >
      <template v-slot:top>
        <QsProgressBar 
          v-if="isLoading"
          :indeterminate="isLoadingIndeterminate"
          :percentage="percentageLoaded"
        />
      </template>
      <template v-slot:left>
        <div class="left">
          <div class="img-small" />
          <p>
            Recobro Incapacidades y Licencias
          </p>
          <div class="img" />
        </div>
      </template>
      <template v-slot:right>
        <div class="right">
          <div class="title">
            <h1>
              Ingresar
            </h1>
            <h1>
              {{ poolName }}
            </h1>
          </div>
          <LoginForm />
        </div>
      </template>
    </DualRadialSlicer>
  </div>
</template>

<script>
import DualRadialSlicer from '@/components/layouts/DualRadialSlicerLayout'
import LoginForm from '@/components/modules/LoginForm'
import QsProgressBar from '@/components/atoms/QsProgressBar'
import { setTimeout } from 'timers';
import { baseUrl } from '@/utils/constants'

export default {
  components: {
    DualRadialSlicer,
    LoginForm,
    QsProgressBar,
  },
  data() {
    return {
      side: 'left',
      baseUrl,
    }
  },
  computed: {
    poolName() {
      return this.$route.params.poolName
    },
  },
  mounted() {
    this.showProgressBar()
    setTimeout(() => {
      this.side = 'right'
      this.hideProgressBar(2000)
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100%;
  width: 100%;
  background: url('../assets/img/main.jpg');
  display: flex;
  flex-direction: column;

  &.phone {
    background: #2296F3;
  }

  .logo {
    margin-top: 5%;
    margin-right: 15%;
    display: flex;
    flex-direction: row;
    position: relative;
    right: 0;
    left: auto;
    justify-content: flex-end;

    img {
      display: flex;
      height: 40px;
      width: 160px;
    }
  }

  .slicer {
    flex-grow: 1;
  }

  .dual-radial-slicer {
    margin-left: auto;
    margin-right: auto;
    margin-top: 5vh;
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);

    .progress {
      width: 100%;
      z-index: 9999;
      position: relative;
      top: -4px;
      margin-bottom: -4px;
    }

    &.phone {
      margin: 0;

      .left, .right {
        height: 100vh;
        width: 100vw;
        min-width: auto;
      }
    }
    
    .left, .right {
      height: 70vh;
      width: 30%;
      min-width: 400px;
      display: flex;
      flex-direction: column;
    }

    .left {
      background: #2296F3;
      display: flex;
      flex-direction: column;

      p {
        max-width: 40%;
        color: white;
        display: flex;
        margin-left: auto;
        margin-right: auto;
        margin-top: 2rem;
        align-self: flex-start;
        text-align: center;
        font-size: 1.5rem;
        line-height: 1.7rem;
        margin-bottom: 1rem;
      }

      .img {
        background: url('../assets/img/doctor.png') center;
        background-size: cover;
        width: 170px;
        height: 200px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 2rem;
        justify-self: center;
      }

      .img-small {
        background: url('../assets/img/health.png') center;
        background-size: cover;
        width: 25px;
        height: 25px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 2rem;
        justify-self: center;
      }
    }

    .right {
      background: #10243D;
      padding-top: 2rem;

      .title {
        margin-top: 2rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        padding: 0 2rem;
        margin: 0;

        h1 {
          color: white;
          background: #2296F3;
          font-size: 1rem;
          text-align: center;
          padding: .5rem 2rem;
          margin: 0 2px;
        }
      }
    }
  }
}
</style>
