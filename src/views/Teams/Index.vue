<template>
  <div class="teams-container">
    <h1>Teams</h1>
    <b-container align="right">
      <b-table class="mt-3" outlined hover :items="items" :fields="fields">
        <template v-slot:cell(name)="data">
          <a :href="data.item.route">{{ data.value }}</a>
        </template>
      </b-table>
    </b-container>
    <router-link to="teams/create">
      <b-button variant="success" >Add New Team</b-button>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Team, Players } from '@/types'

import { db } from '@/firebase/db'

@Component
export default class Teams extends Vue {
  fields: string[] = [ 'name' ];
  items: Team[] = [];

  created () {
    db.collection('teams').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let players = doc.data().players as Players
        const data = new Team(
          doc.id,
          doc.data().name,
          doc.data().shortName,
          doc.data().players as Players,
          `/teams/${doc.data().shortName}`
        )
        this.items.push(data)
      })
    })
  }
}
</script>
