<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Bienvenue sur votre application Vue.js</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.hello {
  text-align: center;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}
</style>