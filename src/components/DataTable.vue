<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="itemsPerPage"
        :search="search"
        class="elevation-1"
        :loading="loading"
    >

    </v-data-table>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'DataTable',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const itemsPerPage = ref(10)
    const search = ref('')

    // Optional: Reagiert auf Änderungen an den Items
    watch(
        () => props.items,
        (newVal) => {
          if (!newVal || newVal.length === 0) itemsPerPage.value = 10
        }
    )

    return { itemsPerPage, search }
  }
}
</script>

<style scoped>
/* Optional: kleine Styling-Anpassungen */
</style>