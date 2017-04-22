<template>
  <div id="app">
    <img src="./assets/logo.png">
    <p>
      <router-link to="/">Intro</router-link> |
      <router-link to="/vuetable2">Vuetable-2</router-link> |
      <router-link to="/vuetables">Vue-Tables 2</router-link> |
      <router-link to="/vuetiful">Vuetiful</router-link> |
      <router-link to="/#jquery">JQuery Datatables</router-link> |
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
</style>
