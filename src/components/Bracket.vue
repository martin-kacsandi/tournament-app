<template>
  <b-container align="center">
    <div class="tournament-bracket">
      <div class="br-row">
        <div class="br-col">
          <b>Round 1</b>
        </div>
        <div class="br-col"></div>
        <div class="br-col">
          <b>Round 2</b>
        </div>
        <div class="br-col"></div>
        <div class="br-col">
          <b>Winner</b>
        </div>
      </div>
      <div class="br-row">
        <div class="br-col match m1t1">
          <div class="name">{{matches.game1.team1}}</div>
        </div>
        <div class="br-col brl hl vb">
          <div class="line tl"></div>
          <div class="line tr"></div>
          <div class="line bl"></div>
          <div class="line br"></div>
        </div>
        <div class="br-col"></div>
        <div class="br-col"></div>
        <div class="br-col"></div>
      </div>
      <div class="br-row">
        <div class="br-col" :class="{active: matches.game1.inProgress}">
          <b-button
            variant="primary"
            v-if="!matches.game1.isFinished && matches.game1.inProgress"
          >View</b-button>
        </div>
        <div class="br-col brl hr vt vb">
          <div class="line tl"></div>
          <div class="line tr"></div>
          <div class="line bl"></div>
          <div class="line br"></div>
        </div>
        <div class="br-col match m3t1">
          <div class="name">{{matches.game3.team1}}</div>
        </div>
        <div class="br-col brl hl vb">
          <div class="line tl"></div>
          <div class="line tr"></div>
          <div class="line bl"></div>
          <div class="line br"></div>
        </div>
        <div class="br-col"></div>
      </div>
      <div class="br-row">
        <div class="br-col match m1t2">
          <div class="name">{{matches.game1.team2}}</div>
        </div>
        <div class="br-col brl hl vt">
          <div class="line tl"></div>
          <div class="line tr"></div>
          <div class="line bl"></div>
          <div class="line br"></div>
        </div>
        <div class="br-col"></div>
        <div class="br-col brl vt vb">
          <div class="line tl"></div>
          <div class="line tr"></div>
          <div class="line bl"></div>
          <div class="line br"></div>
        </div>
        <div class="br-col"></div>
      </div>
      <div class="br-row">
        <div class="br-col"></div>
        <div class="br-col"></div>
        <div class="br-col"></div>
        <div class="br-col brl hr vt vb">
          <div class="line tl"></div>
          <div class="line tr"></div>
          <div class="line bl"></div>
          <div class="line br"></div>
        </div>
        <div class="br-col match winner">
          <div class="name">{{matches.winner}}</div>
        </div>
      </div>
      <div class="br-row">
        <div class="br-col match m2t1">
          <div class="name">{{matches.game2.team1}}</div>
        </div>
        <div class="br-col brl hl vb">
          <div class="line tl"></div>
          <div class="line tr"></div>
          <div class="line bl"></div>
          <div class="line br"></div>
        </div>
        <div class="br-col"></div>
        <div class="br-col brl vt vb">
          <div class="line tl"></div>
          <div class="line tr"></div>
          <div class="line bl"></div>
          <div class="line br"></div>
        </div>
        <div class="br-col"></div>
      </div>
      <div class="br-row">
        <div class="br-col"></div>
        <div class="br-col brl hr vt vb">
          <div class="line tl"></div>
          <div class="line tr"></div>
          <div class="line bl"></div>
          <div class="line br"></div>
        </div>
        <div class="br-col match m3t2">
          <div class="name">{{matches.game3.team2}}</div>
        </div>
        <div class="br-col brl hl vt">
          <div class="line tl"></div>
          <div class="line tr"></div>
          <div class="line bl"></div>
          <div class="line br"></div>
        </div>
        <div class="br-col"></div>
      </div>
      <div class="br-row">
        <div class="br-col match m2t2">
          <div class="name">{{matches.game2.team2}}</div>
        </div>
        <div class="br-col brl hl vt">
          <div class="line tl"></div>
          <div class="line tr"></div>
          <div class="line bl"></div>
          <div class="line br"></div>
        </div>
        <div class="br-col"></div>
        <div class="br-col">
          <div class="line tl"></div>
          <div class="line tr"></div>
          <div class="line bl"></div>
          <div class="line br"></div>
        </div>
        <div class="br-col"></div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  props: ['matches', 'link'],
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
.tournament-bracket{
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;

    .br-row{
      display: flex;
      width: 90%;
      height: calc(100% / 8);

      .br-col{
        width: calc(100% / 5);
        height: 100%;

        .view{
          background-color: #9146FF;
        }

        &.active{
          display: flex;
          justify-content: center;
          align-items: center;
        }

        &.match{
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 3px;
            border: 1px solid #888;
        }

        &.brl{
          display: grid;
          grid-template-columns: repeat(2, 1fr);

          .line{
            height: 100%;
            width: 100%;
          }

          &.hl{
            .line.tl{
              border-bottom: 1px solid #888;
            }
          }
          &.hr{
            .line.tr{
              border-bottom: 1px solid #888;
            }
          }
          &.vt{
            .line.tl{
              border-right: 1px solid #888;
            }
          }
          &.vb{
            .line.bl{
              border-right: 1px solid #888;
            }
          }
        }
      }
    }
  }
</style>
