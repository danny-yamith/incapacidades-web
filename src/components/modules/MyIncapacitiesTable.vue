<template>
  <div>
    <b-table
      hover 
      striped 
      class="table-light p-1"
      :responsive="true"
      :items="incapacities"
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
  data(){
    return {
      fields: [
        { key: 'date', label: 'Fecha', },
        { key: 'cause', label: 'Causal', },
        { key: 'days', label: 'Días de incapacidad', class: 'text-right'},
        { key: 'actions', label: 'Acciones', },
      ],
      incapacities: [],
      perEmployee: null,
      incapacityId: 0,
      file: null,
      error: '',
      showErrorModal: false,
      showOkModal: false,
    }
  },
  computed: {
    ...mapGetters('login', {
      user: 'user',
    }),
  },
  created(){
    this.showProgressBar()
    this.getPerEmployee()
      .then(res => {
        this.perEmployee = res.data
        return this.getEmployeeIncapacities(this.perEmployee.id)
      })
      .catch(e => {
        console.error(e)
        this.error = 'Error al cargar los datos'
        this.showErrorModal = true
      })
      .finally(() => this.hideProgressBar())
  },
  methods: {
    getEmployeeIncapacities(perEmployeeId){
      return this.axios.get(`/perSickLeave/perEmployee/${perEmployeeId}`)
        .then(res => {
          this.incapacities = res.data.map(item => ({
            id: item[0],
            date: this.$moment(
              item[1],
              this.$moment.defaultFormat
            ).format('MMMM D YYYY'),
            cause: item[2],
            days: item[3],
          }))

          return this.incapacities
        })
    },
    getPerEmployee(){
      return this.axios.get('/perEmployee', {
        params: {
          document: this.user.document,
        }
      })
    },
    launchUploadDocument(incapacityId){
      this.incapacityId = incapacityId
      this.$refs.file.click()
    },
    handleFileToUpload(){
      let file = this.$refs.file.files[0]
      if(file && this.incapacityId){
        let formData = new FormData()
        formData.append('files', file)
        formData.append('ownerId', this.incapacityId)
        formData.append('ownerType', 6) // 6 - SICKLEAVES en FrmAttachments

        this.showProgressBar()
        this.axios.post(`/bfile/upload/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: progressEvent => {
            this.setProgressPercentage(Number.parseInt(
              Math.round(progressEvent.loaded * 100) / progressEvent.total
            ))
          }
        })
        .then(res => this.showOkModal = true)
        .catch(err => {
          this.error = 'Error al subirel archivo, intente otra vez'
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