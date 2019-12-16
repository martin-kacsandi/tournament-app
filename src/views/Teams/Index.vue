<template>
  <div class="teams-container">
    <b-container align="right">
      <b-table class="mt-3" outlined hover :items="items">
        <template v-slot:cell(name)="data">
          <a :href="data.value">{{ data.value }}</a>
        </template>
      </b-table>
    </b-container>
    <b-button variant="success">Add New Team</b-button>
  </div>
</template>

<script>
import { db } from '../db'

export default {
  name: 'teams',
  data () {
    return {
      items: [],
      teams: []
    }
  },
  watch: {
    teams: function () {
      this.items = []
      Object.keys(this.teams).forEach(key => {
        let item = {
          name: Object.values(this.teams)[key].name
        }
        this.items.push(item)
      })
    }
  },
  methods: {
    routeToPage: function (name) {
      this.$router.push({ path: '/team/' + name })
    }
  },
  firestore: {
    teams: db.collection('teams')
  }
}
</script>
