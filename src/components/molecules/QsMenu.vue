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
    </ul>
  </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>
