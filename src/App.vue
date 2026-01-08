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
        <v-btn color="secondary" class="ma-2" @click="currentTable = 'analysis'">
          Analysis
        </v-btn>
        <v-btn color="secondary" class="ma-2" @click="currentTable = 'box'">
          Box
        </v-btn>
        <v-btn color="secondary" class="ma-2" @click="currentTable = 'boxpo'">
          Boxpo
        </v-btn>
        <v-btn color="secondary" class="ma-2" @click="currentTable = 'log'">
          Log
        </v-btn>
        <v-btn color="secondary" class="ma-2" @click="currentTable = 'sample'">
          Sample
        </v-btn>
        <v-btn color="secondary" class="ma-2" @click="currentTable = 'threshold'">
          Threshold
        </v-btn>

      </v-row>

      <!-- Render the selected table -->
      <DataTable :table="currentTable" />
    </v-main>
  </v-app>
</template>

<script>
import { ref, watch } from 'vue'
import { useTheme } from 'vuetify'
import DataTable from './components/DataTable.vue'

export default {
  name: 'App',
  components: { DataTable },
  setup() {
    const theme = useTheme()
    const isDark = ref(false)
    const currentTable = ref('table1')

    watch(isDark, (newValue) => {
      theme.global.name.value = newValue ? 'dark' : 'light'
    })

    return {
      isDark,
      currentTable,
    }
  },
}
</script>
