<template>
  <div class="tournament-container">
    <b-container>
      <h1>This is tournament {{ $route.params.id }}</h1>
    </b-container>
  </div>
</template>

<script>
import { db } from '../db'

export default {
  name: 'tournament',
  data () {
    return {
      items: [],
      tournaments: []
    }
  },
  watch: {
    teams: function () {
      this.items = []
      Object.keys(this.tournaments).forEach(key => {
        let item = {
          name: Object.values(this.tournaments)[key].name
        }
        this.items.push(item)
      })
    }
  },
  firestore: {
    tournaments: db.collection('tournaments')
  }
}
</script>
