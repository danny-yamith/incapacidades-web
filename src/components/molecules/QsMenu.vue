<template>
  <nav>
    <ul>
      <li>
        <router-link :to="{ name: 'incapacidades'}">
          Incapacidades
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'accidentes'}">
          Accidentes
        </router-link>
      </li>
      <li v-if="isAdmin">
        <router-link :to="{ name: 'dashboard'}">
          Dashboard
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
}
</script>

<style lang="scss" scoped>

</style>
