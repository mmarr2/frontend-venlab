<template>
  <div v-if="posts">
    <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="posts"
        item-value="a_id"
        class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
import { ref } from 'vue'
import getAllPosts from '../services/getAllPosts'

export default {
  setup() {
    const { posts, error, load } = getAllPosts()
    const itemsPerPage = ref(10)

    load()

    return {
      posts,
      error,
      itemsPerPage,
      headers: [
        { title: 'a_id', value: 'a_id' },
        { title: 's_id', value: 's_id' },
        { title: 's_stamp', value: 's_stamp' },
        { title: 'pol', value: 'pol' },
        { title: 'nat', value: 'nat' },
        { title: 'kal', value: 'kal' },
        { title: 'an', value: 'an' },
        { title: 'glu', value: 'glu' },
        { title: 'dry', value: 'dry' },
        { title: 'date_in', value: 'date_in' },
        { title: 'date_out', value: 'date_out' },
        { title: 'weight_mea', value: 'weight_mea' },
        { title: 'weight_nrm', value: 'weight_nrm' },
        { title: 'weight_cur', value: 'weight_cur' },
        { title: 'weight_dif', value: 'weight_dif' },
        { title: 'density', value: 'density' },
        { title: 'a_flags', value: 'a_flags' },
        { title: 'lane', value: 'lane' },
        { title: 'comment', value: 'comment' },
        { title: 'date_exported', value: 'date_exported' }
      ]

    }
  },
}
</script>
