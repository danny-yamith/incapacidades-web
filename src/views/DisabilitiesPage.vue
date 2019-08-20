<template>
  <QsModuleLayout>
    <template v-slot:header>
      <h1 v-if="isNotPhone()">Incapacidades</h1>
      <h4 v-if="isPhone()">Incapacidades</h4>
      <p>Registro de incapacidades</p>
    </template>
    <template v-slot:content>
      <DisabilityForm class="col-12 col-md-10" />
    </template>
  </QsModuleLayout>
</template>

<script>
import QsModuleLayout from '@/components/layouts/QsModuleLayout'
import { mapGetters } from 'vuex';
import DisabilityForm from '@/components/modules/DisabilityForm'

export default {
  components: {
    QsModuleLayout,
    DisabilityForm,
  },
  computed: {
    ...mapGetters('login', {
      isAdmin: 'isAdmin',
    }),
  }
}
</script>

<style lang="scss" scoped>

</style>
