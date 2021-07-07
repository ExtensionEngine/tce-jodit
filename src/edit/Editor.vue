<template>
  <div class="jodit-wrapper">
    <jodit-vue ref="jodit" @input="input" :config="config" :value="value" />
  </div>
</template>

<script>
import { Jodit, JoditVue } from 'jodit-vue';
import AutofocusPlugin from './plugins/autofocus';
import ExternalToolbarPlugin from './plugins/external-toolbar';
import FontControlsPlugin from './plugins/font-controls';
import ImageUploaderPlugin from './plugins/image-uploader';
import MdiIconsPlugin from './plugins/mdi-icons';
import pluginsAdapter from './plugins-adapter';
import SourceEditorPlugin from './plugins/source-editor';
import TablePopupsPlugin from './plugins/table-popups';
import Toolbar from './Toolbar.vue';
import ToolbarBuilderPlugin from './plugins/toolbar-builder';
import ToolbarPopupsPlugin from './plugins/toolbar-popups';
import TooltipPlugin from './plugins/tooltip';

const JODIT_READY_EVENT = 'joditReady';
const JODIT_UPLOAD_FILES_EVENT = 'joditUploadFiles';
const JODIT_FILES_UPLOAD_ENDED_EVENT = 'joditFilesUploadEnded';

/** @type {import('jodit/src/Config').Config & import('jodit/src/plugins')} */
const joditConfig = {
  autofocus: true,
  addNewLineOnDBLClick: false,
  showTooltipDelay: 350,
  colorPickerDefaultTab: 'color',
  disablePlugins: ['fullsize'],
  language: 'en',
  extraIcons: {
    tooltip: '<span class="mdi mdi-tooltip-text"></span>'
  }
};

pluginsAdapter(Jodit);

const plugins = [{
  use: MdiIconsPlugin
}, {
  use: TooltipPlugin
}, {
  use: ToolbarBuilderPlugin,
  options: {
    buttons: Toolbar.$buttons
  }
}, {
  use: ExternalToolbarPlugin,
  options: {
    readyEvent: JODIT_READY_EVENT,
    toolbarContainer: Toolbar.$containerId
  }
}, {
  use: FontControlsPlugin
}, {
  use: ToolbarPopupsPlugin
}, {
  use: ImageUploaderPlugin,
  options: {
    uploadFilesEvent: JODIT_UPLOAD_FILES_EVENT,
    filesUploadEndedEvent: JODIT_FILES_UPLOAD_ENDED_EVENT,
    imagesAsBase64: false
  }
}, {
  use: SourceEditorPlugin
}, {
  use: TablePopupsPlugin
}, {
  use: AutofocusPlugin,
  options: {
    readyEvent: JODIT_READY_EVENT
  }
}];

export default {
  inject: {
    $elementBus: { default: null }
  },
  props: {
    value: { type: String, required: true },
    minHeight: { type: Number, required: true },
    placeholder: { type: String, default: 'Insert text here...' },
    readonly: { type: Boolean, default: false },
    storageResponses: { type: Object, default: () => ({}) }
  },
  data: () => ({
    uploadCallbacks: {}
  }),
  computed: {
    config: vm => ({
      ...joditConfig,
      minHeight: vm.minHeight,
      placeholder: !vm.value ? vm.placeholder : '',
      plugins: vm.getPlugins()
    }),
    editor() {
      return this.$refs.jodit.editor;
    }
  },
  methods: {
    input(value) {
      return this.$emit('input', value);
    },
    getPlugins() {
      return plugins.map(plugin => {
        if (plugin.use === ImageUploaderPlugin) plugin.options.imagesAsBase64 = !this.$elementBus;
        return plugin;
      });
    },
    uploadFiles({ id, formData }) {
      const fileForms = Array.from(formData.values())
        .filter(value => value instanceof File)
        .map(file => {
          const singleFileForm = new FormData();
          singleFileForm.append('file', file, file.name);
          return singleFileForm;
        });
      this.uploadCallbacks[id] = response => {
        delete this.uploadCallbacks[id];
        this.editor.events.fire(JODIT_FILES_UPLOAD_ENDED_EVENT, { id, response });
      };
      this.$elementBus.emit('upload', { id, fileForms });
    }
  },
  watch: {
    readonly(state) {
      if (!this.editor) return;
      this.editor.setReadOnly(state);
      if (!state) this.editor.selection.focus();
    },
    storageResponses: {
      deep: true,
      handler(value) {
        Object.entries(value).forEach(([id, response]) => {
          const callback = this.uploadCallbacks[id];
          if (typeof callback !== 'function') return;
          callback(response);
          this.$elementBus.emit('responseConsumed', id);
        });
      }
    }
  },
  mounted() {
    this.editor.events.on(JODIT_UPLOAD_FILES_EVENT, this.uploadFiles);
  },
  beforeDestroy() {
    this.editor.events.off(JODIT_UPLOAD_FILES_EVENT, this.uploadFiles);
  },
  components: {
    JoditVue
  }
};
</script>

<style lang="scss" scoped>
$icon-color: #333;
$icon-size: 18px;
$statusbar-height: 26px;
$statusbar-border-size: 1px;
$min-height: 140px;
$font-family-monospace: "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro", monospace;

.jodit-wrapper ::v-deep {
  .jodit-container:not(.jodit_inline) {
    display: flex;
    min-height: $min-height;
    flex-direction: column;
    border: none;

    .jodit-workplace {
      border: none;
    }
  }

  .jodit-placeholder {
    font-style: italic;
  }

  .jodit-source {
    background: transparent;

    .ace-editor {
      font-size: 13px;
      font-family: $font-family-monospace;
    }
  }

  .jodit-status-bar {
    height: $statusbar-height;
    margin-top: auto;
    line-height: $statusbar-height - $statusbar-border-size;
    background-color: transparent;
    border: none;

    .jodit-status-bar__item {
      line-height: inherit;
    }

    .jodit-toolbar-button {
      line-height: inherit;
      vertical-align: top;

      & > a {
        vertical-align: middle;
      }

      .jodit-icon {
        display: inline-block;
        width: $icon-size;
        height: $icon-size;
        color: $icon-color;
        font-size: $icon-size;
        line-height: $icon-size;
      }
    }
  }

  .jodit_error_box_for_messages {
    &>.load {
      box-sizing: border-box;
      color: #fff;

      @keyframes dots {
        0% {
          opacity: 0;
        }

        30% {
          opacity: 1;
        }

        100% {
          opacity: 0;
        }
      }

      &>.dot {
        display: inline-block;
        width: 4px;
        height: 4px;
        margin-right: 6px;
        border-radius: 50%;
        background-color: currentColor;
        animation-name: dots;
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
      }

      &>.dot:nth-child(1) {
        margin-left: 6px;
      }

      &>.dot:nth-child(2) {
        animation-delay: .3s;
      }

      &>.dot:nth-child(3) {
        margin-right: 0;
        animation-delay: .5s;
      }
    }
  }
}
</style>
