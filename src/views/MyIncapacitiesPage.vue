<template>
  <QsModuleLayout>
    <template v-slot:header>
      <h1>Mis Incapacidades</h1>
    </template>

    <template v-slot:content>
      <MyIncapacitiesTable class="col-12 col-md-10" />
    </template>
  </QsModuleLayout>
</template>

<script>
import QsModuleLayout from '@/components/layouts/QsModuleLayout'
import MyIncapacitiesTable from '@/components/modules/MyIncapacitiesTable'

export default {
  components: {
    QsModuleLayout,
    MyIncapacitiesTable,
  }
}
</script>

<style lang="scss" scoped>

</style>