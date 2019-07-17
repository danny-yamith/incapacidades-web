<template>
  <div class="form__input">
    <label 
      v-if="label" 
      class="form__label"
    >
      {{ label }}
    </label>
    <input 
      :type="type" 
      :value="value" 
      :disabled="disabled"
      :class="{ 'input': true, 'input__error': !!error }"
      :name="name"
      @input="updateValue"
      @change="updateValue"
      @blur="$emit('blur')"
    >
    <transition name="slide">
      <p 
        v-show="error" 
        class="form__error"
      >
        {{ error }}
      </p>
    </transition> 
  </div>
</template>

<script>
export default {
  $_veeValidate: {
    value() {
      return this.value;
    }
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: "text",
      validator: val => {
        return (
          ["url", "text", "password", "email", "search"].indexOf(val) !== -1
        );
      }
    }
  },
  methods: {
    updateValue(e) {
      this.$emit("input", e.target.value);
    }
  }
}
</script>
