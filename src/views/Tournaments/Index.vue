<template>
  <div class="tournaments-container">
    <h1>Tournaments</h1>
    <b-container>
      <b-table class="mt-3" outlined hover :items="items" :fields="fields">
        <template v-slot:cell(name)="data">
          <a :href="data.item.id">{{ data.value }}</a>
        </template>
      </b-table>
    </b-container>
    <b-button variant="success">Add New Tournament</b-button>
  </div>
</template>

<script>
import { db } from '../db'
import * as moment from 'moment'

export default {
  name: 'tournaments',
  data () {
    return {
      fields: [ 'name', 'private', 'date' ],
      items: [],
      tournaments: []
    }
  },
  watch: {
    tournaments: function () {
      this.items = []
      Object.keys(this.tournaments).forEach(key => {
        let item = {
          id: `/tournaments/${(Object.values(this.tournaments)[key].id).toLowerCase()}`,
          name: Object.values(this.tournaments)[key].name,
          private: Object.values(this.tournaments)[key].private ? 'Yes' : 'No',
          date: moment((Object.values(this.tournaments)[key].date).toDate()).format('YYYY. MM. DD. hh:mm')
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
