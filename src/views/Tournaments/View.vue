<template>
  <div class="tournament-container">
    <b-container>
      <h1>{{ tournament.name }}</h1>
    </b-container>
  </div>
</template>

<script>
import { db } from '../../firebase/db'

export default {
  name: 'tournament',
  data () {
    return {
      tournament: {}
    }
  },
  created () {
    let name = this.$route.params.id
    let query = db.collection('tournaments').where('name', '==', name).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.tournament = {
          name: doc.data().name
        }
      })
    })
  }
}
</script>
