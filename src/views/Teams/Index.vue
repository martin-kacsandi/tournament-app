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
import { db } from '../../firebase/db'

export default {
  name: 'teams',
  data () {
    return {
      fields: [ 'name' ],
      items: []
    }
  },
  created () {
    db.collection('teams').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          name: doc.data().name,
          shortName: `/teams/${(doc.data().shortName).toLowerCase()}`
        }
        this.items.push(data)
      })
    })
  }
}
</script>
