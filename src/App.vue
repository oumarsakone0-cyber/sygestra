<template>
  <div id="app">
    
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <ImportPage />
  </div>
  
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ImportPage from './components/pages/ImportPage.vue'



export default {
  name: 'App',
  components: {
    HelloWorld,
    ImportPage
  
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
