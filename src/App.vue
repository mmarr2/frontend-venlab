<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>Vue Data Table</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-switch
        v-model="isDark"
        hide-details
        inset
        :label="isDark ? 'Dark' : 'Light'"
        class="ma-2"
      ></v-switch>
    </v-app-bar>

    <v-main>
      <!-- Buttons for different tables -->
      <v-row class="pa-4" dense>
        <v-btn
          color="secondary"
          class="ma-2"
          v-for="table in tables"
          :key="table.value"
          @click="loadTable(table.value)"
        >
          {{ table.label }}
        </v-btn>
      </v-row>

      <!-- Render the selected table -->
      <DataTable
        :items="tableData.items"
        :headers="tableData.headers"
        v-if="tableData.items.length"
      />
    </v-main>
  </v-app>
</template>

<script>
import { ref, watch } from 'vue'
import { useTheme } from 'vuetify'
import axios from 'axios'
import DataTable from './components/DataTable.vue'

export default {
  name: 'App',
  components: { DataTable },
  setup() {
    const theme = useTheme()
    const isDark = ref(false)
    const tableData = ref({ items: [], headers: [] })

    const tables = [
      { label: 'Analysis', value: 'analysis' },
      { label: 'Box', value: 'box' },
      { label: 'Boxpo', value: 'boxpo' },
      { label: 'Log', value: 'log' },
      { label: 'Sample', value: 'sample' },
      { label: 'Threshold', value: 'threshold' },
    ]

    const loadTable = async (tableName) => {
      try {
        const { data } = await axios.get(`http://localhost:8082/venlab/${tableName}`)
        const headers = Object.keys(data[0] || {}).map((key) => ({
          title: key,
          value: key,
        }))

        tableData.value = {
          items: data,
          headers,
        }
      } catch (err) {
        console.error(err)
        tableData.value = { items: [], headers: [] }
      }
    }

    // Initial load
    loadTable(tables[0].value)

    watch(isDark, (newValue) => {
      theme.global.name.value = newValue ? 'dark' : 'light'
    })

    return {
      isDark,
      tableData,
      tables,
      loadTable,
    }
  },
}
</script>
