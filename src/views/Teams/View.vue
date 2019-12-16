<template>
  <div class="team-container">
    <b-container>
      <h1>{{ team.name }}</h1>
      <b-list-group align="left">
        <b-list-group-item>
          <div class="listElement">
            <span class="title">Name</span>
            <span class="value">{{ team.name }} ({{ team.shortName }})</span>
          </div>
        </b-list-group-item>
        <b-list-group-item>
          <div class="listElement">
            <span class="title">Players</span>
            <span class="value">
              Top:
              <b>{{ team.players.top }}</b>
            </span>
            <span class="value">
              Jungle:
              <b>{{ team.players.jgl }}</b>
            </span>
            <span class="value">
              Mid:
              <b>{{ team.players.mid }}</b>
            </span>
            <span class="value">
              Marksman:
              <b>{{ team.players.adc }}</b>
            </span>
            <span class="value">
              Support:
              <b>{{ team.players.spp }}</b>
            </span>
          </div>
        </b-list-group-item>
      </b-list-group>
    </b-container>
  </div>
</template>

<script>
import { db } from '../../firebase/db'

export default {
  name: 'team',
  data () {
    return {
      team: {}
    }
  },
  created () {
    let shortName = this.$route.params.shortName
    let query = db.collection('teams').where('shortName', '==', shortName.toUpperCase()).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.team = {
          name: doc.data().name,
          players: doc.data().players,
          shortName: doc.data().shortName
        }
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
</style>
