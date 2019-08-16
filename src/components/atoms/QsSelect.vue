<template>
  <div>
    <b-form-group 
      :label="label" 
      :description="description"
      :label-for="name"
      :style="{ marginBottom: 0 }"
    >
      <b-form-select
        v-model="model"
        v-bind="$attrs"
        :options="options"
        :name="name"
        :state="state"
      >
        <template slot="first">
          <option 
            v-if="emptyOption"
            :value="null" 
          >
            {{ emptyOption }}
          </option>
        </template>
      </b-form-select>
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
    emptyOption: {
      type: String,
      required: false,
      default: null,
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: [ Object, String, Number ],
      required: false,
      default: null,
    },
    label: {
      type: String,
      required: false,
      default: null,
    },
    name: {
      type: String,
      required: false,
      default: null,
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
    validate: {
      type: Object,
      required: false,
      default: null,
    },
  },
  computed: {
    model: {
      get(){
        return this.value
      },
      set(value){
        this.$emit('input', value)
      }
    },
    required() {
      return this.validate && this.validate.required 
        ? this.validate.required 
        : false
    },
    isDirty() {
      return this.field ? this.field.dirty : false
    },
    state() {
      return !this.field
        ? null
        : !this.field.validated
          ? null
          : this.field.validated && this.field.valid
    },
  }
}
</script>

<style lang="scss" scoped>
.error {
  margin-top: .5rem;
  font-size: .8rem;
  color: var(--red);
  text-transform: none;
}
</style>