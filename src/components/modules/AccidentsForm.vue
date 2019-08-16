<template>
  <div>
    <b-form
      class="form p-4" 
      @submit.prevent="onSubmit"
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
          :disabled="areSelectsDisabled"
          :field="vvFields['cause']"
          :error="vvErrors.first('cause')"
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
          :disabled="areSelectsDisabled"
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

    <b-modal 
      id="modalOk" 
      v-model="form.showOkModal" 
      title="Información" 
      ok-only
    >
      <p>
        El accidente fue registrado con éxito
      </p>

      <div 
        slot="modal-footer" 
        class="w-100"
      >
        <b-button
          size="sm"
          class="float-right"
          @click="form.showOkModal = false"
        >
          Cerrar
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
          .format('DD/MM/YYYY')
        : ''
    },
    employeeName(){
      return this.employee 
        ? `${this.employee.firstName} ${this.employee.lastName}` 
        : ''
    },
    areSelectsDisabled(){
      return !this.perEntityList ||!this.perCauseList
    },
    entityOptions(){
      return !this.perCauseList
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
            disabled: false,
          }))
    },
  },
  watch: {
    'form.id'() {
      this.getEmployee()
    },
    'form.showOkModal'(newValue){
      if(!newValue){
        this.onReset()
      }
    },
  },
  created() {
    this.showProgressBar()
    Promise.all([
      this.getEntities(),
      this.getCauses(),
    ])
    .then(([entities, causes, ]) => {
      this.perEntityList = entities.data
      this.perCauseList = causes.data
    })
    .catch(err => this.form.error = err)
    .finally(() => this.hideProgressBar())
  },
  methods: {
    onSubmit() {
      this.$validator.validateAll()
      .then(valid => {
        if(valid) {
          let empId = this.isAdmin
            ? this.employee.id
            : this.perEmployee.id

          this.showProgressBar()
          this.axios.post('/perAccident', {
            empId,
            regDate: this.$moment(this.form.startDate, 'YYYY-MM-DD')
              .format(),
            causeId: this.form.cause,
            days: this.form.days,
            extDays: 0,
            loadedDays: 0,
            entityId: this.form.company,
            notes: this.form.description,
            investigate: false,
            active: true,
            employeerId: 0
          })
          .then(this.onSubmitSuccess)
          .catch(this.catch)
          .finally(() => this.hideProgressBar())
        }
      })
    },
    onSubmitSuccess(res){
      this.form.showOkModal = true
    },
    catch(err) {
      this.form.error = err.response && err.response
        ? err.response.data
        : 'Error inesperado'
      this.form.showErrorModal = true
    },
    onReset(){
      this.form = emptyFormData()
      this.employee = null
      this.$validator.reset()
    },
    getEmployee: _.debounce(function getEmployee(){
      this.employee = null

      if(this.form.id == null
        || this.form.id == undefined
        || this.form.id.length == 0) return;
      
      this.showProgressBar()
      this.axios.get('/perEmployee', {
        params: { document: this.form.id }
      })
      .then(res => this.employee = res.data)
      .finally(() => this.hideProgressBar())
    }, 1000),
    getEntities() {
      return this.axios.get('perEntity', {
        params: { type: 'arp'}
      })
    },
    getCauses(){
      return this.axios.get('/perCause', {
        params: {
          type: 'acc',
        }
      })
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
