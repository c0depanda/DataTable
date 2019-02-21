<template>
  <div class="home">
    <DataTable />
  </div>
</template>

<script>
// @ is an alias to /src
import DataTable from '@/components/datatable.vue'

export default {
  name: 'home',
  components: {
    DataTable
  }
}
</script>
