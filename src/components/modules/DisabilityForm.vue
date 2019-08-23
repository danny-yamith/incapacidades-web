<template>
  <div>
    <b-form
      class="form p-4"
      @submit.prevent
      @reset.prevent="onReset"
    >
      <div
        v-if="isAdmin"
        class="form-row row justify-content-between align-items-end align-items-lg-start my-2"
      >
        <QsInput
          ref="employeeDocumentInput"
          v-model="form.id" 
          v-validate="{ required: true }"
          name="employeeDocument"
          label="Documento del empleado" 
          type="text"
          class="col-12 col-md-6"
          data-vv-as="Documento del empleado"
          :field="vvFields['employeeDocument']"
          :error="vvErrors.first('employeeDocument')"
          @blur="getEmployee"
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
          :field="vvFields['employeeName']"
          :error="vvErrors.first('employeeName')"
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
          :field="vvFields['cause']"
          :error="vvErrors.first('cause')"
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
          autocomplete="off"
          class="col-12 col-md-6"
          :options="cie10Options"
          :field="vvFields['cie10']"
          :error="vvErrors.first('cie10')"
        />
      </div>

      <div class="form-row row justify-content-between align-items-end align-items-lg-start  my-2">
        <QsSelect
          v-model="form.company"
          v-validate="{required: true}"
          name="company"
          label="EPS"
          data-vv-as="EPS"
          empty-option="Seleccione EPS"
          :options="entityOptions"
          class="col-12 col-md-6"
          :disabled="isEntitySelectDisabled"
          :field="vvFields['company']"
          :error="vvErrors.first('company')"
        />

        <QsInput
          v-model="form.days" 
          v-validate="{ required: true, min_value: 1, integer: true, }"
          name="days"
          label="Número de días de incapacidad"
          type="number"
          data-vv-as="Días de incapacidad"
          placeholder="Ingrese el número de dias"
          :field="vvFields['days']"
          :error="vvErrors.first('days')"
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
          :field="vvFields['start-date']"
          :error="vvErrors.first('start-date')"
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
          :field="vvFields['description']"
          :error="vvErrors.first('description')"
          class="col-12"
        />
      </div>

      <div class="controls row justify-content-end my-2 mx-0">
        <b-button 
          type="button" 
          variant="primary"
          class="button"
          :class="[ { phone: isPhone() } ]"
          @click="onSubmit"
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

    <b-modal 
      id="modalOk" 
      v-model="form.showOkModal" 
      title="Información" 
      ok-only
    >
      <p>
        La incapacidad fue registrada con éxito
      </p>
      <div 
        slot="modal-footer" 
        class="w-100"
      >
        <b-button
          size="sm"
          class="float-right"
          variant="success"
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
      <p>
        {{ form.error }}
      </p>

      <div 
        slot="modal-footer" 
        class="w-100"
      >
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
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters('login', {
      isAdmin: 'isAdmin',
      user: 'user',
      perEmployee: 'perEmployee',
    }),
    endDate() {
      return this.form && this.form.startDate 
        ? this.$moment(this.form.startDate, 'YYYY-MM-DD')
          .add(this.form.days, 'days')
          .utc()
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
      return this.employee 
        ? `${this.employee.firstName} ${this.employee.lastName}` 
        : ''
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
      if(!this.perCauseList || this.form.cie10.length <= 2)
        return  []
      else {  
        const options = _.chain(this.perCie10List)
          .map(item => {
            item.label = `[${item.cod}] ${item.description}`
            return item
          })
          .filter(item => { 
            return item.description.includes(this.form.cie10.toUpperCase())
          })
          .take(10)
          .map(item => ({
            value: item.description,
            text: item.label,
          }))
          .value()

        return options.length == 1 ? [] : options
      }
    },
    cie10TextOptions() {
      return !this.perCie10List
        ? []
        : this.perCie10List
          .map(item => item.description)
    },
  },
  watch: {
    'form.showOkModal'(newValue){
      if(!newValue) {
        this.onReset()
      }
    },
    'form.cause'() {
      this.form.cie10 = ''
    }
  },
  created() {
    this.showProgressBar()
    Promise.all([
      this.getEntities(),
      this.getCauses(),
      this.getCie10(),
    ])
    .then(([entities, causes, cie10,]) => {
      this.perEntityList = entities.data
      this.perCauseList = causes.data
      this.perCie10List = cie10.data
    })
    .catch(err => this.form.error = err)
    .finally(() => this.hideProgressBar())

  },
  methods: {
    onSubmit(){
      const postIfValid = () => this.$validator.validateAll().then(valid => {
          if(valid){
            let cie10 = this.perCie10List.find(item => item.description == this.form.cie10) 
            let cause = this.perCauseList.find(item => item.id == this.form.cause)
            let perCie10Id = cie10 && cause.cie10  ? cie10.id : null

            let empId = this.isAdmin
              ? Number(this.employee.id)
              : Number(this.perEmployee.id)


            this.showProgressBar()
            this.axios.post('/perSickLeave', {
                empId,
                regDate: this.$moment(this.form.startDate, 'YYYY-MM-DD')
                  .format(),
                endDate: this.$moment(this.endDate , 'DD/MM/YYYY')
                  .format(),
                days: Number(this.form.days),
                causeId: Number(this.form.cause),
                extDays: 0,
                notes: this.form.description,
                active: true,
                perCie10Id,
                entityId: Number(this.form.company),
              })
              .then(this.onSubmitSuccess)
              .catch(this.catch)
              .finally(() => this.hideProgressBar())
          } 
        })
    

      this.getEmployee()
        .then(() => postIfValid())

    },
    onSubmitSuccess(res){
      this.form.showOkModal = true
    },
    catch(err){
      console.error(err)
      this.form.error = err.response && err.response.data 
        ? err.response.data 
        : 'Error inesperado'
      this.form.showErrorModal = true
    },
    onReset() {
      this.form = emptyFormData()
      this.employee = null
      this.$validator.reset()
    },
    getEmployee(){
      this.employee = null

      if(
        !this.isAdmin
        || this.form.id == null 
        || this.form.id == undefined 
        || this.form.id.length == 0 
        ) return new Promise((resolve, reject) => resolve())

      this.showProgressBar()
      return this.axios.get('/perEmployee', {
        params: { document: this.form.id }
      })
      .then(res => this.employee = res.data)
      .catch(this.catch)
      .finally(() => this.hideProgressBar())
    },
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
