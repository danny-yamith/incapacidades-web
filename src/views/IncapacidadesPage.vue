<template>
  <QsModuleLayout>
    <template v-slot:header>
      <h1>Incapacidades</h1>
      <p>Registro de incapacidades</p>
    </template>
    <template v-slot:content>
      <IncapacidadesAdminForm 
        v-if="isAdmin" 
        class="col-12 col-md-10" 
      />
      <IncapacidadesForm 
        v-else 
        class="col-12 col-md-10" 
      />
    </template>
  </QsModuleLayout>
</template>

<script>
import QsModuleLayout from '@/components/layouts/QsModuleLayout'
import { mapGetters } from 'vuex';
import IncapacidadesForm from '@/components/modules/IncapacidadesForm'
import IncapacidadesAdminForm from '@/components/modules/IncapacidadesAdminForm'

export default {
  components: {
    QsModuleLayout,
    IncapacidadesForm,
    IncapacidadesAdminForm,
  },
  data() {
    return {
      json: 'empty',
    }
  },
  computed: {
    ...mapGetters('login', {
      isAdmin: 'canRegisterNoveltiesToAnyEmployee',
    }),
  }
}
</script>

<style>

</style>
