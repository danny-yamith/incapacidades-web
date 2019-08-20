<template>
  <QsModuleLayout>
    <template v-slot:header>
      <h1 v-if="isNotPhone()">Accidentes</h1>
      <h4 v-if="isPhone()">Accidentes</h4>
      <p>Registro de accidentes</p>
    </template>

    <template v-slot:content>
      <AccidentsForm
        class="col-12 col-md-10" 
      />
    </template>
  </QsModuleLayout>
</template>

<script>
import QsModuleLayout from '@/components/layouts/QsModuleLayout'
import AccidentsForm from '@/components/modules/AccidentsForm'

export default {
  components: {
    QsModuleLayout,
    AccidentsForm,
  },
}
</script>

<style lang="scss" scoped>

</style>
