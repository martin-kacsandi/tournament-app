<template>
  <div class="match-container">
    <b-container align="center">
      <b-row align-v="center">
        <b-col>
          <div class="team-name-container" :class="{winner: winnerT1}">
            <span>{{team1}}</span>
          </div>
        </b-col>
        <b-col cols="1" >
          <h2>VS</h2>
        </b-col>
        <b-col>
          <div class="team-name-container" :class="{winner: winnerT2}">
            <span>{{team2}}</span>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-button variant="primary">Watch live</b-button>
    <b-button variant="outline-primary">Back to brackets</b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { Team } from '@/types'
import { db } from '@/firebase/db'

@Component
export default class MatchView extends Vue {
  team1: string = ''
  team2: string = ''
  tournamentName: string = ''
  matchName: string = ''
  winnerT1: boolean = false
  winnerT2: boolean = false

  created () {
    this.tournamentName = this.$route.params.id
    this.matchName = this.$route.params.match

    db.collection('tournaments').where('name', '==', this.tournamentName).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.team1 = doc.data().matches[this.matchName].team1
        this.team2 = doc.data().matches[this.matchName].team2

        if (doc.data().matches[this.matchName].winner === this.team1) {
          this.winnerT1 = true
          this.winnerT2 = false
        } else if (doc.data().matches[this.matchName].winner === this.team2) {
          this.winnerT1 = false
          this.winnerT2 = true
        }
      })
    })
  }
}
</script>

<style lang="scss">
.team-name-container{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .5em;
  font-size: 3em;
  border: 1px solid lightgray;
  border-radius: 10px;

  &.winner{
    &::after{
      position: absolute;
      content: "winner";
      bottom: -.75em;
      font-size: 24px;
      background-color: white;
      padding: 0 .5em;
    }
  }
}
</style>
