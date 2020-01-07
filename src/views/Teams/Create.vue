<template>
  <div class="team-container">
    <b-container align="left">
      <h1 v-if="$route.matched[0].name == 'team_create'">Create new team</h1>
      <h1 v-else>Edit team</h1>
      <ValidationObserver v-slot="{ invalid }" ref="teamForm">
        <form id="createTeam">
          <b-form-group label="Name" label-for="nameInput">
            <ValidationProvider rules="required" v-slot="v">
              <b-form-input
                name="nameInput"
                v-model="name"
                :state="v.validated ? v.valid : null"
                aria-describedby="validation"
              ></b-form-input>
              <b-form-invalid-feedback id="validation">{{v.errors[0]}}</b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>

          <b-form-group label="Short Name" label-for="shortNameInput">
            <ValidationProvider rules="required|min:3" v-slot="v">
              <b-form-input
                name="shortNameInput"
                v-model="shortName"
                :state="v.validated ? v.valid : null"
                aria-describedby="snValidation"
              ></b-form-input>
              <b-form-invalid-feedback
                id="snValidation"
              >{{v.errors[0]}}</b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>

          <h2>Players</h2>

          <b-form-group label="Top" label-for="topInput">
            <ValidationProvider rules="required" v-slot="v">
              <b-form-input
                name="topInput"
                v-model="top"
                :state="v.validated ? v.valid : null"
                aria-describedby="topV"
              ></b-form-input>
              <b-form-invalid-feedback id="topV">{{v.errors[0]}}</b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>

          <b-form-group label="Jungle" label-for="jglInput">
            <ValidationProvider rules="required" v-slot="v">
              <b-form-input
                name="jglInput"
                v-model="jgl"
                :state="v.validated ? v.valid : null"
                aria-describedby="jglV"
              ></b-form-input>
              <b-form-invalid-feedback id="jglV">{{v.errors[0]}}</b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>

          <b-form-group label="Mid" label-for="midInput">
            <ValidationProvider rules="required" v-slot="v">
              <b-form-input
                name="midInput"
                v-model="mid"
                :state="v.validated ? v.valid : null"
                aria-describedby="midV"
              ></b-form-input>
              <b-form-invalid-feedback id="midV">{{v.errors[0]}}</b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>

          <b-form-group label="Marksman" label-for="adcInput">
            <ValidationProvider rules="required" v-slot="v">
              <b-form-input
                name="adcInput"
                v-model="adc"
                :state="v.validated ? v.valid : null"
                aria-describedby="adcV"
              ></b-form-input>
              <b-form-invalid-feedback id="adcV">{{v.errors[0]}}</b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>

          <b-form-group label="Support" label-for="sppInput">
            <ValidationProvider rules="required" v-slot="v">
              <b-form-input
                name="sppInput"
                v-model="spp"
                :state="v.validated ? v.valid : null"
                aria-describedby="sppV"
              ></b-form-input>
              <b-form-invalid-feedback id="sppV">{{v.errors[0]}}</b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>
          <b-button class="button" @click="submitTeam" variant="success">Save team</b-button>
          <router-link to="/teams">
            <b-button class="button" variant="outline-primary">Cancel</b-button>
          </router-link>
        </form>
      </ValidationObserver>
    </b-container>
  </div>
</template>

<script>
import { db } from '@/firebase/db'
import * as rules from '@/rules/rules'

export default {
  data () {
    return {
      id: '',
      name: '',
      shortName: '',
      top: '',
      jgl: '',
      mid: '',
      adc: '',
      spp: ''
    }
  },
  methods: {
    submitTeam: function () {
      this.$refs.teamForm.validate().then((success) => {
        if (!success) {
          return
        }
        if (this.$route.matched[0].name === 'tournament_create') {
          this.addTeam()
        } else if (this.$route.matched[0].name === 'tournament_edit') {
          this.updateTeam()
        }
      })
    },
    addTeam: function () {
      let self = this
      db.collection('teams').add({
        name: this.name,
        shortName: this.shortName,
        players: {
          top: this.top,
          jgl: this.jgl,
          mid: this.mid,
          adc: this.adc,
          spp: this.spp
        }
      }).then(() => {
        self.$router.push('/teams/' + self.shortName)
      })
    },
    updateTeam: function () {
      let self = this
      db.collection('teams').doc(self.id).update({
        name: self.name,
        shortName: self.shortName,
        players: {
          top: self.top,
          jgl: self.jgl,
          mid: self.mid,
          adc: self.adc,
          spp: self.spp
        }
      }).then(() => {
        self.$router.push('/teams/' + self.shortName)
      })
    }
  },
  created () {
    let routerShortName = this.$route.params.shortName
    if (routerShortName) {
      let query = db.collection('teams').where('shortName', '==', routerShortName).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.id = doc.id
          this.name = doc.data().name
          this.shortName = doc.data().shortName
          this.top = doc.data().players.top
          this.jgl = doc.data().players.jgl
          this.mid = doc.data().players.mid
          this.adc = doc.data().players.adc
          this.spp = doc.data().players.spp
        })
      })
    }
  }
}
</script>

<style lang="scss">
  .error{
    color: #f00;
    font-size: 14px;
    margin: 0;
  }

  b-button{
    margin: 20px 10px;
  }
</style>
