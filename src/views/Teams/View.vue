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
      <router-link :to="`${team.shortName}/edit`">
        <b-button class="button" variant="primary">Edit</b-button>
      </router-link>
      <b-button class="button" variant="danger" v-b-modal.modal-1>Delete</b-button>
      <b-modal id="modal-1" title="Deleting team" @ok="deleteTeam">
        <p class="my-4">Are you sure you want to delete this team?</p>
        <h2>{{this.team.name}}</h2>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import { db } from '@/firebase/db'

export default {
  name: 'team',
  data () {
    return {
      team: {}
    }
  },
  created () {
    let shortName = this.$route.params.shortName
    let query = db.collection('teams').where('shortName', '==', shortName).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.team = {
          id: doc.id,
          name: doc.data().name,
          players: doc.data().players,
          shortName: doc.data().shortName
        }
      })
    })
  },
  methods: {
    deleteTeam: function () {
      let self = this
      db.collection('teams').doc(self.team.id).delete().then(() => {
        self.$router.push('/teams')
      })
    }
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
