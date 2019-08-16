<template>
  <nav class="menu">
    <div class="separador">
      Menu
    </div>
    <ul>
      <router-link 
        v-if="isAdmin"
        tag="li"
        :to="{ name: 'dashboard'}"
        @click.native="hideMenu"
      >
        <div class="fas fa-table text-primary"></div>
        <span>Dashboard</span>
      </router-link>
      <router-link 
        tag="li"
        :to="{ name: 'incapacidades'}" 
        @click.native="hideMenu"
      >
        <div class="fas fa-wheelchair text-primary"></div>
        <span>Registrar Incapacidad</span>
      </router-link>
      <router-link 
        tag="li"
        :to="{ name: 'accidentes'}"
        @click.native="hideMenu"
      >
        <div class="fas fa-car-crash text-primary"></div>
        <span>Registrar Accidente</span>
      </router-link>
      <router-link 
        v-if="hasContract"
        tag="li"
        :to="{ name: 'mis-incapacidades'}"
        @click.native="hideMenu"
      >
        <div class="fas fa-stethoscope text-primary"></div>
        <span>Mis Incapacidades</span>
      </router-link>
      <router-link 
        v-if="hasContract"
        tag="li"
        :to="{ name: 'mis-accidentes'}"
        @click.native="hideMenu"
      >
        <div class="fas fa-blind text-primary"></div>
        <span>Mis Accidentes</span>
      </router-link>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('login', {
      isAdmin: 'isAdmin',
      hasContract: 'hasContract',
    }),
  },
  methods: {
    hideMenu(){
      this.$emit('menu-selected')
    },
  }
}
</script>

<style lang="scss" scoped>
nav.menu {
  width: 100%;
  background: violet;
}

.separador {
  padding: 8px 8px 8px 15px;
  text-transform: uppercase;
  color: #727272;
  font-weight: bold;
  background-color: #F3F3F3;
}

ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
  margin: 0;
  padding: 0;
  // background: blue;
  width: 100%;

  li {
    text-decoration: none;
    display: grid;
    grid-template-columns: 25px auto;
    padding: 10px 15px 10px 15px;
    width: 100%;

    &:hover {
      background: #EAEAEB;
    }

    .fas {
      margin-top: 4px;
    }

    span {
      margin-left: 4px;
      color: #727272;
      font-weight: 500;
    }
  }
}

.router-link-exact-active {
  background: #f3f3f3;

  span {
    color: #007BFF;
  }
}
</style>
