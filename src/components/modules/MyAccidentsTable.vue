<template>
  <div>
    <b-table
      hover 
      striped 
      class="table-light p-1"
      :responsive="true"
      :items="accidents"
      :fields="fields"
      :busy="isLoading"
    >
      <template v-slot:actions="row">
        <b-button 
          variant="outline-primary"
          size="sm" 
          class="mr-1"
          @click="launchUploadDocument(row.item.id)"
        >
          Cargar Documento
        </b-button>
      </template>

      <div 
        slot="table-busy" 
        class="text-center text-info my-2"
      >
        <b-spinner class="align-middle" />
        <strong class="ml-2">Cargando...</strong>
      </div>
    </b-table>
    <input
      id="file"
      ref="file"
      name="file"
      type="file"
      class="file"
      @change="handleFileToUpload"
    >

    <b-modal 
      id="modalOk" 
      v-model="showOkModal" 
      title="Información" 
      ok-only
    >
      <p>
        Se subio el archivo satisfactoriamente
      </p>

      <div 
        slot="modal-footer" 
        class="w-100"
      >
        <b-button
          size="sm"
          class="float-right"
          @click="showOkModal = false"
        >
          Cerrar
        </b-button>
      </div>
    </b-modal>

    <b-modal 
      id="modalError" 
      v-model="showErrorModal" 
      title="Error" 
      ok-only
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
          @click="showErrorModal=false"
        >
          Cerrar
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      fields: [
        { key: 'type', label: 'Estado' },
        { key: 'date', label: 'Fecha',   },
        { key: 'cause', label: 'Causal',  },
        { key: 'days', label: 'Días de incapacidad', class: 'text-right'  },
        { key: 'actions', label: 'Acciones',  },
      ],
      accidents: [],
      perEmployee: null,
      accidentId: 0,
      error: 'Error al subir el arhivo, intenta nuevamente',
      showErrorModal: false,
      showOkModal: false,
    }
  },
  computed: {
    ...mapGetters('login', {
      user: 'user',
    }),
  },
  created() {
    this.showProgressBar()
    this.getPerEmployee()
      .then(res => {
        this.perEmployee = res.data
        return this.getEmployeeAccidents(this.perEmployee.id)
      })
      .catch(e => {
        console.error(e)
        this.error = 'Error al cargar los datos'
        this.showErrorModal = true
      })
      .finally(() => this.hideProgressBar())
  },
  methods: {
    getEmployeeAccidents(perEmployeeId){
      return this.axios.get(`/perAccident/perEmployee/${perEmployeeId}`)
        .then(res => {
          this.accidents = res.data.map(item => ({
            id: item[0],
            date: this.$moment(
                item[1],
                this.$moment.defaultFormat)
                .utc()
              .format('MMMM D YYYY'),
            cause: item[2],
            days: item[3],
            type: item[4] == 'req' || item[4] == 'rad' ? 'En proceso' : 'Aprobado',
          }))
          return this.accidents
        })
    },
    getPerEmployee(){
      return this.axios.get('/perEmployee',{
        params: {
          document: this.user.document
        }
      })
    },
    launchUploadDocument(accidentId){
      this.accidentId = accidentId
      this.$refs.file.click()
    },
    handleFileToUpload(){
      const file = this.$refs.file.files[0]
      if(file && this.accidentId){
        const formData = new FormData()
        formData.append('files', file)
        formData.append('ownerId', this.accidentId)
        formData.append('ownerType', 3) // 3 - ACCIDENT en FrmAttachments

        this.showProgressBar()
        this.axios.post(`/bfile/upload/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
          , onUploadProgress: progressEvent => {
            this.setProgressPercentage(Number.parseInt(
              Math.round(progressEvent.loaded * 100) / progressEvent.total)
            )
          }
        })
        .then(res => this.showOkModal = true)
        .catch(e => {
          this.error = 'Error al subir el archivo, intente otra vez'
          this.showErrorModal = true
        })
        .finally(() => this.hideProgressBar())
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.file {
  display: none;
}
</style>
