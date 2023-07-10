<template>
  <div :id="id" class="jodit-toolbar-editor-collection_container"></div>
</template>

<script>
const id = 'joditToolbar';

const buttons = [[
  ['source', 'Source']
], [
  ['undo', 'Undo'],
  ['redo', 'Redo'],
  ['cut', 'Cut selection'],
  ['copyformat', 'Paint format']
], [
  ['paragraph', 'Style'],
  ['font', 'Font'],
  ['fontsize', 'Font size']
], [
  ['bold', 'Bold'],
  ['italic', 'Italic'],
  ['underline', 'Underline'],
  ['strikethrough', 'Strikethrough']
], [
  ['brush', 'Text color']
], [
  ['link', 'Insert link...'],
  ['table', 'Insert table'],
  ['image', 'Image'],
  ['tooltip', 'Tooltip'],
  ['symbol', 'Insert special character'],
  ['hr', 'Horizontal line']
], [
  ['ol', 'Numbered list'],
  ['ul', 'Bulleted list'],
  ['outdent', 'Decrease indent'],
  ['indent', 'Increase indent']
], [
  ['align', 'Alignment']
], [
  ['subscript', 'Subscript'],
  ['superscript', 'Superscript']
], [
  ['eraser', 'Clear formatting']
]];

export default {
  get $containerId() {
    return `#${id}`;
  },
  get $buttons() {
    return buttons;
  },
  computed: {
    id: () => id,
    buttons: () => buttons
  }
};
</script>

<style lang="scss">
$icon-color: #333;
$icon-accent-color: #ff6590;
$icon-size: 20px;
$text-size: 16px;
$font-family-secondary: Roboto, Helvetica, Arial, sans-serif;

.jodit-toolbar-editor-collection_container {
  min-height: 72px;
}

.jodit-toolbar-editor-collection {
  margin: 0 !important;
  box-shadow: none;
  border: none;
  padding: 0 !important;
  background: none !important;
  font-size: $text-size;
  line-height: $text-size;
  font-family: $font-family-secondary;
  text-align: initial;

  &_mode_horizontal {
    padding: 20px 12px 0 !important;
  }

  .jodit-ui-group {
    .jodit-toolbar-button {
      min-width: 30px;
      line-height: 100%;

      &:focus {
        outline: none;
      }

      .jodit-icon {
        display: inline-block;
        width: $icon-size;
        height: $icon-size;
        font-size: $icon-size;
        line-height: $icon-size;
        color: $icon-color;
        vertical-align: top;

        &.stack {
          position: relative;
        }

        .stacked {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          line-height: 100%;
          text-align: center;
        }
      }
    }
  }
}

/* stylelint-disable-next-line  */
.jodit-toolbar-editor-collection .jodit-toolbar-button {
  @mixin colorize($color, $background: none) {
    background: $background;
    color: $color;

    & > button {
      background: inherit;
      color: inherit;
    }

    .jodit-icon {
      color: inherit;
    }

    // dropdown chevrons
    .jodit-toolbar-button__trigger svg {
      fill: currentColor;
    }
  }

  transition: all 0.2s linear, opacity 0.1s linear;

  &_with-trigger_true {
    border: none;
    padding: 0 5px;

    .jodit-toolbar-button__trigger {
      opacity: 1;
      background: none;

      svg {
        fill: currentColor;
      }
    }
  }
  /* stylelint-disable-next-line  */
  &:active {
    &:not([disabled]) {
      @include colorize(
        $color: $icon-accent-color,
        $background: lighten($icon-accent-color, 25%)
      );
    }
  }
  /* stylelint-disable-next-line  */
  &:hover {
    &:not([disabled]) {
      background-color: transparent;
      @include colorize($color: $icon-accent-color);
    }
  }

  &[aria-pressed="true"] {
    &:not([disabled]) {
      @include colorize(
        $color: $icon-accent-color,
        $background: lighten($icon-accent-color, 25%)
      );
    }
  }

  &.popup_open, &.popup_open:hover {
    @include colorize($color: #c3c3c3);
  }

  &.jodit-toolbar-button-separator {
    min-width: 0;
  }

  & > a .jodit-with_dropdownlist-trigger {
    vertical-align: top;
  }

  .picker_label {
    display: inline-block;
    height: $icon-size;
    line-height: $icon-size;

    .mdi {
      display: none;
    }
  }

  // TODO: Remove after bootstrap gets removed!
  blockquote {
    border: none;
  }
}

.jodit-toolbar-editor-collection_list > .jodit-toolbar-editor-collection {
  &, & .jodit-toolbar-editor-collection {
    box-shadow: rgb(0 0 0 / 20%) 0 2px 8px;
    border: 1px solid #ccc;
    padding: 0 !important;
    background: #fff;
  }

  .jodit-toolbar-button > button {
    padding: 8px 16px;

    .jodit-toolbar-button-left & {
      padding: 8px 12px;
    }
  }
}

.jodit-colorpicker > div {
  margin-bottom: 8px;
}

.jodit-colorpicker .btn_reset_color {
  width: auto;

  &:active, &:hover {
    background: none;
    color: $icon-accent-color;
  }

  span {
    float: none;
  }

  & > span {
    display: inline-block;
    height: $icon-size;
    line-height: $icon-size;

    &:focus {
      outline: none;
    }

    span.jodit-icon {
      color: inherit;
    }
  }
}

.jodit-colorpicker .selected_color_marker {
  &::before {
    display: none;
  }
  /* stylelint-disable-next-line  */
  svg {
    display: none;
  }
}

.jodit-toolbar-editor-collection_popup {
  margin-top: 6px;
}

.jodit-toolbar-button_tooltip {
  /* stylelint-disable-next-line  */
  .jodit-toolbar-button__icon {
    display: block;
    width: 20px;
    height: 20px;
    font-size: 20px;
  }

  .jodit-toolbar-button__text {
    display: none;
  }
}
</style>
