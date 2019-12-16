<template>
  <div id="app">
    <b-nav pills align="right">
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
