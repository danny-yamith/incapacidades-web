<template>
  <div class="row p-3">
    <div class="col-12">
      <ul class="nav nav-tabs">
        <li 
          class="nav-item" 
          @click="showTab('entity')"
        >
          <p 
            class="nav-link"
            :class="[{ active: activeTab == 'entity'}]"
          >
            EPS/ARL
          </p>
        </li>
        <li 
          class="nav-item" 
          @click="showTab('accident')"
        >
          <p 
            class="nav-link"
            :class="[{ active: activeTab == 'accident'}]"
          >
            Tipo Incapacidad
          </p>
        </li>
        <li 
          class="nav-item" 
          @click="showTab('office')"
        >
          <p 
            class="nav-link"
            :class="[{ active: activeTab == 'office'}]"
          >
            Sucursal
          </p>
        </li>
      </ul>
    </div>

    <div class="col-12">
      <b-table 
        hover 
        striped 
        class="table-light p-1"
        :responsive="true"
        :items="table.items" 
        :fields="table.fields"
        :busy="isLoading"
      >
        <div 
          slot="table-busy" 
          class="text-center text-info my-2"
        >
          <b-spinner class="align-middle" />
          <strong class="ml-2">Cargando...</strong>
        </div>
      </b-table>
    </div>

    <b-modal 
      id="modalError" 
      v-model="showErrorModal" 
      title="Error" 
      header-bg-variant="danger"
      header-text-variant="light"
    >
      <p>
        {{ error }}
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
      perOfficeRows: null,
      showErrorModal: false,
      activeTab: 'entity',
      error: '',
    }
  },
  computed: { 
    labels(){
      return [
        {
          key: 'vlrRad',
          label: 'VALOR RADICADO',
          class: 'text-right'
        },
        {
          key: 'vlrAprob',
          label: 'VALOR APROBADO',
          class: 'text-right'
        },
        {
          key: 'vlrPend',
          label: 'VALOR PENDIENTE',
          class: 'text-right'
        },
      ]
    },
    table() {
      const entityArgs = {
        items: this.perEntityRows,
        fields: this.perEntityLabels,
      }

      const officeArgs = {
        items: this.perOfficeRows,
        fields: this.perOfficeLabels,
      }

      const accidentArgs = {
        items: this.perAccidentRows,
        fields: this.perAccidentLabels,
      }

      const selector = {
        'entity': entityArgs,
        'office': officeArgs,
        'accident': accidentArgs,
      }

      return selector[this.activeTab]
    },
    perEntityLabels(){
      return [
        {
          key: 'rowTitle',
          label: 'EPS/ARL',
        },
        ...this.labels,
      ]
    },
    perAccidentLabels(){
      return [
        {
          key: 'rowTitle',
          label: 'Tipo Incapacidad',
        },
        ...this.labels,
      ]
    },
    perOfficeLabels(){
      return [
        {
          key: 'rowTitle',
          label: 'Sucursal',
        },
        ...this.labels,
      ]
    },
  },
  created() {
    const promises = [
      this.getPerEntityRows(),
      this.getPerAccidentRows(),
      this.getPerOfficeRows(),
    ]

    this.showProgressBar()
    Promise.all(promises)
      .then(([
        perEntityRowsResult,
        perAccidentRowsResult, 
        perOfficeRowsResult ]) => {
          this.perEntityRows =this.addCurrencyFilter( perEntityRowsResult.data)
          this.perAccidentRows = this.addCurrencyFilter( perAccidentRowsResult.data)
          this.perOfficeRows = this.addCurrencyFilter(perOfficeRowsResult.data)
       })
      .catch(this.catch)
      .finally(() => this.hideProgressBar())
  },
  methods: {
    getPerEntityRows(){
      return this.axios.get('/tables/perEntity')
    },
    addCurrencyFilter(items){
      return items.map(item => ({
            rowTitle: item.rowTitle,
            vlrRad: this.$options.filters.currency(item.vlrRad),
            vlrAprob: this.$options.filters.currency(item.vlrAprob),
            vlrPend: this.$options.filters.currency(item.vlrPend),
          }))

    },
    getPerAccidentRows(){
      return this.axios.get('/tables/perAccident')
    },
    getPerOfficeRows(){
      return this.axios.get('/tables/perOffice')
    },
    catch(error){
      this.error = 'Error al cargar los datos'
      this.showErrorModal = true
    },
    showTab(tab){
      this.activeTab = tab
    }
  },
}
</script>

<style lang="scss" scoped>
.nav-link {
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
}

.dashboard-table {
  background: white;
}
</style>
