<template>
  <div>
    <b-form-group
      :label="label"
      :description="description"
      :style="{ marginBottom: 0 }"
    >
      <b-form-input
        v-model="model"
        v-bind="$attrs"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :state="inputState"
        :list="name"
        @blur="$emit('blur')"
        @focusout="$emit('focusout')"
      />
      <b-form-datalist
        v-if="options"
        :id="name"
        :options="options"
      />
    </b-form-group>  
    <div 
      v-if="error"
      class="error"
    >
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  inject: {
    $validator: '$validator',
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: null,
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
    placeholder: {
      type: String,
      required: false,
      default: null,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    field: {
      type: Object,
      required: false,
      default: null,
    },
    error: {
      type: String,
      required: false,
      default: null,
    },
    options: {
      type: Array,
      required: false,
      default: null,
    },
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set($event) {
        this.$emit('input', $event)
      },
    },
    isDirty(){
      return this.field ? this.field.dirty : false
    },
    inputState() {
      return !this.field
        ? null
        : !this.field.validated
          ? null
          : this.field.validated && this.field.valid
    }
  },
}
</script>

<style lang="scss" scoped>
.error {
  margin-top: .5rem;
  font-size: .8rem;
  color: var(--danger);
  text-transform: none;
}
</style>
