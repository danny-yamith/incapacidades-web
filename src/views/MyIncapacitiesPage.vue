<template>
  <QsModuleLayout>
    <template v-slot:header>
      <h1 v-if="isNotPhone()">Mis Incapacidades</h1>
      <h4 v-if="isPhone()">Mis Incapacidades</h4>
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