<template>
  <div>
    <b-form
      class="form p-4"
      @submit.prevent="onSubmit"
      @reset.prevent="onReset"
    >
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
          v-model="cie10"
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

      <div class="form-row row justify-content-between align-items-end align-items-lg-start my-2">
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

      <div class="form-row row justify-content align-items-end align-items-md-start my-2">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import QsInput from '@/components/atoms/QsInput'
import QsSelect from '@/components/atoms/QsSelect'
import QsTextArea from '@/components/atoms/QsTextArea'

const emptyFormData = () => ({
  days: 1,
  company: null,
  description: '',
  startDate: '',
  cause: null,
  cie10: null,
  employee: null,
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
      cie10: '',
      perEntityList: null,
      perCauseList: null,
      perCie10List: null,
      perEmployee: null,
    }
  },
  computed: {
    ...mapGetters('login', {
      user: 'user',
    }),
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
      return !this.perCauseList || this.cie10.length <= 2
        ? []
        : this.perCie10List
          .map(item => {
            item.label = `[${item.cod}] ${item.description}`
            return item
          })
          .filter(item => { 
            return item.description.includes(this.cie10.toUpperCase())
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
      this.getCie10(),
      this.getPerEmployee(),
    ]).then(([entities, causes, cie10, perEmployee]) => {
      this.perEntityList = entities.data
      this.perCauseList = causes.data
      this.perCie10List = cie10.data
      this.perEmployee = perEmployee.data
      this.hideProgressBar()
    }).catch(err => {
      this.error = err
      console.log(err)
      this.hideProgressBar()
    })
  },
  methods: {
    onSubmit(){
      this.$validator.validateAll().then(valid => {
        if(valid){
          // TODO - submit form and create incapacity
          console.log('Submitted valid form')
          let startDate = this.$moment(this.form.startDate, 'YYYY-MM-DD')
            .format()
          let endDate = this.$format(this.endDate , 'DD/MM/YYYY')
            .format()

          console.log(startDate)
          console.log(endDate)

          // this.axios.post('/perSickLeave', {
          //   "empId": 1584,
          //   "regDate":	"2019-07-22T00:00:00.000-05:00",
          //   "endDate": "2019-07-25T00:00:00.000-05:00",
          //   "causeId": 23,
          //   "days": 3,
          //   "extDays": 0,
          //   "notes": "",
          //   "active": true,
          //   "perCie10Id": null,
          //   "entityId": 3
          // })
        } else {
          console.log('Invalid')
        }
      })
    },
    onReset() {
      this.form = emptyFormData()
      this.$validator.reset()
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
    getPerEmployee(){
      return this.axios.get('/perEmployee', {
        params: {
          document: this.user.document
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  border: 2px solid #E7E7E7;
  width: 100%;
}
</style>
