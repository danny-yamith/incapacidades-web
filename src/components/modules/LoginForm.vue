<template>
  <b-form
    class="form"
    @submit.prevent="onSubmit"
    @reset.prevent="onReset"
  >
    <qs-input 
      v-model="username" 
      v-validate="{ required: true }"
      name="username"
      label="Usuario"
      data-vv-as="Usuario"
      placeholder="Ingrese su usuario"
      :field="fields['username']"
      :error="errors.first('username')"
      class="input"
    />

    <qs-input 
      v-model="password" 
      v-validate="{ required: true }"
      name="password"
      label="Contraseña"
      type="password"
      data-vv-as="Contraseña"
      placeholder="Digite su contraseña"
      :field="fields['password']"
      :error="errors.first('password')"
      class="input"
    />

    <div class="form-check">
      <input 
        id="gridCheck1"
        class="form-check-input" 
        type="checkbox" 
      >
      <label 
        class="form-check-label" 
        for="gridCheck1"
      >
        Recordar
      </label>
    </div>

    <div class="controls">
      <b-button 
        type="submit" 
        variant="primary"
        class="button"
        :class="[ { phone: isPhone() } ]"
      >
        Aceptar
      </b-button>
    </div>

    <b-modal 
      id="modalError" 
      v-model="showErrorModal" 
      title="Error" 
      ok-only
      header-bg-variant="danger"
      header-text-variant="light"
    >
      <p>
        {{ error }}
      </p>

      <div 
        slot="modal-footer" 
        class="w-100"
      >
        <b-button
          variant="danger"
          size="sm"
          class="float-right"
          @click="showErrorModal=false"
        >
          Cerrar
        </b-button>
      </div>
    </b-modal>
  </b-form>
</template>

<script>
import QsInput from '@/components/atoms/QsInput'
import { mapActions, mapState, mapGetters } from 'vuex';
import md5 from 'blueimp-md5'

export default {
  components: {
    QsInput,
  },
  data() {
    return {
      username: '',
      password: '',
      showErrorModal: false,
    }
  },
  computed: {
    ...mapState('login', {
      error: 'error',
    }),
    ...mapGetters('login', {
      isAdmin: 'canRegisterNoveltiesToAnyEmployee',
    }),
    poolName() {
      return this.$route.params.poolName
    },
    md5pass() {
      return md5(this.password)
        .toUpperCase()
    }
  },
  methods: {
    ...mapActions('login',{
      logIn: 'logIn',
      logOut: 'logOut',
    }),
    onSubmit() {
      this.showProgressBar()
      this.logIn({ 
        username: this.username,
        password: this.md5pass, 
        poolName: this.poolName
      })
      .then(res => {
        console.log(this.isAdmin)
        this.$router.push({ name: this.isAdmin ? 'dashboard' : 'incapacidades' })
      })
      .catch(this.catch)
      .finally(() => this.hideProgressBar())
    },
    catch(error){
      this.showErrorModal = true
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  padding-top: 2rem;
  padding-left: 4rem;
  padding-right: 4rem;
  font-weight: 500;
  overflow-y: auto;

  .input {
    color: white;
    text-transform: uppercase;
    margin-bottom: 2rem;
    --danger: #ff748b;
    --success: #4fd56c;
    --green: #4fd56c;
  }

  .form-check {
    color: white;
    margin-bottom: 2rem;
  }

  .controls {
    display: flex;
    flex-direction: row;
    align-content: flex-end;
    align-items: flex-end;
    justify-content: flex-end;

    .button {
      padding-left: 2rem;
      padding-right: 2rem;
      margin-bottom: 2rem;

      &.phone {
        flex-grow: 1;
      }
    }
  }
}
</style>
