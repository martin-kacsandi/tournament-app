<template>
  <div class="team-container">
    <b-container fluid class="bv-example-row">
      <b-row class="text-center">
        <b-col>
          <TournamentInfo :tournament="tournament"></TournamentInfo>
          <TournamentControls :tournament="tournament" :teams="teams" :winners="winners" v-if="teams" @winnersUpdated="getTournament"></TournamentControls>
        </b-col>
        <b-col cols="9">
          <Bracket :matches="tournament.matches" :link="tournament.link" :tournamentName="tournament.name"></Bracket>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Tournament } from '@/types'

import { db } from '@/firebase/db'
import moment from 'moment'
import TournamentInfo from '@/components/TournamentInfo.vue' //  Why??
import TournamentControls from '@/components/TournamentControls.vue' //  Why??
import Bracket from '@/components/Bracket.vue' // <----

@Component({
  components: {
    TournamentInfo,
    TournamentControls,
    Bracket
  }
})
export default class TournamentDetails extends Vue {
  tournament: Tournament = new Tournament();
  teams!: string[]
  winners!: string[]

  created () {
    let name = this.$route.params.id
    db.collection('tournaments').where('name', '==', name).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.tournament = new Tournament(
          doc.data().name,
          doc.data().link,
          moment(doc.data().date.toDate()).format('YYYY. MM. DD.'),
          doc.data().password,
          doc.data().private,
          doc.data().matches,
          '',
          doc.id
        )
        this.teams = [
          this.tournament.matches.game1.team1,
          this.tournament.matches.game1.team2,
          this.tournament.matches.game2.team1,
          this.tournament.matches.game2.team2
        ]

        this.winners = [
          this.tournament.matches.game1.winner,
          this.tournament.matches.game2.winner,
          this.tournament.matches.game3.winner
        ]
      })
    })
  }

  getTournament () {
    let name = this.$route.params.id
    db.collection('tournaments').where('name', '==', name).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.tournament = new Tournament(
          doc.data().name,
          doc.data().link,
          moment(doc.data().date.toDate()).format('YYYY. MM. DD. hh:mm'),
          doc.data().password,
          doc.data().private,
          doc.data().matches,
          '',
          doc.id
        )
      })
    })
  }
}
</script>

<style lang="scss">
  .listElement{
    display: flex;
    justify-content: center;
    flex-direction: column;
    .title{
      font-weight: bold;
    }
    .value{
      font-size: 20px;
    }
  }

  .button{
    margin: 20px 10px;
  }
</style>
