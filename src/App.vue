<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>Venlab Tables</v-app-bar-title>
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
      <!-- Login-Bereich -->
      <div v-if="!isLoggedIn" class="pa-4">
        <h2>Login</h2>
        <v-form @submit.prevent="onLogin">
          <v-text-field
              v-model="username"
              label="Benutzername"
              required
          />
          <v-text-field
              v-model="password"
              label="Passwort"
              type="password"
              required
          />
          <v-btn type="submit" color="primary" class="mt-2">
            Einloggen
          </v-btn>
        </v-form>
      </div>

      <!-- Tabellen nur wenn eingeloggt -->
      <div v-else>
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
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { ref, watch } from 'vue'
import { useTheme } from 'vuetify'
import DataTable from './components/DataTable.vue'

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

    const username = ref('')
    const password = ref('')
    const isLoggedIn = ref(false)

    const onLogin = () => {
      console.log('login', username.value, password.value)
      isLoggedIn.value = true
      loadTable('analysis')
    }

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
      { label: 'Log', key: 'logS' },
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

    watch(isDark, val => {
      theme.global.name.value = val ? 'dark' : 'light'
    })

    return {
      isDark,
      tables,
      tableData,
      loadTable,
      username,
      password,
      isLoggedIn,
      onLogin
    }
  }
}
</script>