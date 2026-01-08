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
      />
    </v-app-bar>

    <v-main>
      <!-- Buttons -->
      <v-row class="pa-4" dense>
        <v-btn
            v-for="table in tables"
            :key="table.key"
            class="ma-2"
            color="secondary"
            @click="loadTable(table.key)"
        >
          {{ table.label }}
        </v-btn>
      </v-row>

      <!-- DataTable -->
      <DataTable
          v-if="tableData.items.length"
          :items="tableData.items"
          :headers="tableData.headers"
      />
    </v-main>
  </v-app>
</template>

<script>
import { ref, watch } from 'vue'
import { useTheme } from 'vuetify'
import DataTable from './components/DataTable.vue'

// Axios-Klassen
import Analysis from '../api/Analysis'
import Box from '../api/Box'
import BoxPos from '../api/Boxpos'
import Log from '../api/Log'
import Sample from '../api/Sample'
import Threshold from '../api/Threshold'

export default {
  name: 'App',
  components: { DataTable },
  setup() {
    const theme = useTheme()
    const isDark = ref(false)
    const tableData = ref({ items: [], headers: [] })

    // Mapping: Button → Axios-Klasse
    const apiMap = {
      analysis: new Analysis(),
      box: new Box(),
      boxpo: new BoxPos(),
      log: new Log(),
      sample: new Sample(),
      threshold: new Threshold()
    }

    const tables = [
      { label: 'Analysis', key: 'analysis' },
      { label: 'Box', key: 'box' },
      { label: 'BoxPos', key: 'boxpo' },
      { label: 'Log', key: 'log' },
      { label: 'Sample', key: 'sample' },
      { label: 'Threshold', key: 'threshold' }
    ]

    const loadTable = (key) => {
      apiMap[key]
          .getAll()
          .then(response => {
            const data = response.data || []

            const headers = Object.keys(data[0] || {}).map(k => ({
              title: k,
              value: k
            }))

            tableData.value = { items: data, headers }
          })
          .catch(err => {
            console.error(err)
            tableData.value = { items: [], headers: [] }
          })
    }

    // initial table
    loadTable('analysis')

    watch(isDark, val => {
      theme.global.name.value = val ? 'dark' : 'light'
    })

    return {
      isDark,
      tables,
      tableData,
      loadTable
    }
  }
}
</script>
