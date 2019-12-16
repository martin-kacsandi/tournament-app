<template>
  <div class="tournaments-container">
    <h1>Tournaments</h1>
    <b-container>
      <b-table class="mt-3" outlined hover :items="items" :fields="fields">
        <template v-slot:cell(name)="data">
          <a :href="data.item.route">{{ data.value }}</a>
        </template>
      </b-table>
    </b-container>
    <b-button variant="success">Add New Tournament</b-button>
  </div>
</template>

<script>
import { db } from '../../firebase/db'
import * as moment from 'moment'

export default {
  name: 'tournaments',
  data () {
    return {
      fields: [ 'name', 'private', 'date' ],
      items: []
    }
  },
  created () {
    db.collection('tournaments').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          name: doc.data().name,
          private: doc.data().private ? 'Yes' : 'No',
          date: moment(doc.data().date.toDate()).format('YYYY. MM. DD. hh:mm'),
          route: `/tournaments/${doc.data().name}`
        }
        this.items.push(data)
      })
    })
  }
}
</script>
