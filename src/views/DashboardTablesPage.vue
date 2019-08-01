<template>
  <QsModuleLayout>
    <template v-slot:header>
      <h1>Dashboard</h1>
      <p>Indicadores de desempeño</p>
    </template>

    <template v-slot:content>
      <div class="col-10 container">
        <QsBarChart
          :data="chartData"
          :options="options"
        />
      </div>
    </template>
  </QsModuleLayout>
</template>

<script>
import QsBarChart from '@/components/molecules/QsBarChart'
import QsModuleLayout from '@/components/layouts/QsModuleLayout'

export default {
  components: {
    QsBarChart,
    QsModuleLayout,
  },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February' ],
        datasets: [
          {
            label: 'Valor Radicado',
            backgroundColor: '#282721',
            data: [40, 20],
          },
          {
            label: 'Valor Pagado',
            backgroundColor: '#D2CFAF',
            data: [20, 5],
          },
        ]
      },
      options: {
        responsive: true,
        mainAspectRatio: true,
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true,
          }]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
}
</style>
