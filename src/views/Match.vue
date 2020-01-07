<template>
  <div class="match-container">
    <b-container align="center">
      <b-row align-v="center">
        <b-col>
          <b-list-group>
            <b-list-group-item>
              <div class="listElement">
                <span class="value">ASD</span>
              </div>
            </b-list-group-item>
            <b-list-group-item align="left">
              <div class="listElement">
                <span class="value">
                  Top:
                  <b>asd</b>
                </span>
                <span class="value">
                  Jungle:
                  <b>asd</b>
                </span>
                <span class="value">
                  Mid:
                  <b>asd</b>
                </span>
                <span class="value">
                  Marksman:
                  <b>asd</b>
                </span>
                <span class="value">
                  Support:
                  <b>asd</b>
                </span>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col cols="1" >
          <h2>VS</h2>
        </b-col>
        <b-col>
          <b-list-group>
            <b-list-group-item>
              <div class="listElement">
                <span class="value">ASD</span>
              </div>
            </b-list-group-item>
            <b-list-group-item align="left">
              <div class="listElement">
                <span class="value">
                  Top:
                  <b>asd</b>
                </span>
                <span class="value">
                  Jungle:
                  <b>asd</b>
                </span>
                <span class="value">
                  Mid:
                  <b>asd</b>
                </span>
                <span class="value">
                  Marksman:
                  <b>asd</b>
                </span>
                <span class="value">
                  Support:
                  <b>asd</b>
                </span>
              </div>
            </b-list-group-item>
          </b-list-group>
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

export default class MatchView extends Vue {
}
</script>
