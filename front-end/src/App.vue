<template>
<div>
  <router-view/>
</div>
</template>

<script>

export default {
  data() {
    return {
        currentUser: {
          user: null,
          test: "123"
      }
    }
  }
}

</script>

<style>
body{
  margin:0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width:80%;
  margin: 0 auto;
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
