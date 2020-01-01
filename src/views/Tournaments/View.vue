<template>
  <div class="team-container">
    <b-container fluid class="bv-example-row">
      <b-row class="text-center">
        <b-col>
          <TournamentInfo :tournament="tournament"></TournamentInfo>
        </b-col>
        <b-col cols="9">
          <Bracket :matches="tournament.matches" :link="tournament.link"></Bracket>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { db } from '@/firebase/db'
import * as moment from 'moment'
import TournamentInfo from '@/components/TournamentInfo'
import Bracket from '@/components/Bracket'

export default {
  name: 'team',
  data () {
    return {
      tournament: {}
    }
  },
  created () {
    let name = this.$route.params.id
    db.collection('tournaments').where('name', '==', name).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.tournament = {
          id: doc.id,
          name: doc.data().name,
          password: doc.data().password,
          private: doc.data().private,
          link: doc.data().link,
          date: moment(doc.data().date.toDate()).format('YYYY. MM. DD. hh:mm'),
          matches: doc.data().matches
        }
      })
    })
  },
  components: {
    TournamentInfo,
    Bracket
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
