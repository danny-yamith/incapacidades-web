<template>
  <dir>
    <b-table
      :items="accidents"
      :fields="fields"
      :busy="isLoading"
    >
      <template v-slot:actions="row">
        <b-button 
          size="sm" 
          class="mr-1"
          @click="launchUploadDocument(row.item.id)"
        >
          Cargar Documento
        </b-button>
      </template>

      <div slot="table-busy" class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Cargando...</strong>
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
  </dir>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      fields: [
        { key: 'date', label: 'Fecha',   },
        { key: 'cause', label: 'Causal',  },
        { key: 'days', label: 'Días de incapacidad', class: 'text-right'  },
        { key: 'actions', label: 'Acciones',  },
      ],
      accidents: [],
      perEmployee: null,
      accidentId: 0,
      file: null,
      error: 'Error al subir el arhivo, intenta nuevamente',
      showErrorModal: false,
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
      .catch(e => console.log('error', e))
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
              .format('MMMM D YYYY'),
            cause: item[2],
            days: item[3],
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
      this.file = this.$refs.file.files[0]
      if(this.file && this.accidentId){

        console.log('file', this.file)

        let formData = new FormData()
        formData.append('files', this.file)
        formData.append('ownerId', this.accidentId)
        formData.append('ownerType', 3)

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
        .catch(e => {
          this.showErrorModal = true
        })
        .finally(() => {
          this.hideProgressBar()
        })
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
