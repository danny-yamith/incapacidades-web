<template>
  <QsModuleLayout>
    <template v-slot:header>
      <h1>Dashboard</h1>
      <div>Indicadores de desempeño</div>
    </template>

    <template v-slot:content>
      <DashboardTablesLayout 
        :startDate="startDate" 
        :endDate="endDate"
      />
    </template>
  </QsModuleLayout>
</template>

<script>
import QsModuleLayout from '@/components/layouts/QsModuleLayout'
import DashboardTablesLayout from '@/components/modules/DashboardTablesLayout'

export default {
  components: {
    QsModuleLayout,
    DashboardTablesLayout,
  },
  computed: {
    startDate() {
      return this.$moment()
        .subtract(30, 'days')
        .format()
    },
    endDate() {
      return this.$moment()
        .format()
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
