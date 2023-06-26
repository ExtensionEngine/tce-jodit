<template>
  <div class="jodit-wrapper">
    <jodit-vue ref="jodit" @input="input" :config="config" :value="value" />
  </div>
</template>

<script setup>
import { computed, defineEmits, ref, watch } from 'vue';
import { Jodit, JoditVue } from 'jodit-vue';
import AutofocusPlugin from './plugins/autofocus';
import ExternalToolbarPlugin from './plugins/external-toolbar';
import FontControlsPlugin from './plugins/font-controls';
import MdiIconsPlugin from './plugins/mdi-icons';
import pluginsAdapter from './plugins-adapter';
import SourceEditorPlugin from './plugins/source-editor';
import TablePopupsPlugin from './plugins/table-popups';
import Toolbar from './Toolbar.vue';
import ToolbarBuilderPlugin from './plugins/toolbar-builder';
import ToolbarPopupsPlugin from './plugins/toolbar-popups';
import TooltipPlugin from './plugins/tooltip';

const JODIT_READY_EVENT = 'joditReady';

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

const plugins = [
  {
    use: MdiIconsPlugin
  },
  {
    use: TooltipPlugin
  },
  {
    use: ToolbarBuilderPlugin,
    options: {
      buttons: Toolbar.$buttons
    }
  },
  {
    use: ExternalToolbarPlugin,
    options: {
      readyEvent: JODIT_READY_EVENT,
      toolbarContainer: Toolbar.$containerId
    }
  },
  {
    use: FontControlsPlugin
  },
  {
    use: ToolbarPopupsPlugin
  },
  {
    use: SourceEditorPlugin
  },
  {
    use: TablePopupsPlugin
  },
  {
    use: AutofocusPlugin,
    options: {
      readyEvent: JODIT_READY_EVENT
    }
  }
];

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  minHeight: {
    type: Number,
    default: 0
  },
  placeholder: {
    type: String,
    default: 'Insert text here...'
  },
  readonly: {
    type: Boolean,
    default: false
  }
});

const jodit = ref(null);

const config = computed(() => ({
  ...joditConfig,
  minHeight: props.minHeight.value,
  placeholder: !props.value.value ? props.placeholder.value : '',
  plugins
}));

watch(
  () => props.readonly,
  state => {
    const editor = jodit.value.editor;
    if (!editor) return;
    editor.setReadOnly(state);
    if (!state) editor.selection.focus();
  }
);

const emit = defineEmits(['input']);

const input = value => {
  emit('input', value);
};
</script>

<style lang="scss" scoped>
$icon-color: #333;
$icon-size: 18px;
$statusbar-height: 26px;
$statusbar-border-size: 1px;
$min-height: 140px;
$font-family-monospace: 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro',
  monospace;

.jodit-wrapper {
  :deep(.jodit-container:not(.jodit_inline)) {
    display: flex;
    min-height: $min-height;
    flex-direction: column;
    border: none;

    :deep(.jodit-workplace) {
      border: none;
    }
  }

  :deep(.jodit-placeholder) {
    font-style: italic;
  }

  :deep(.jodit-source) {
    background: transparent;

    :deep(.ace-editor) {
      font-size: 13px;
      font-family: $font-family-monospace;
    }
  }

  :deep(.jodit-status-bar) {
    height: $statusbar-height;
    margin-top: auto;
    line-height: $statusbar-height - $statusbar-border-size;
    background-color: transparent;
    border: none;

    :deep(.jodit-status-bar__item) {
      line-height: inherit;
    }

    :deep(.jodit-toolbar-button) {
      line-height: inherit;
      vertical-align: top;

      & > a {
        vertical-align: middle;
      }

      :deep(.jodit-icon) {
        display: inline-block;
        width: $icon-size;
        height: $icon-size;
        color: $icon-color;
        font-size: $icon-size;
        line-height: $icon-size;
      }
    }
  }
}
</style>
