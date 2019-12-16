<template>
  <div class="teams-container">
    <h1>Teams</h1>
    <b-container align="right">
      <b-table class="mt-3" outlined hover :items="items" :fields="fields">
        <template v-slot:cell(name)="data">
          <a :href="data.item.shortName">{{ data.value }}</a>
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
      fields: [ 'name' ],
      items: [],
      teams: []
    }
  },
  watch: {
    teams: function () {
      this.items = []
      Object.keys(this.teams).forEach(key => {
        let item = {
          name: Object.values(this.teams)[key].name,
          shortName: `/teams/${(Object.values(this.teams)[key].shortName).toLowerCase()}`
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
