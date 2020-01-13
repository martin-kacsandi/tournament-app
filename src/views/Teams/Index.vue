<template>
  <div class="teams-container">
    <b-container align="left">
      <h1>Teams</h1>
      <b-table class="mt-3" outlined hover :items="items" :fields="fields">
        <template v-slot:cell(name)="data">
          <router-link :to="data.item.route">{{ data.value }}</router-link>
        </template>
      </b-table>
      <router-link to="teams/create">
        <b-button variant="primary" >Add Team
        </b-button>
      </router-link>
    </b-container>
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

<style lang="scss">
.tournaments-container{
  h1{
    margin-bottom: 1em;
    align-self:flex-start;
  }
}
</style>
