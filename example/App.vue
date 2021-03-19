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
      id: 1263,
      uid: 'd4753387-5cf0-47ce-a0ee-c9dcf0288e88',
      type: 'JODIT_HTML',
      position: 1,
      contentId: '19d8e9df-f0d5-42bb-9ac6-501dce605a64',
      contentSignature: '9dae791967ac78f55cfe5afa9c0b280052efc138',
      data: {
        content: "Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      meta: {
        style: {
          textType: 'quote'
        }
      },
      refs: {},
      linked: false,
      detached: false,
      createdAt: '2020-06-02T08:42:51.110Z',
      updatedAt: '2020-06-02T08:43:29.767Z',
      deletedAt: null,
      repositoryId: 5,
      activityId: 1286
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
</style>
