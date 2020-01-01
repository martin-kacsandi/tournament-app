<template>
  <div class="team-container">
    <b-container align="left">
      <h1 v-if="$route.matched[0].name == 'tournament_create'">Create new tournament</h1>
      <h1 v-else>Edit tournament</h1>
      <form id="createTeam">
        <b-form-group label="Name" label-for="nameInput">
          <b-form-input
            name="nameInput"
            v-model="$v.name.$model"
            :state="$v.name.$dirty ? !$v.name.$error : null"
            aria-describedby="validationName"
          ></b-form-input>
          <b-form-invalid-feedback id="validationName">This is a required field.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Private" label-for="privateInput">
          <b-form-checkbox
            v-model="isPrivate"
            name="privateInput"
            unchecked-value
          >Private tournament</b-form-checkbox>
        </b-form-group>

        <b-form-group label="Password" label-for="passwordInput" v-if="isPrivate">
          <b-form-input
            name="passwordInput"
            v-model="$v.password.$model"
            type="password"
            :state="$v.password.$dirty ? !$v.password.$error : null"
            aria-describedby="validationPw"
          ></b-form-input>
          <b-form-invalid-feedback id="validationPw">This is a required field.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Date" label-for="dateInput">
          <b-form-input
            :type="'date'"
            name="dateInput"
            v-model="$v.date.$model"
            :state="$v.date.$dirty ? !$v.date.$error : null"
            aria-describedby="validationDate"
          ></b-form-input>
          <b-form-invalid-feedback id="validationDate">This is a required field.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Stream link" label-for="linkInput">
          <b-form-input
            name="linkInput"
            v-model="$v.link.$model"
            :state="$v.link.$dirty ? !$v.link.$error : null"
            aria-describedby="validationLink"
          ></b-form-input>
          <b-form-invalid-feedback id="validationLink">This is a required field.</b-form-invalid-feedback>
        </b-form-group>

        <h2>Matchups</h2>

        <b-container align="center">
          <b-row>
            <b-col align="center">
              <h3>Match 1</h3>
              <b-form-select
                v-model="$v.matches.game1.team1.$model"
                :state="$v.matches.game1.team1.$dirty ? !$v.matches.game1.team1.$error : null"
                aria-describedby="validationM1T1"
                :options="teams"
              ></b-form-select>
              <b-form-invalid-feedback id="validationM1T1">Select a team.</b-form-invalid-feedback>
              <h4>VS</h4>
              <b-form-select
                v-model="$v.matches.game1.team2.$model"
                :state="$v.matches.game1.team2.$dirty ? !$v.matches.game1.team2.$error : null"
                aria-describedby="validationM1T2"
                :options="teams"
              ></b-form-select>
              <b-form-invalid-feedback id="validationM1T2">Select a team.</b-form-invalid-feedback>
            </b-col>
            <b-col align="center">
              <h3>Match 2</h3>
              <b-form-select
                v-model="$v.matches.game2.team1.$model"
                :state="$v.matches.game2.team1.$dirty ? !$v.matches.game2.team1.$error : null"
                aria-describedby="validationM2T1"
                :options="teams"
              ></b-form-select>
              <b-form-invalid-feedback id="validationM2T1">Select a team.</b-form-invalid-feedback>
              <h4>VS</h4>
              <b-form-select
                v-model="$v.matches.game2.team2.$model"
                :state="$v.matches.game2.team2.$dirty ? !$v.matches.game2.team2.$error : null"
                aria-describedby="validationM2T2"
                :options="teams"
              ></b-form-select>
              <b-form-invalid-feedback id="validationM2T2">Select a team.</b-form-invalid-feedback>
            </b-col>
          </b-row>
          <b-button variant="primary">Random</b-button>
        </b-container>

        <b-button
          class="button"
          v-if="$route.matched[0].name == 'tournament_create'"
          @click="addTournament"
          variant="success"
        >Create team</b-button>
        <b-button class="button" v-else @click="updateTeam" variant="success">Save team</b-button>
        <router-link to="/teams">
          <b-button class="button" variant="outline-primary">Cancel</b-button>
        </router-link>
      </form>
    </b-container>
  </div>
</template>

<script>
import { db } from '@/firebase/db'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'tournament_create',
  data () {
    return {
      id: '',
      name: '',
      isPrivate: 0,
      link: '',
      password: '',
      matches: {
        game1: {
          inProgress: false,
          isFinishes: false,
          team1: '',
          team2: '',
          winner: ''
        },
        game2: {
          inProgress: false,
          isFinishes: false,
          team1: '',
          team2: '',
          winner: ''
        },
        game3: {
          inProgress: false,
          isFinishes: false,
          team1: '',
          team2: '',
          winner: ''
        }
      },
      date: '',
      fp_config: {
        dateFormat: 'Y. m. d.'
      },
      teams: []
    }
  },
  validations () {
    if (this.isPrivate) {
      return {
        name: {
          required
        },
        date: {
          required
        },
        password: {
          required
        },
        link: {
          required
        },
        matches: {
          game1: {
            team1: {
              required
            },
            team2: {
              required
            }
          },
          game2: {
            team1: {
              required
            },
            team2: {
              required
            }
          }
        }
      }
    } else {
      return {
        name: {
          required
        },
        date: {
          required
        },
        link: {
          required
        },
        matches: {
          game1: {
            team1: {
              required
            },
            team2: {
              required
            }
          },
          game2: {
            team1: {
              required
            },
            team2: {
              required
            }
          }
        }
      }
    }
  },
  methods: {
    addTournament: function () {
      this.$v.$touch()
      if (this.$v.$anyError) {
        console.log('error')
        return
      }
      let self = this
      db.collection('tournaments').add({
        name: this.name,
        date: this.date,
        link: this.link,
        password: this.password,
        private: this.isPrivate,
        matches: this.matches
      }).then(() => {
        console.log('done')
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
        /* self.$router.push('/teams/' + self.shortName) */
      })
    }
  },
  created () {
    let query = db.collection('teams').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.teams.push(doc.data().name)
      })
    })
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
  }
</style>
