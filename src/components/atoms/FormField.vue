<template>
  <div class="form-group">
    <label 
      v-if="label" 
      :for="name"
    >
      {{ label }}
    </label>
    <div class="input-group">
      <div 
        v-if="icon" 
        class="input-group-prepend"
      >
        <span class="input-group-text">
          <i :class="'fa '+icon" />
        </span>
      </div>

      <input 
        :type="type" 
        :class="{'is-invalid':errors}"
        :name="name"
        :placeholder="holder"
        :value="value"
        class="form-control" 
        @input="handleInput"
      >
      <div 
        v-if="(errors)" 
        class="invalid-feedback"
      >
        <div 
          v-for="(e, i) in errors"
          :key="i"
        >
          {{ e }}
        </div>
      </div>
    </div>
    <small 
      v-if="(sub && !errors)" 
      class="form-text text-muted"
    >
      {{ sub }}
    </small>
  </div>
</template>

<script>
export default {
  props: {
    holder: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    sub: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      content: this.value,
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>

<style scoped>

</style>