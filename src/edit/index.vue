<template>
  <div class="tce-jodit-html">
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
        <span>Select to edit</span>
      </div>
    </div>
    <template v-else>
      <jodit-editor
        v-if="isFocused"
        v-model="content"
        :min-height="$el.clientHeight"
        :readonly="readonly" />
      <div v-else class="jodit_container">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="jodit_wysiwyg" v-html="content"></div>
      </div>
    </template>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import JoditEditor from '@/edit/Editor';

export default {
  name: 'tce-jodit-html',
  props: {
    element: { type: Object, required: true },
    isFocused: { type: Boolean, default: false },
    isDragged: { type: Boolean, default: false },
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
      this.$emit('save', { content: this.content });
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
$min-width: 180px;
$min-height: 140px;
$borderSize: 6px;
$tooltipColor: #455a64;

.tce-jodit-html ::v-deep {
  text-align: initial;

  .jodit_workplace, .jodit_wysiwyg {
    overflow: visible;
  }

  .jodit_wysiwyg {
    overflow-wrap: break-word;
  }

  .tce-jodit-tooltip {
    display: inline-block;
    position: relative;
    background: rgba(205, 215, 220, 0.7);
    text-decoration: underline dotted $tooltipColor;
    cursor: help;

    &::before {
      content: "";
      position: absolute;
      bottom: 100%;
      border-left: $borderSize solid transparent;
      border-right: $borderSize solid transparent;
      border-top: $borderSize solid $tooltipColor;
    }

    &::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: calc(100% + #{$borderSize} - 1px);
      left: -10px;
      min-width: 150px;
      max-width: 300px;
      padding: 5px;
      text-align: center;
      color: #fff;
      font-size: 0.9em;
      background: $tooltipColor;
      border-radius: 2px;
    }

    &::before, &::after {
      visibility: hidden;
      transition:
        opacity 0.1s ease-out,
        margin 0.1s ease-out;
      opacity: 0;
    }

    &:hover::after, &:hover::before {
      visibility: visible;
      margin-bottom: 3px;
      opacity: 1;
    }
  }
}

.placeholder-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.75rem;
  height: 3.75rem;
  padding-top: 0.125rem;
  color: #f1f1f1;
  font-size: 2rem;
  line-height: 2rem;
  background: #263238;
  border-radius: 50%;

  .divider {
    font-size: 0.75rem;
  }
}

.jodit-html-placeholder {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: $min-height;
  margin-bottom: 0;
  padding: 0.5rem 0 0;
}

.jodit_container {
  min-width: $min-width;
  min-height: $min-height;
}

.jodit-html-placeholder .message {
  padding: 0.5rem 0;
  text-align: center;
  font-family: Roboto, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.75rem;

  span {
    display: block;
  }

  .heading {
    padding: 0.5rem 0;
    font-size: 1.5rem;
    line-height: 2rem;
  }
}

::v-deep .jodit_container:not(.jodit_inline) {
  min-height: $min-height;
  font-size: 16px;
}
</style>
