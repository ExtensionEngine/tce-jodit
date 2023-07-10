<template>
  <div id="app">
    <div id="container">
      <h1>TCE Jodit example</h1>
      <tce-toolbar />
      <tce-jodit-html :element="element" :is-focused="true" />
    </div>
  </div>
</template>

<script>

export default {
  data: () => ({
    element: {
      type: 'JODIT_HTML',
      position: 1,
      data: {
        content: ''
      }
    }
  })
};
</script>

<style lang="scss">
body {
  background: #eee;
}

#app {
  background: #eee;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#container {
  padding: 30px;
  background: #fff;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.jodit-toolbar-editor-collection_container {
  box-shadow: -1px 1px 4px 0 #ddd;
  background: #fff;
}

.tce-jodit-html {
  margin-top: 20px;
  border: 2px solid #eee;
  padding: 10px;
}

.jodit-container:not(.jodit_inline) .jodit-wysiwyg {
  p {
    margin: 0;
  }
}
</style>
