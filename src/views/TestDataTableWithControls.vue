<template>
  <div class="col-12">
    <b-table :items="items" :fields="fields" striped responsive="sm">
      <template slot="Subir Archivo" slot-scope="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>
        <input type="file" />
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: ['first_name', 'last_name', 'Subir Archivo'],
      items: [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        {
          isActive: false,
          age: 89,
          first_name: 'Geneva',
          last_name: 'Wilson',
          _showDetails: true
        },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
    }
  }
}
</script>

<style lang="css" scoped>

</style>
