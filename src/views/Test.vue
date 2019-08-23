<template>
  <div>
    <p v-if="token">
      {{ token }}
    </p>
    <p v-else>
      token is undefined
    </p>
    <div v-if="isOpen">
      menu is open
    </div>
    <div v-else>
      menu is closed
    </div>
    <button @click="switchMenu">
      Switch menu
    </button>
    <router-link to="/">
      Home
    </router-link>
    {{ todos }}
    <div>
      {{ today }}
    </div>
    <div>
      {{ $moment(Date.now()).utc().format("llll") }}
    </div>
    <div>
      {{ $duration(500).humanize() }}
    </div>
    <!-- String based, rule -->
    <!-- <input 
      v-validate="'required'" 
      name="myInput" 
      type="text" 
    >
    <span>{{ errors.first('myInput') }}</span> -->

    <!-- string based, multiple rules -->
    <!-- <input
      v-validate="'required|email'"
      name="email"
      data-vv-as="Correo electronico"
      type="text"
    >
    <span>{{ errors.first('email') }}</span> -->

    <!-- object based -->
    <!-- <input
      v-validate="{ required: true, email: true }"
      name="email2"
      data-vv-as="Correo secundario"
      type="text"
    >
    <span>{{ errors.first('email2') }}</span> -->

    <!-- string based, params -->
    <!-- <div class="select">
      <select
        v-validate="'included:1,2,3'" 
        name="in_field" 
        data-vv-as="Numero Seleccionado"
      >
        <option value="1">
          One
        </option>
        <option value="2">
          Two
        </option>
        <option value="3">
          Three
        </option>
        <option value="4">
          Invalid
        </option>
      </select>
      <span>
        {{ errors.first('in_field') }}
      </span>
    </div> -->


    <!-- based on standard html5 attributes and input type -->
    <!-- llamadas infered rules, este comportamiento puede desactivarse, https://baianat.github.io/vee-validate/guide/inferred-rules.html#disabling-inferred-rules -->
    <!-- <div>
      <input
        v-validate
        name="email3"
        data-vv-as="Correo 3"
        type="email"
        required
      >
      <span>{{ errors.first('email3') }}</span>
    </div> -->

    <!-- <div>
      <text-field
        v-model="email"
        v-validate="{ required: true, email: true }"
        data-vv-as="Correo electronico nuevo"
        label="Correo electronico 4"
        name="email4"
        type="email"
        :error="errors.first('email4')"
      />
    </div> -->

    <!-- <div>
      <input type="tel" v-mask="'###-###-####'" v-validate="'required'" name="masked" v-model="mask"/>
      <p>{{ mask }}</p>
      <span>{{ errors.first('masked') }}</span>
    </div> -->

    <!-- <div>
      <b-form-input 
        v-model="mask" 
        v-validate="{ required: true, regex: /\d{3}-\d{3}-\d{4}/ }"
        v-mask="'###-###-####'"
        name="masked"
        placeholder="Enter your name" 
      />
      <p>{{ mask }}</p>
      <span>{{ errors.first('masked') }}</span>
    </div> -->

    <div>
      <b-form
        @submit.prevent="onSubmit"
        @reset.prevent="onReset"
      >
        <qs-input 
          v-model="testInput" 
          v-validate="{ required: true }"
          name="testInput"
          label="Label"
          description="Description"
          placeholder="Placeholder"
          :field="fields['testInput']"
          :error="errors.first('testInput')"
        />

        <b-button 
          type="submit" 
          variant="primary"
        >
          Submit
        </b-button>
        <b-button 
          type="reset" 
          variant="danger"
        >
          Reset
        </b-button>
      </b-form>
    </div>

    <div v-if="isFormDirty">
      Form is Dirty
    </div>
    <div v-else>
      Form is Clean
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TextField from '@/components/atoms/TextField'
import QsInput from '@/components/atoms/QsInput'

export default {
  title: 'Test',
  components: {
    QsInput,
  },
  data() {
    return {
      today: new Date(),
      mask: '',
      email: '',
      testInput: '',
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ]),
    ...mapGetters('menu', {
      isOpen: 'isOpen',
      todos: 'todos'
    }),
    isFormDirty() {
      return Object.keys(this.fields).some(key => this.fields[key].dirty);
    }
  },
  mounted() {
    this.getTodos()
    .then(x => console.log(x))
    .catch(e => console.log(e))
  },
  methods: {
    ...mapActions('menu', [
      'open',
      'close',
      'getTodos'
    ]),
    switchMenu(){
      const action = this.isOpen ? this.close : this.open;
      action()
    },
    onSubmit(){
      this.$validator.validateAll().then(result => {
        if(result){
          console.log('Submitted valid form')
        } else {
          console.log('Invalid')
        }
      })
    },
    onReset(){
      console.log('testInput', this.testInput)
      this.testInput = ''
      console.log('testInput cleared', this.testInput)
      this.$validator.reset();
    },
  }
}
</script>

<style scoped>

</style>