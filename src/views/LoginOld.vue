<template>
  <div class="p-1 vh-100 bg">
    <div class="card login-box shadow-sm">
      <h5 class="card-header">
        Registro de Usuario
      </h5>
      <div class="card-body">
        <form>
          <form-field 
            v-model="input.username"
            type="text" 
            icon="fa-user" 
            holder="Usuario o email"
            name="username"
          />
          <form-field 
            v-model="input.password"
            type="password" 
            icon="fa-lock" 
            holder="Contraseña"
            name="password"
          />
          <button 
            type="button" 
            class="btn btn-primary btn-block form-group"
            @click="login()" 
          >
            Iniciar
            Sesión
          </button>
          <div class="small mb-0 mt-3">
            <div class="float-md-left">
              <input type="checkbox">
              Mantener la Sesión
            </div>
            <div class="float-md-right">
              <a href="">
                Olvidó su Contraseña?
              </a>
            </div>
          </div>
        </form>
      </div>
      <div class="card-footer text-center">
        ¿Aun no tiene una cuenta?
        <router-link to="/register">
          Regístrese!
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import FormField from '@/components/atoms/FormField'

export default {
  name: 'Login',
  title: 'Bienvenido',
  components: {
    FormField,
  },
  data() {
    return {
      input: {
        username: "erasomario@gmail.com",
        password: "123456",
      },
    }
  },
  methods: {
    login() {
      console.log('login')
    },
  },
}
</script>

<style scoped>
.bg {
  background-image: url('../assets/img/bg.jpg');
  background-size: cover;
}

.login-box {
  width: 400px;
  margin: 3em auto;
}

@media (max-width: 768px) {
  .login-box {
    width: 90%;
  }
}
</style>
