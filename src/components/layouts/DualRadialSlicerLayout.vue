<template>
  <div class="dual-radial-slicer-layout">
    <slot name="top" />
    <div 
      v-if="isPhone() || isTablet()"
      class="box" 
    >
      <transition 
        name="fade" 
        mode="out-in"
      >
        <div 
          v-if="side == 'left'" 
          key="left"
          class="side left" 
        >
          <slot name="left" />
        </div>
        <div 
          v-if="side == 'right'" 
          key="right"
          class="side" 
        >
          <slot name="right" />
        </div>
      </transition>
    </div>
    <div 
      v-if="isDesktop()"
      class="box" 
    >
      <div class="side left">
        <slot name="left" />
      </div>
      <div class="side">
        <slot name="right" />
      </div>
    </div>
    <div 
      v-if="showControls && isNotDesktop()"
      class="switcher"
    >
      <input 
        id="left" 
        v-model="side"
        type="radio" 
        value="left" 
      >
      <input 
        id="right" 
        v-model="side"
        type="radio" 
        value="right" 
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    primarySide: {
      type: String,
      required: false,
      default: 'right',
    },
    showControls: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    side: {
      get() {
        return this.primarySide
      },
      set(value){
        this.primarySide = value
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.dual-radial-slicer-layout {
  display: flex;
  flex-direction: column;
  position: relative;

  .box {
    display: flex;
    flex-direction: row;
    z-index: 1;
    margin: 0;
    left: 0;
    right: 0;
    top: 40%;
  }

  .switcher {
    display: block;
    position: relative;
    margin: auto;
    margin-top: -20px;
    z-index: 2;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
