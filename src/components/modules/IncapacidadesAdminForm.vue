<template>
  <div>
    <b-form
      class="form p-4"
      @submit.prevent="onSubmit"
      @reset.prevent="onReset"
    >
      <div class="form-row row justify-content-between align-items-end align-items-lg-start my-2">
        <QsInput
          ref="employeeDocumentInput"
          v-model="form.id" 
          v-validate="{ required: true }"
          name="employeeDocument"
          label="Documento del empleado" 
          type="text"
          class="col-12 col-md-6"
          data-vv-as="Documento del empleado"
          :field="fields['employeeDocument']"
          :error="errors.first('employeeDocument')"
        />
        <QsInput
          ref="employeeNameInput"
          v-model="employeeName" 
          v-validate="{ exist: { searchTermValue: form.id, searchTermName: 'documento', loading: isLoading }}"
          name="employeeName"
          label="Nombre del empleado" 
          type="text"
          class="col-12 col-md-6"
          data-vv-as="Empleado"
          :field="fields['employeeName']"
          :error="errors.first('employeeName')"
          :disabled="true"
        />
      </div>

      <div class="form-row row justify-content-between align-items-end align-items-lg-start my-2">
        <QsSelect
          v-model="form.cause"
          v-validate="{required: true}"
          name="cause"
          label="Causa"
          data-vv-as="Causa"
          empty-option="Seleccione la causa"
          :options="causeOptions"
          class="col-12 col-md-6"
          :disabled="isCauseSelectDisabled"
          :field="fields['cause']"
          :error="errors.first('cause')"
        />

        <QsInput
          v-if="showDiagnosisOption"
          v-model="form.cie10"
          v-validate="{required: true, included: cie10TextOptions}"
          name="cie10"
          label="Diagnóstico"
          type="text"
          data-vv-as="Diagnóstico"
          placeholder="Seleccione un diagnóstico"
          class="col-12 col-md-6"
          :options="cie10Options"
          :field="fields['cie10']"
          :error="errors.first('cie10')"
        />
      </div>

      <div class="form-row row justify-content-between align-items-end align-items-lg-start  my-2">
        <QsSelect
          v-model="form.company"
          v-validate="{required: true}"
          name="company"
          label="EPS/ARP"
          data-vv-as="EPS/ARP"
          empty-option="Seleccione EPS/ARP"
          :options="entityOptions"
          class="col-12 col-md-6"
          :disabled="isEntitySelectDisabled"
          :field="fields['company']"
          :error="errors.first('company')"
        />

        <QsInput
          v-model="form.days" 
          v-validate="{ required: true, min_value: 1, integer: true, }"
          name="days"
          label="Número de días de incapacidad"
          type="number"
          data-vv-as="Días de incapacidad"
          placeholder="Ingrese el número de dias"
          :field="fields['days']"
          :error="errors.first('days')"
          class="col-12 col-md-6"
        />
      </div>

      <div class="form-row row justify-content align-items-end align-items-lg-start  my-2">
        <QsInput
          v-model="form.startDate" 
          v-validate="{ required: true }"
          name="start-date"
          label="Fecha de inicio"
          type="date"
          data-vv-as="Fecha de inicio"
          placeholder="dd/mm/yyyy"
          :field="fields['start-date']"
          :error="errors.first('start-date')"
          class="col-12 col-md-6"
        />

        <QsInput
          :value="endDate" 
          name="end-date"
          label="Fecha de fin"
          type="text"
          class="col-12 col-md-6"
          :disabled="true"
        />
      </div>

      <div class="form-row row justify-content-between my-2">
        <QsTextArea
          v-model="form.description" 
          name="description"
          label="Descripción"
          type="text"
          data-vv-as="Descripción"
          placeholder=" Descripción de la incapacidad"
          :field="fields['description']"
          :error="errors.first('description')"
          class="col-12"
        />
      </div>

      <div class="controls row justify-content-end my-2 mx-0">
        <b-button 
          type="submit" 
          variant="primary"
          class="button"
          :class="[ { phone: isPhone() } ]"
        >
          Aceptar
        </b-button>
        <b-button 
          type="reset" 
          variant="secondary"
          class="button ml-2"
          :class="[ { phone: isPhone() } ]"
        >
          Cancelar
        </b-button>
      </div>
    </b-form>

    <b-modal id="modalOk" v-model="form.showOkModal" title="Información" ok-only>
      <p>La incapacidad fue registrada con éxito</p>
      <div slot="modal-footer" class="w-100">
        <b-button
          size="sm"
          class="float-right"
          @click="form.showOkModal = false"
        >
          Aceptar
        </b-button>
      </div>
    </b-modal>

    <b-modal 
      id="modalError" 
      v-model="form.showErrorModal" 
      title="Error" 
      ok-only
      header-bg-variant="danger"
      header-text-variant="light"
    >
      <p>{{ form.error }}</p>

      <div slot="modal-footer" class="w-100">
        <b-button
          variant="danger"
          size="sm"
          class="float-right"
          @click="form.showErrorModal=false"
        >
          Cerrar
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import QsInput from '@/components/atoms/QsInput'
import QsSelect from '@/components/atoms/QsSelect'
import QsTextArea from '@/components/atoms/QsTextArea'
import _ from 'lodash'

const emptyFormData = () => ({
  days: 0,
  company: null,
  description: '',
  startDate: '',
  id: '',
  cause: null,
  cie10: '',
  showOkModal: false,
  showErrorModal: false,
  error: '',
})

export default {
  components: {
    QsInput,
    QsSelect,
    QsTextArea,
  },
  data() {
    return {
      form: emptyFormData(),
      perEntityList: null,
      perCauseList: null,
      perCie10List: null,
      employee: null,
    }
  },
  watch: {
    'form.id'() {
      this.getEmployee()
    },
    'form.showOkModal'(newValue){
      if(!newValue) {
        this.onReset()
      }
    }
  },
  computed: {
    endDate() {
      return this.form && this.form.startDate 
        ? this.$moment(this.form.startDate, 'YYYY-MM-DD')
          .add(this.form.days, 'days')
          .format('DD/MM/YYYY') 
        : ''
    },
    showDiagnosisOption() {
      if(this.form.cause != null){
        return this.perCauseList.find(item => item.id == this.form.cause).cie10
      }
      return false
    },
    employeeName() {
      return this.employee ? `${this.employee.firstName} ${this.employee.lastName}` : ''
    },
    isEntitySelectDisabled(){
      return !this.perEntityList
    },
    isCauseSelectDisabled() {
      return !this.perCauseList
    },
    isCie10SelectDisabled(){
      return !this.perCie10List
    },
    entityOptions() {
      return !this.perEntityList
        ? []
        : this.perEntityList
          .map(item => ({ 
              value: item.id,
              text: item.name,
              disabled: false,
          }))
    },
    causeOptions() {
      return !this.perCauseList
        ? []
        : this.perCauseList
          .map(item => ({
            value: item.id,
            text: item.name,
            disabled: false
          }))
    },
    cie10Options(){
      return !this.perCauseList || this.form.cie10.length <= 2
        ? []
        : this.perCie10List
          .map(item => {
            item.label = `[${item.cod}] ${item.description}`
            return item
          })
          .filter(item => { 
            return item.description.includes(this.form.cie10.toUpperCase())
          })
          .slice(0,10)
          .map(item => ({
            value: item.description,
            text: item.label,
          }))
    },
    cie10TextOptions() {
      return !this.perCie10List
        ? []
        : this.perCie10List
          .map(item => item.description)
    },
  },
  created() {
    this.showProgressBar()
    Promise.all([
      this.getEntities(),
      this.getCauses(),
      this.getCie10()
    ]).then(([entities, causes, cie10]) => {
      this.perEntityList = entities.data
      this.perCauseList = causes.data
      this.perCie10List = cie10.data
      this.hideProgressBar()
    }).catch(err => {
      this.form.error = err
      this.hideProgressBar()
    })
  },
  methods: {
    onSubmit(){
      this.$validator.validateAll().then(valid => {
        if(valid){
          // TODO - submit form and create incapacity
          let empId = this.employee.id
          let regDate = this.$moment(this.form.startDate, 'YYYY-MM-DD')
            .format()
          let endDate = this.$moment(this.endDate , 'DD/MM/YYYY')
            .format()
          let days = this.form.days
          let causeId = this.form.cause
          let extDays = 0
          let notes = this.form.description
          let active = true

          let cie10Search =  this.perCie10List.find(item => item.description == this.form.cie10) 
          let cause = this.perCauseList.find(item => item.id == this.form.cause)
          let perCie10Id = cie10Search && cause.cie10  ? cie10Search.id : null

          let entityId = this.form.company

          this.axios.post('/perSickLeave', {
            empId,
            regDate,
            endDate,
            days,
            causeId,
            extDays,
            notes,
            active,
            perCie10Id,
            entityId,
          })
          .then(res => {
            this.form.showOkModal = true
          })
          .catch(err => {
            this.form.error = err.response && err.response.data 
              ? err.response.data 
              : 'Error inesperado cliente'
            this.form.showErrorModal = true
          })
        } 
      })
    },
    onReset() {
      this.form = emptyFormData()
      this.employee = null
      this.$validator.reset()
    },
    getEmployee: _.debounce(function getEmployee(){
      this.employee = null
      if(this.form.id == null 
        || this.form.id == undefined 
        ||this.form.id.length == 0) return;
      this.showProgressBar()
      this.axios.get('/perEmployee', {
        params: { document: this.form.id }
      }).then(res => {
        this.employee = res.data
        this.hideProgressBar()
      }).catch(err => {
        this.hideProgressBar()
      })
    }, 1000),
    getEntities(){
      return this.axios.get('/perEntity', {
        params: { type: 'ips'}
      }) 
    },
    getCauses(){
      return this.axios.get('/perCause', {
        params: {
          type: 'inc',
        },
      })   
    },
    getCie10(){
      return this.axios.get('/perCie10')
    },
  }
}
</script>

<style lang="scss" scoped>
.form {
  border: 2px solid #E7E7E7;
  width: 100%;
}
</style>
