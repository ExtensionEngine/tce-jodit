<template>
  <div :class="{ sm: dense, disabled: isDisabled }" class="tce-jodit-html">
    <div
      v-if="!isFocused && !content && showPlaceholder"
      class="jodit-html-placeholder">
      <div class="placeholder-avatar">
        <span>&lt;</span>
        <span class="divider">/</span>
        <span>&gt;</span>
      </div>
      <div class="message">
        <span class="heading">HTML component</span>
        <span v-if="!dense">Select to edit</span>
      </div>
    </div>
    <template v-else>
      <jodit-editor
        v-if="isFocused"
        v-model="content"
        :min-height="$el.clientHeight"
        :readonly="readonly" />
      <div v-else class="jodit-container">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="jodit-wysiwyg" v-html="content"></div>
      </div>
    </template>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import JoditEditor from './Editor.vue';

export default {
  name: 'tce-jodit-html',
  props: {
    element: { type: Object, required: true },
    isFocused: { type: Boolean, default: false },
    isDragged: { type: Boolean, default: false },
    isDisabled: { type: Boolean, default: false },
    dense: { type: Boolean, default: false },
    showPlaceholder: { type: Boolean, default: true }
  },
  data: vm => ({
    content: vm.element?.data?.content ?? '',
    readonly: false
  }),
  computed: {
    hasChanges() {
      const previousValue = this.element?.data?.content ?? '';
      return previousValue !== this.content;
    }
  },
  methods: {
    save() {
      if (!this.hasChanges) return;
      const { element, content } = this;
      this.$emit('save', { ...element.data, content });
    }
  },
  watch: {
    element(val) {
      // Make sure that component state is kept
      // until events (i.e. focusout => save) are triggered
      setTimeout(() => {
        if (this.isFocused) return;
        this.content = val?.data?.content ?? '';
      }, 0);
    },
    isFocused(val, oldVal) {
      if (oldVal && !val) this.save();
    },
    isDragged(state, oldState) {
      if (state) {
        this.readonly = true;
      } else if (!state && oldState) {
        this.readonly = false;
      }
    },
    content: debounce(function () {
      this.save();
    }, 4000)
  },
  components: {
    JoditEditor
  }
};
</script>

<style lang="scss" scoped>
$min-width: 11.25rem;
$min-height: 8.75rem;
$min-height-sm: 5.5rem;
$border-size: 6px;
$tooltip-color: #37474f;

.jodit-container {
  min-width: $min-width;
  min-height: $min-height;
}

.tce-jodit-html ::v-deep {
  text-align: initial;

  .jodit-container {
    border: none;
  }

  .jodit-workplace, .jodit-wysiwyg {
    overflow: visible;
  }

  .jodit-wysiwyg {
    overflow-wrap: break-word;
  }

  .tce-jodit-tooltip {
    position: relative;
    display: inline-block;
    background: rgb(205 215 220 / 70%);
    text-decoration: underline dotted $tooltip-color;
    cursor: help;

    &::before {
      content: "";
      position: absolute;
      bottom: 100%;
      border-left: $border-size solid transparent;
      border-right: $border-size solid transparent;
      border-top: $border-size solid $tooltip-color;
    }

    &::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: calc(100% + #{$border-size} - 1px);
      left: -0.625rem;
      border-radius: 2px;
      min-width: 9.375rem;
      max-width: 18.75rem;
      padding: 0.375rem;
      background: $tooltip-color;
      font-size: 0.9em;
      text-align: center;
      color: #fff;
    }

    &::before, &::after {
      visibility: hidden;
      opacity: 0;
      transition:
        opacity 0.1s ease-out,
        margin 0.1s ease-out;
    }

    &:hover::after, &:hover::before {
      visibility: visible;
      opacity: 1;
      margin-bottom: 0.25rem;
    }
  }
}

::v-deep .jodit-container:not(.jodit-inline) {
  min-height: $min-height;
  background: transparent !important;
  font-size: 1rem;
}

.jodit-html-placeholder {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 0;
  min-height: $min-height;
  padding: 0.5rem 0 0;

  .placeholder-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 3.75rem;
    height: 3.75rem;
    padding-top: 0.125rem;
    background: #263238;
    font-size: 2rem;
    line-height: 2rem;
    color: #f1f1f1;

    .divider {
      font-size: 0.75rem;
    }
  }

  .message {
    padding: 0.5rem 0;
    font-size: 1rem;
    line-height: 1.75rem;
    font-family: Roboto, sans-serif;
    font-weight: 400;
    text-align: center;

    span {
      display: block;
    }

    .heading {
      padding: 0.5rem 0;
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }
}

.tce-jodit-html.disabled {
  .placeholder-avatar {
    background: #424242;
  }

  .message {
    color: #424242;
  }
}

.tce-jodit-html.sm {
  .jodit-container {
    min-height: $min-height-sm;
  }

  ::v-deep .jodit-container:not(.jodit-inline) {
    min-height: $min-height-sm;
  }

  .jodit-html-placeholder {
    min-height: $min-height-sm;

    .placeholder-avatar {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1.25rem;
      font-weight: 500;
    }

    .message {
      padding: 0;
    }

    .heading {
      padding: 0.5rem 0 0;
      font-size: 0.875rem !important;
      line-height: 1.25rem;
      font-weight: 500;
    }
  }
}
</style>
