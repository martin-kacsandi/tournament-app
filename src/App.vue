<template>
  <div id="app">
    <b-nav align="left">
      <b-nav-item to="/" class="logo-nav">
        <img src="@/assets/logo.png" alt="Logo" class="logo">
      </b-nav-item>
      <b-nav-item to="/tournaments">
        Tournaments
      </b-nav-item>
      <b-nav-item to="/teams">
        Teams
      </b-nav-item>
    </b-nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap');
@import '@/styles/app.scss';

#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-color: $background;
  min-height: 100vh;
}

.nav{
  background-color: #000;
  margin-bottom: 5em;
}

.nav-item{
  .nav-link{
    color: $primary;
    margin: 10px 10px;
    padding: 4px;
    border-radius: 0;
    font-weight: normal;

    &:hover{
      transition: .2s color;
      color: #fff;
    }
  }

  &.logo-nav{
    .nav-link{
      padding: 0 4px;
    }

    .router-link-active{
      border:none;
    }
  }

  .router-link-active{
    border-bottom: 2px solid #fff;
    color: #fff;
    font-weight: bold;
  }
}

.logo{
  width: 32px;
  height: 32px;
}
</style>
