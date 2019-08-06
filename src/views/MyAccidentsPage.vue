<template>
  <QsModuleLayout>
    <template v-slot:header>
      <h1>Mis Accidentes</h1>
    </template>

    <template v-slot:content>
      <MyAccidentsTable class="col-12 col-md-10" />
    </template>
  </QsModuleLayout>
</template>

<script>
import QsModuleLayout from '@/components/layouts/QsModuleLayout'
import MyAccidentsTable from '@/components/modules/MyAccidentsTable'

export default {
  components: {
    QsModuleLayout,
    MyAccidentsTable,
  },
}
</script>

<style lang="scss" scoped>

</style>
