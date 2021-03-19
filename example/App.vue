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
        content: ""
      },
    }
  })
};
</script>

<style lang="scss">
body {
  background: #eee;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #eee;
}

#container {
  padding: 30px;
  background: #fff;

  a {
    color: #2c3e50;
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.jodit-toolbar-editor-collection_container {
  background: #fff;
  box-shadow: -1px 1px 4px 0 #ddd;
}

.tce-jodit-html {
  margin-top: 20px;
  padding: 10px;
  border: 2px solid #eee;
}

.jodit-container:not(.jodit_inline) .jodit-wysiwyg {
  p {
    margin: 0;
  }
}
</style>
