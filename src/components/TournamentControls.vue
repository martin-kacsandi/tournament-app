<template>
  <b-container>
    <h3>Controls</h3>
    <b-list-group align="left">
      <b-list-group-item>
        <div class="listElement">
          <span class="title">Winner of Game#1</span>
          <b-select v-model="g1Name" :options="options"></b-select>
        </div>
      </b-list-group-item>
      <b-list-group-item>
        <div class="listElement">
          <span class="title">Winner of Game#2</span>
          <b-select v-model="g2Name" :options="options"></b-select>
        </div>
      </b-list-group-item>
      <b-list-group-item>
        <div class="listElement">
          <span class="title">Winner of Game#3</span>
          <b-select v-model="g3Name" :options="options"></b-select>
        </div>
        <b-button variant="primary" @click="setWinners">Update</b-button>
      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Tournament } from '@/types'

import { db } from '@/firebase/db'

@Component
export default class TournamentControls extends Vue {
  @Prop()
  teams!: string[]

  @Prop()
  winners!: string[]

  @Prop()
  tournament!: Tournament

  options: any[] = [
    { value: '', text: 'None' },
    { value: this.teams[0], text: this.teams[0] },
    { value: this.teams[1], text: this.teams[1] },
    { value: this.teams[2], text: this.teams[2] },
    { value: this.teams[3], text: this.teams[3] }
  ]

  g1Name: string = this.winners[0]
  g2Name: string = this.winners[1]
  g3Name: string = this.winners[2]

  setWinners () {
    db.collection('tournaments').doc(this.tournament.id).update({
      'matches.game1.winner': this.g1Name,
      'matches.game2.winner': this.g2Name,
      'matches.game3.winner': this.g3Name,

      'matches.game3.team1': this.g1Name,
      'matches.game3.team2': this.g2Name
    }).then(() => {
      this.$emit('winnersUpdated')
    })
  }
}
</script>

<style lang="scss">
  .btn{
    margin-top: 12px;
  }
</style>
