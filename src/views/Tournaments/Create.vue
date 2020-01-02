<template>
  <div class="team-container">
    <b-container align="left">
      <h1 v-if="$route.matched[0].name == 'tournament_create'">Create new tournament</h1>
      <h1 v-else>Edit tournament</h1>
      <ValidationObserver v-slot="{ invalid }" ref="form">
        <form id="createTeam" @submit.prevent="submitTournament">
          <b-form-group label="Name" label-for="nameInput">
            <ValidationProvider rules="required" v-slot="v">
              <b-form-input
              name="nameInput"
              v-model="name"
              :state="v.validated ? v.valid : null"
              aria-describedby="validationName"
              ></b-form-input>
              <b-form-invalid-feedback id="validationName">{{ v.errors[0] }}</b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>

          <b-form-group label="Private" label-for="privateInput">
            <ValidationProvider rules="" vid="isPrivate" v-slot="x">
              <b-form-checkbox
                v-model="isPrivate"
                name="privateInput"
                switch
              ></b-form-checkbox>
              </ValidationProvider>
          </b-form-group>

          <b-form-group label="Password" label-for="passwordInput" v-if="isPrivate">
            <ValidationProvider rules="required_if:isPrivate,true" v-slot="v">
              <b-form-input
                name="passwordInput"
                v-model="password"
                type="password"
                :state="v.validated ? v.valid : null"
                aria-describedby="validationPw"
              ></b-form-input>
              <b-form-invalid-feedback id="validationPw">{{ v.errors[0] }}</b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>

          <b-form-group label="Date" label-for="dateInput">
            <ValidationProvider rules="required" v-slot="v">
              <flatPickr
              :class="{'form-date': true, 'invalid': v.errors.length}"
              v-model="date"
              :config="fp_config"
              :state="v.validated ? v.valid : null"
              placeholder="Select date"
              aria-describedby="validationDate"
              ></flatPickr>
              <span class="errror-message" v-if="v.errors.length" id="validationDate">This field is required.</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group label="Stream link" label-for="linkInput">
            <ValidationProvider rules="required" v-slot="v">
              <b-form-input
              name="linkInput"
              v-model="link"
              :state="v.validated ? v.valid : null"
              aria-describedby="validationLink"
            ></b-form-input>
            <b-form-invalid-feedback id="validationLink">{{ v.errors[0] }}</b-form-invalid-feedback>
            </ValidationProvider>
          </b-form-group>

          <h2>Matchups</h2>

          <b-container align="center">
            <b-row>
              <b-col align="center">
                <h3>Match 1</h3>
                <ValidationProvider rules="required" v-slot="v">
                  <b-form-select
                  v-model="matches.game1.team1"
                  aria-describedby="validationM1T1"
                  :options="teams"
                  :state="v.validated ? v.valid : null"
                ></b-form-select>
                <b-form-invalid-feedback id="validationM1T1">Select a team.</b-form-invalid-feedback>
                </ValidationProvider>

                <h4>VS</h4>
                <ValidationProvider rules="required" v-slot="v">
                  <b-form-select
                  v-model="matches.game1.team2"
                  aria-describedby="validationM1T2"
                  :options="teams"
                  :state="v.validated ? v.valid : null"
                ></b-form-select>
                <b-form-invalid-feedback id="validationM1T2">Select a team.</b-form-invalid-feedback>
                </ValidationProvider>
              </b-col>
              <b-col align="center">
                <h3>Match 2</h3>
                <ValidationProvider rules="required" v-slot="v">
                  <b-form-select
                  v-model="matches.game2.team1"
                  aria-describedby="validationM2T1"
                  :options="teams"
                  :state="v.validated ? v.valid : null"
                ></b-form-select>
                <b-form-invalid-feedback id="validationM2T1">Select a team.</b-form-invalid-feedback>
                </ValidationProvider>
                <h4>VS</h4>
                <ValidationProvider rules="required" v-slot="v">
                  <b-form-select
                  v-model="matches.game2.team2"
                  aria-describedby="validationM1T1"
                  :options="teams"
                  :state="v.validated ? v.valid : null"
                ></b-form-select>
                <b-form-invalid-feedback id="validationM2T2">Select a team.</b-form-invalid-feedback>
                </ValidationProvider>
              </b-col>
            </b-row>
            <b-button variant="primary">Random</b-button>
          </b-container>

          <b-button type="submit" class="button" variant="success">Save team</b-button>
          <router-link :to="'/tournaments/' + name">
            <b-button class="button" variant="outline-primary">Cancel</b-button>
          </router-link>
        </form>
      </ValidationObserver>
    </b-container>
  </div>
</template>

<script>
import { db } from '@/firebase/db'
import VeeValidate from 'vee-validate'
import * as rules from '@/rules/rules'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import firebase from 'firebase/app'

export default {
  name: 'tournament_create',
  data () {
    return {
      id: '',
      name: '',
      isPrivate: '',
      link: '',
      password: '',
      matches: {
        game1: {
          inProgress: false,
          isFinished: false,
          team1: '',
          team2: '',
          winner: ''
        },
        game2: {
          inProgress: false,
          isFinished: false,
          team1: '',
          team2: '',
          winner: ''
        },
        game3: {
          inProgress: false,
          isFinished: false,
          team1: '',
          team2: '',
          winner: ''
        }
      },
      date: new Date(),
      fp_config: {
        dateFormat: 'Y. m. d.'
      },
      teams: []
    }
  },
  methods: {
    submitTournament: function () {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        if (this.$route.matched[0].name === 'tournament_create') {
          this.addTournament()
        } else if (this.$route.matched[0].name === 'tournament_edit') {
          this.updateTournament()
        }
      })
    },
    addTournament: function (field) {
      db.collection('tournaments').add({
        name: this.name,
        date: firebase.firestore.Timestamp.fromDate(this.date),
        link: this.link,
        password: this.password,
        private: this.isPrivate,
        matches: this.matches
      }).then(() => {
        this.$router.push('/tournaments/' + this.name)
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
        this.$router.push('/teams/' + self.shortName)
      })
    },
    test: function () {
      console.log('on blur')
    }
  },
  created () {
    let query = db.collection('teams').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.teams.push(doc.data().name)
      })
    })

    let routerId = this.$route.params.id
    if (routerId) {
      let query = db.collection('tournaments').where('name', '==', routerId).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.name = doc.data().name
          this.date = doc.data().date.toDate()
          this.link = doc.data().link
          this.isPrivate = doc.data().private
          this.password = doc.data().password
          this.matches = doc.data().matches
        })
      })
    }
  },
  mounted () {
    this.$refs.form.reset()
  },
  components: {
    flatPickr
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

  .form-date{
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;

    &.invalid{
      border-color: #dc3545;
    }
  }

  .errror-message{
    display: block;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
    color: #dc3545;
  }
</style>
