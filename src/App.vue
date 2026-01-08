<template>
  <v-app>
    <!-- Header Bar -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-title class="text-h5">Analysis Console</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-switch
          v-model="isDark"
          invert-icon
          :prepend-icon="isDark ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny'"
          hide-details
          class="mt-2 me-4"
      />
    </v-app-bar>

    <v-main class="bg-grey-lighten-5">
      <v-container class="mt-6">
        <!-- Tab Navigation -->
        <v-tabs v-model="activeTab" class="mb-6">
          <v-tab
              v-for="table in tables"
              :key="table.key"
              :value="table.key"
              @click="loadTable(table.key)"
          >
            <v-icon start>{{ table.icon }}</v-icon>
            {{ table.label }}
          </v-tab>
        </v-tabs>

        <!-- Content Card -->
        <v-card v-if="tableData.items.length || mockMode" class="elevation-2">
          <v-card-title class="text-h6 bg-primary text-white">
            {{ getTabTitle(activeTab) }}
            <v-chip v-if="mockMode" color="warning" size="small" class="ms-2">Mock Data</v-chip>
          </v-card-title>

          <v-card-text class="pa-6">
            <v-table hover>
              <thead>
              <tr class="bg-grey-lighten-3">
                <th v-for="header in tableData.headers" :key="header.value">
                  {{ header.title }}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in tableData.items" :key="item.id">
                <td v-for="header in tableData.headers" :key="header.value">
                  {{ item[header.value] }}
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-card-text>

          <v-card-actions class="bg-grey-lighten-4 pa-6">
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="tonal" @click="exportData">Export</v-btn>
            <v-btn color="primary" @click="refreshData">Refresh</v-btn>
          </v-card-actions>
        </v-card>

        <!-- Empty State -->
        <v-card v-else class="elevation-2 pa-12 text-center">
          <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-database-off</v-icon>
          <p class="text-h6 text-grey">Keine Daten verfügbar</p>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref, watch } from 'vue'
import { useTheme } from 'vuetify'

export default {
  name: 'App',
  setup() {
    const theme = useTheme()
    const isDark = ref(false)
    const activeTab = ref('analysis')
    const mockMode = ref(true)
    const tableData = ref({ items: [], headers: [] })

    const mockDataMap = {
      analysis: {
        items: [
          { id: 1, name: 'Analysis A', type: 'Type 1', value: 42.5, status: 'OK', date: '2026-01-08' },
          { id: 2, name: 'Analysis B', type: 'Type 2', value: 38.2, status: 'OK', date: '2026-01-08' },
          { id: 3, name: 'Analysis C', type: 'Type 1', value: 45.8, status: 'Warning', date: '2026-01-07' },
        ],
        headers: [
          { title: 'ID', value: 'id' },
          { title: 'Name', value: 'name' },
          { title: 'Type', value: 'type' },
          { title: 'Value', value: 'value' },
          { title: 'Status', value: 'status' },
          { title: 'Date', value: 'date' },
        ]
      },
      box: {
        items: [
          { id: 1, boxId: 'BOX-001', location: 'A1', capacity: 100, used: 75 },
          { id: 2, boxId: 'BOX-002', location: 'A2', capacity: 100, used: 45 },
        ],
        headers: [
          { title: 'ID', value: 'id' },
          { title: 'Box ID', value: 'boxId' },
          { title: 'Location', value: 'location' },
          { title: 'Capacity', value: 'capacity' },
          { title: 'Used', value: 'used' },
        ]
      },
      boxpo: {
        items: [
          { id: 1, boxId: 'BOX-001', position: 'P1', sample: 'SAM-001' },
          { id: 2, boxId: 'BOX-001', position: 'P2', sample: 'SAM-002' },
        ],
        headers: [
          { title: 'ID', value: 'id' },
          { title: 'Box ID', value: 'boxId' },
          { title: 'Position', value: 'position' },
          { title: 'Sample', value: 'sample' },
        ]
      },
      log: {
        items: [
          { id: 1, timestamp: '2026-01-08 10:30', action: 'Create', user: 'Admin' },
          { id: 2, timestamp: '2026-01-08 10:25', action: 'Update', user: 'User1' },
        ],
        headers: [
          { title: 'ID', value: 'id' },
          { title: 'Timestamp', value: 'timestamp' },
          { title: 'Action', value: 'action' },
          { title: 'User', value: 'user' },
        ]
      },
      sample: {
        items: [
          { id: 1, sampleId: 'SAM-001', type: 'Blood', date: '2026-01-08', quantity: 5 },
          { id: 2, sampleId: 'SAM-002', type: 'Plasma', date: '2026-01-08', quantity: 3 },
        ],
        headers: [
          { title: 'ID', value: 'id' },
          { title: 'Sample ID', value: 'sampleId' },
          { title: 'Type', value: 'type' },
          { title: 'Date', value: 'date' },
          { title: 'Quantity', value: 'quantity' },
        ]
      },
      threshold: {
        items: [
          { id: 1, name: 'Temperature Min', value: 2, unit: '°C' },
          { id: 2, name: 'Temperature Max', value: 8, unit: '°C' },
        ],
        headers: [
          { title: 'ID', value: 'id' },
          { title: 'Name', value: 'name' },
          { title: 'Value', value: 'value' },
          { title: 'Unit', value: 'unit' },
        ]
      },
    }

    const tables = [
      { label: 'Analysis', key: 'analysis', icon: 'mdi-chart-line' },
      { label: 'Box', key: 'box', icon: 'mdi-package-variant' },
      { label: 'BoxPos', key: 'boxpo', icon: 'mdi-map-marker' },
      { label: 'Log', key: 'log', icon: 'mdi-history' },
      { label: 'Sample', key: 'sample', icon: 'mdi-test-tube' },
      { label: 'Threshold', key: 'threshold', icon: 'mdi-tune' }
    ]

    const getTabTitle = (key) => {
      const titleMap = {
        analysis: 'Analysis Data',
        box: 'Box Management',
        boxpo: 'Box Positions',
        log: 'Activity Log',
        sample: 'Sample List',
        threshold: 'Thresholds'
      }
      return titleMap[key] || 'Data'
    }

    const loadTable = (key) => {
      tableData.value = mockDataMap[key]
    }

    const exportData = () => {
      console.log('Export:', tableData.value.items)
    }

    const refreshData = () => {
      loadTable(activeTab.value)
    }

    loadTable('analysis')

    watch(isDark, val => {
      theme.global.name.value = val ? 'dark' : 'light'
    })

    return {
      isDark,
      activeTab,
      tables,
      tableData,
      mockMode,
      loadTable,
      exportData,
      refreshData,
      getTabTitle
    }
  }
}
</script>
