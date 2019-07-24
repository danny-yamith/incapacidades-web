<template>
  <div>
    <b-form
      class="form p-4"
      @submit.prevent="onSubmit()"
      @reset.prevent="onReset"
    >

      <div class="form-row row justify-content-between align-items-end">
        <QsInput
          v-model="form.id" 
          v-validate="{ required: true, min_value: 1, integer: true, }"
          name="id"
          label="Cedula del empleado"
          type="text"
          data-vv-as="Cedula del empleado"
          placeholder="Ingrese la cedula del empleado"
          :field="fields['id']"
          :error="errors.first('id')"
          class="col-12 col-md-6"
        />

        <QsInput
          v-model="employeeName" 
          name="employeeName"
          label="Nombre del empleado" 
          type="text"
          class="col-12 col-md-6"
          :disabled="true"
        />
      </div>

      <div class="form-row row justify-content-between align-items-end">
        <QsSelect
          v-model="form.company"
          v-validate="{required: true}"
          name="company"
          label="EPS/ARP"
          data-vv-as="EPS/ARP"
          empty-option="Seleccione EPS/ARP"
          :options="options"
          class="col-12 col-md-6"
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

      <div class="form-row row justify-content align-items-end">
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

      <div class="form-row row justify-content-between">
        <QsTextArea
          v-model="form.description" 
          v-validate="{ required: true, min: 15, }"
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
import QsInput from '@/components/atoms/QsInput'
import QsSelect from '@/components/atoms/QsSelect'
import QsTextArea from '@/components/atoms/QsTextArea'

const emptyFormData = () => ({
  days: 1,
  company: null,
  description: '',
  startDate: '',
  id: '',
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
      options: [
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ],
      employeeName: '',
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
  },
  methods: {
    onReset() {
      this.form = emptyFormData()
      this.$validator.reset()
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
