<template>
  <QsModuleLayout>
    <template v-slot:header>
      <h1 v-if="isNotPhone()">Dashboard</h1>
      <h4 v-if="isPhone()">Dashboard</h4>
      <div>Indicadores de desempeño</div>
    </template>

    <template v-slot:content>
      <DashboardTablesLayout 
        :start-date="startDate" 
        :end-date="endDate"
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
  data() {
    return {
      title: 'Dashboard'
    }
  },
  computed: {
    startDate() {
      return this.$moment()
        .subtract(30, 'days')
        .utc()
        .format()
    },
    endDate() {
      return this.$moment()
        .utc()
        .format()
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
