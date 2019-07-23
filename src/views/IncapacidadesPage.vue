<template>
  <QsModuleLayout>
    <template v-slot:header>
      <h1>Incapacidades</h1>
      <p>Registro de incapacidades</p>
    </template>
    <template v-slot:content>
      <!-- <IncapacidadesForm class="col-12 col-md-10" /> -->
      <router-view />
    </template>
  </QsModuleLayout>
</template>

<script>
import QsModuleLayout from '@/components/layouts/QsModuleLayout'
// import IncapacidadesForm from '@/components/modules/IncapacidadesForm'

export default {
  components: {
    QsModuleLayout,
    // IncapacidadesForm,
  },
  data() {
    return {
      json: 'empty',
    }
  },
}
</script>

<style>

</style>
