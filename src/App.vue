<template>
  <div id="app">
    <img src="./assets/logo.png">
    <p class="navigation">
      <router-link to="/">Intro</router-link> |
      <router-link to="/vuetable2">Vuetable-2</router-link> |
      <router-link to="/vuetables">Vue-Tables 2</router-link> |
      <router-link to="/vuetiful">Vuetiful</router-link> |
      <router-link to="/#jquery">JQuery Datatables</router-link> |
      <a href="https://vuetifyjs.com/components/datatables" target="_blank">Vuetify</a> |
      <router-link to="/buefy">Buefy</router-link> |
      <a href="https://github.com/smxsm/vuegrid" target="_blank">Sourcecode!</a>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.navigation {
  font-size: 17px;
}
</style>
