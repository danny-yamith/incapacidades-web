<template>
  <div 
    :style="progressStyle"
    class="progress-bar"
  >
    <div 
      :class="barClass" 
      :style="barStyle"
    />
  </div>
</template>

<script>
function isColor(value){
  if(typeof value != 'string') return false;
  return /#[0-9a-fA-F]{3}([0-9a-zA-Z]{3})?/.test(value)
}

export default {
  props: {
    indeterminate: {
      type: Boolean,
      required: false,
      default: true,
    },
    barColor: {
      type: String,
      required: false,
      default: '#2296F3',
      validator: function(value) {
        return isColor(value)
      },
    },
    backgroundColor: {
      type: String,
      required: false,
      default: '#fff',
      validator: function(value) {
        return isColor(value)
      },
    },
    percentage: {
      type: Number,
      required: false,
      default: 0,
      validator: function (value){
        return value >= 0 && value <= 100
      },
    },
  },
  computed: {
    barStyle() {
      return [{  
          width: `${this.percentage}%`,
          backgroundColor: this.barColor,
      }]
    },
    barClass() {
      return [
        this.indeterminate ? 'indeterminate': 'determinate',
      ]
    },
    progressStyle() {
      return [{
        backgroundColor: this.backgroundColor,
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  position: relative;
  height: 4px;
  display: block;
  width: 100%;
  background-color: #acece6;
  border-radius: 2px;
  background-clip: padding-box;
  overflow: hidden; 
  margin: 0;
  padding: 0;

  .indeterminate {
    &:before {
      content: '';
      position: absolute;
      background-color: inherit;
      top: 0;
      left: 0;
      bottom: 0;
      will-change: left, right;
      -webkit-animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
              animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite; 
    }

    &:after {
      content: '';
      position: absolute;
      background-color: inherit;
      top: 0;
      left: 0;
      bottom: 0;
      will-change: left, right;
      -webkit-animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
              animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
      -webkit-animation-delay: 1.15s;
              animation-delay: 1.15s; 
    }
  }

  .determinate {
    position: absolute;
    background-color: inherit;
    top: 0;
    bottom: 0;
    transition: width .3s linear; 
  }
}

@-webkit-keyframes indeterminate {
  0% {
    left: -35%;
    right: 100%; 
  }
  60% {
    left: 100%;
    right: -90%; 
  }
  100% {
    left: 100%;
    right: -90%; 
  }
}

@keyframes indeterminate {
  0% {
    left: -35%;
    right: 100%; 
  }
  60% {
    left: 100%;
    right: -90%; 
  }
  100% {
    left: 100%;
    right: -90%; 
  } 
}

@-webkit-keyframes indeterminate-short {
  0% {
    left: -200%;
    right: 100%; 
  }
  60% {
    left: 107%;
    right: -8%; 
  }
  100% {
    left: 107%;
    right: -8%; 
  } 
}

@keyframes indeterminate-short {
  0% {
    left: -200%;
    right: 100%; 
  }
  60% {
    left: 107%;
    right: -8%; 
  }
  100% {
    left: 107%;
    right: -8%; 
  } 
}
</style>
