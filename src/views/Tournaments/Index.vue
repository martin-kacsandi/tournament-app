<template>
  <div class="tournaments-container">
    <b-container>
      <b-table class="mt-3" outlined hover :items="items">
      </b-table>
    </b-container>
    <b-button variant="success">Add New Tournament</b-button>
  </div>
</template>

<script>
import { db } from '../db'

export default {
  name: 'tournaments',
  data () {
    return {
      items: [],
      tournaments: []
    }
  },
  watch: {
    tournaments: function () {
      this.items = []
      Object.keys(this.tournaments).forEach(key => {
        let item = {
          name: Object.values(this.tournaments)[key].name,
          private: Object.values(this.tournaments)[key].private ? 'Yes' : 'No',
          date: Object.values(this.tournaments)[key].date.toDate()
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
