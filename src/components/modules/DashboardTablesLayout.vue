<template>
  <div class="row p-3">

    <div class="col col-xl-6">
      <p>Estadisticas por EPS</p>
      <b-table 
        hover 
        striped 
        :small="true"
        head-variant="dark"
        :items="perEntityRows" 
        :fields="perEntityLabels"
      />
    </div>

    <div class="col col-xl-6">
      <div class="row">

      <p>Estadisticas por tipo de incapacidad</p>
        <b-table 
          hover 
          striped 
          :small="true"
          head-variant="dark"
          :items="perAccidentRows" 
          :fields="perAccidentLabels"
        />
      </div>

      <div class="row">
        <p>Estadisticas por tipo de enfermedad</p>
        <b-table 
          hover 
          striped 
          :small="true"
          head-variant="dark"
          :items="perSickLeaveRows" 
          :fields="perSickLeaveLabels"
        />
      </div>

      <b-modal 
        id="modalError" 
        v-model="showErrorModal" 
        title="Error" 
        header-bg-variant="danger"
        header-text-variant="light"
      >
        <p>
          Error al cargar los datos
        </p>

        <div 
          slot="modal-footer" 
          class="w-100"
        >
          <b-button
            variant="danger"
            size="sm"
            class="float-right"
            @click="showErrorModal = false"
          >
            Cerrar
          </b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      perEntityRows: null,
      perAccidentRows: null,
      perSickLeaveRows: null,
      showErrorModal: false,
    }
  },
  computed: { 
    labels(){
      return [
        {
          key: 'vlrRad',
          label: 'VALOR RADICADO',
        },
        {
          key: 'vlrAprob',
          label: 'VALOR APROBADO',
        },
        {
          key: 'vlrPend',
          label: 'VALOR PENDIENTE',
        },
      ]
    },
    perEntityLabels(){
      return [
        {
          key: 'rowTitle',
          label: 'EPS/ARL',
          variant: 'dark',
        },
        ...this.labels
      ]
    },
    perAccidentLabels(){
      return [
        {
          key: 'rowTitle',
          label: 'Tipo Incapacidad',
          variant: 'dark',
        },
        ...this.labels
      ]
    },
    perSickLeaveLabels(){
      return [
        {
          key: 'rowTitle',
          label: 'Tipo Enfermedad',
          variant: 'dark',
        },
        ...this.labels
      ]
    },
  },
  created() {
    const promises = [
      this.getPerEntityRows(),
      this.getPerAccidentRows(),
      this.getPerSickLeaveRows(),
    ]

    this.showProgressBar()
    Promise.all(promises)
      .then(([
        perEntityRowsResult,
        perAccidentRowsResult, 
        perSickLeaveRowsResult ]) => {
          this.perEntityRows = perEntityRowsResult.data
          this.perAccidentRows = perAccidentRowsResult.data
          this.perSickLeaveRows = perSickLeaveRowsResult.data
      })
      .catch(this.catch)
      .finally(() => this.hideProgressBar())
  },
  methods: {
    getPerEntityRows(){
      return this.axios.get('/tables/perEntity')
    },
    getPerAccidentRows(){
      return this.axios.get('/tables/perAccident')
    },
    getPerSickLeaveRows(){
      return this.axios.get('/tables/perSickLeave')
    },
    catch(error){
      this.showErrorModal = true
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
