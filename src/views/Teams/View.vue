<template>
  <div class="team-container">
    <b-container >
      <h1>This is team {{ $route.params.id }}</h1>
    </b-container>
  </div>
</template>

<script>
import { db } from '../db'

export default {
  name: 'team',
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
  firestore: {
    teams: db.collection('teams')
  }
}
</script>
