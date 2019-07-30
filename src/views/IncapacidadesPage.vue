<template>
  <QsModuleLayout>
    <template v-slot:header>
      <h1>Incapacidades</h1>
      <p>Registro de incapacidades</p>
    </template>
    <template v-slot:content>
      <IncapacidadesForm class="col-12 col-md-10" />
    </template>
  </QsModuleLayout>
</template>

<script>
import QsModuleLayout from '@/components/layouts/QsModuleLayout'
import { mapGetters } from 'vuex';
import IncapacidadesForm from '@/components/modules/IncapacidadesForm'

export default {
  components: {
    QsModuleLayout,
    IncapacidadesForm,
  },
  computed: {
    ...mapGetters('login', {
      isAdmin: 'canRegisterNoveltiesToAnyEmployee',
    }),
  }
}
</script>

<style lang="scss" scoped>

</style>
