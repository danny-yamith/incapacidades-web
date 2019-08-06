<template>
  <nav>
    <ul>
      <li>
        <router-link 
          :to="{ name: 'incapacidades'}" 
          @click.native="hideMenu"
        >
          Incapacidades
        </router-link>
      </li>
      <li>
        <router-link 
          :to="{ name: 'accidentes'}"
          @click.native="hideMenu"
        >
          Accidentes
        </router-link>
      </li>
      <li v-if="isAdmin">
        <router-link 
          :to="{ name: 'dashboard'}"
          @click.native="hideMenu"
        >
          Dashboard
        </router-link>
      </li>
      <li v-if="isAdmin">
        <router-link 
          :to="{ name: 'mis-accidentes'}"
          @click.native="hideMenu"
        >
          Mis Accidentes
        </router-link>
      </li>
      <li v-if="isAdmin">
        <router-link :to="{ name: 'test'}">
          Test Table
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('login', {
      isAdmin: 'canRegisterNoveltiesToAnyEmployee',
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

</style>
