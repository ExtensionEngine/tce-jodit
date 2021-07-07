'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('jodit/build/jodit.min.css');
var debounce = require('lodash/debounce');
var joditVue = require('jodit-vue');
var autoBind = require('auto-bind');
var cloneDeep = require('lodash/cloneDeep');
var keysIn = require('lodash/keysIn');
var uniqueId = require('lodash/uniqueId');
var ace = require('brace');
var beautify = require('js-beautify/js/src/html');
require('brace/mode/html');
require('brace/theme/chrome');
var scrollparent = require('scrollparent');
var isFunction$2 = require('lodash/isFunction');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);
var autoBind__default = /*#__PURE__*/_interopDefaultLegacy(autoBind);
var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);
var keysIn__default = /*#__PURE__*/_interopDefaultLegacy(keysIn);
var uniqueId__default = /*#__PURE__*/_interopDefaultLegacy(uniqueId);
var ace__default = /*#__PURE__*/_interopDefaultLegacy(ace);
var beautify__default = /*#__PURE__*/_interopDefaultLegacy(beautify);
var scrollparent__default = /*#__PURE__*/_interopDefaultLegacy(scrollparent);
var isFunction__default = /*#__PURE__*/_interopDefaultLegacy(isFunction$2);

var name = "@extensionengine/tce-jodit";
var version = "1.0.0";
var tailor = {
	label: "Html",
	type: "JODIT_HTML",
	ui: {
		icon: "mdi-text",
		forceFullWidth: false
	}
};

/** @typedef {import('jodit').IJodit} Jodit */

class AutofocusPlugin {
  static get pluginName() {
    return 'autofocus';
  }

  constructor(options) {
    options.readyEvent = options.readyEvent || 'joditReady';
    options.cursorStyle = options.cursorStyle || 'auto';
    autoBind__default['default'](this);
  }
  /**
   * @param {Jodit} jodit
   */


  init(jodit) {
    jodit.editor.style.cursor = this.options.cursorStyle;
  }
  /**
   * @param {Jodit} jodit
   */


  afterInit(jodit) {
    setTimeout(() => {
      jodit.selection.focus();
      jodit.events.fire(this.options.readyEvent);
    }, 0);
  }

}

const isString$1 = arg => typeof arg === 'string';

const splitArray$1 = arg => isString$1(arg) ? arg.split(/[,\s]+/) : arg;
/** @typedef {import('jodit/src/Config').Config & import('jodit/src/plugins')} Config */

/** @typedef {import('jodit').IJodit} Jodit */


class ExternalToolbarPlugin {
  static get pluginName() {
    return 'external-toolbar';
  }

  constructor(options) {
    options.readyEvent = options.readyEvent || 'ready';
    autoBind__default['default'](this);
  }
  /**
   * @param {Config} config
   */


  apply(config) {
    config.toolbar = false;
    this.options.buttons = splitArray$1(config.buttons).concat(config.extraButtons);
  }
  /**
   * @param {Jodit} jodit
   */


  init(jodit) {
    jodit.setPanel(this.options.toolbarContainer);
  }

}

const JODIT_CONTROL_FONT = 'font';
const JODIT_CONTROL_FONTSIZE = 'fontsize';
const JODIT_CONTROL_PARAGRAPH_STYLE = 'paragraph';

const isEmpty = el => !el.innerHTML;

const find = (arr, cb, defVal) => arr.find(cb) || defVal;
/** @typedef {import('jodit/src/Config').Config & import('jodit/src/plugins')} Config */

/** @typedef {import('jodit').IJodit} Jodit */

/** @typedef {import('jodit').IToolbarButton} Button */

/** @typedef {import('jodit').IControlType<Jodit,Button} Control */


class FontControlsPlugin {
  static get pluginName() {
    return 'font-controls';
  }

  constructor(options) {
    options.defaultFontFamily = options.defaultFontFamily || 'Sans Serif';
    options.defaultFontSize = options.defaultFontSize || 16;
    /* px */

    options.defaultParagraphStyle = options.defaultParagraphStyle || 'Normal';
    options.pickerLabelClass = options.pickerLabelClass || 'picker_label';
    autoBind__default['default'](this);
  }
  /**
   * @param {Config} config
   */


  apply({
    controls
  }) {
    let control;

    if (control = controls[JODIT_CONTROL_FONT]) {
      Object.assign(control, {
        defaultValue: this.options.defaultFontFamily,
        getLabel: this.getLabel
      });
    }

    if (control = controls[JODIT_CONTROL_FONTSIZE]) {
      Object.assign(control, {
        defaultValue: this.options.defaultFontSize,
        getLabel: this.getLabel
      });
    }

    if (control = controls[JODIT_CONTROL_PARAGRAPH_STYLE]) {
      Object.assign(control, {
        defaultValue: this.options.defaultParagraphStyle,
        getLabel: this.getLabel
      });
    }
  }
  /**
   * @param {Jodit} jodit
   * @param {Control} control
   * @param {Button} button
   */


  getLabel(jodit, control, button) {
    const entry = this.getActiveEntry(jodit, control, control.defaultValue);
    const [, key] = entry;
    const icon = button.createIcon(control.icon, control);
    const label = document.createElement('span');
    label.classList.add(this.options.pickerLabelClass);
    label.appendChild(icon);
    label.innerHTML += key;
    button.textBox.innerHTML = '';
    button.textBox.appendChild(label);
    return false;
  }
  /**
   * @param {Jodit} jodit
   * @param {Control} control
   * @returns {[*, String]}
   */


  getActiveEntry(jodit, control, defaultValue) {
    if (!jodit.isInited) return [null, defaultValue];
    const entries = Object.entries(control.list);
    const entry = entries.find(args => control.isActiveChild(jodit, {
      args
    }));
    if (entry) return entry;
    if (isEmpty(jodit.editor)) return [null, defaultValue];

    if (control.name === JODIT_CONTROL_FONT) {
      const {
        fontFamily: currentFontFamily
      } = getComputedStyle(jodit.editor);
      return find(entries, ([fontFamily]) => {
        return normalize.fontFamily(fontFamily) === currentFontFamily;
      }, [null, defaultValue]);
    }

    if (control.name === JODIT_CONTROL_FONTSIZE) {
      const {
        fontSize: currentFontSize
      } = getComputedStyle(jodit.editor);
      return find(entries, ([_, fontSize]) => {
        return fontSize === normalize.fontSize(currentFontSize);
      }, [null, defaultValue]);
    }

    if (control.name === JODIT_CONTROL_PARAGRAPH_STYLE) {
      return find(entries, ([_, style]) => {
        return style.toLowerCase() === 'normal';
      }, [null, defaultValue]);
    }
  }

}

const normalize = (() => {
  const span = document.createElement('span');
  return {
    fontFamily(str) {
      span.style.fontFamily = str;
      return span.style.fontFamily;
    },

    fontSize(str) {
      return String(parseFloat(str));
    }

  };
})();

const mdiIcons = {
  source: 'code-tags',
  bold: 'format-bold',
  strikethrough: 'format-strikethrough',
  underline: 'format-underline',
  italic: 'format-italic',
  superscript: 'format-superscript',
  subscript: 'format-subscript',
  ul: 'format-list-bulleted',
  ol: 'format-list-numbered',
  outdent: 'format-indent-decrease',
  indent: 'format-indent-increase',
  font: 'format-font',
  fontsize: 'format-size',
  paragraph: 'format-pilcrow',
  image: 'image-plus',
  tooltip: 'tooltip-text',
  file: 'file-plus',
  video: 'video-plus',
  table: 'table-plus',
  link: 'link',

  /* align */
  ...{
    left: 'format-align-left',
    center: 'format-align-center',
    right: 'format-align-right',
    justify: 'format-align-justify'
  },
  undo: 'undo',
  redo: 'redo',
  cut: 'content-cut',
  hr: 'minus',
  eraser: 'format-clear',
  copyformat: 'format-paint',

  /* symbol */
  omega: 'omega',
  // NOTE: `fullsize` icon can NOT be changed!
  // fullsize: 'arrow-expand-all',

  /* selectall */
  'select-all': 'select-all',
  print: 'printer',
  dots: 'dots-vertical',
  cancel: 'close',
  // popup toolbar icons
  valign: 'format-align-top',
  splitv: 'format-columns',
  merge: 'table-merge-cells',
  addcolumn: 'table-column-plus-after',
  addrow: 'table-row-plus-after',
  bin: 'trash-can',
  eye: 'eye',
  unlink: 'link-off',
  pencil: 'pencil'
};
const textColor = `
  <span class="icon stack">
    <span class="icon stacked mdi mdi-format-color-text"></span>
    <span class="icon stacked mdi mdi-color-helper"></span>
    <svg width="0" height="0" style="display: none;"></svg>
  </span>`;
function getMdiIcon(name) {
  if (!name || !mdiIcons[name]) return;
  if (name === 'brush') return textColor;
  const code = mdiIcons[name];
  return `<span class="mdi mdi-${code}"></span>`;
}

const CSS_NO_COLOR = '';
const JODIT_COLORPICKER = '.jodit_colorpicker';
const JODIT_COMMAND_BACKGROUND_COLOR = 'background';
const JODIT_COMMAND_TEXT_COLOR = 'forecolor';
const JODIT_CONTROL_ALIGN = 'align';
const JODIT_CONTROL_COLOR = 'brush';
const JODIT_DEFAULT_EVENT_NAMESPACE$2 = 'JoditEventDefaultNamespace';
const JODIT_PICKER_SELECTION_EVENTS = ['mousedown', 'touchend'];

const noop = () => {};
/** @typedef {import('jodit/src/Config').Config & import('jodit/src/plugins')} Config */

/** @typedef {import('jodit').IJodit} Jodit */

/** @typedef {import('jodit').IToolbarButton} Button */

/** @typedef {import('jodit').IControlType<Jodit,Button} Control */

/** @typedef {import('jodit').IEventsNative} Events */

/**
 * @typedef {Object} ColorPickers
 * @property {HTMLElement} textColor
 * @property {HTMLElement} backgroundColor
 * @property {HTMLElement} [borderColor]
 */


class MdiIconsPlugin {
  static get pluginName() {
    return 'mdi-icons';
  }

  constructor(options) {
    options.btnResetColorClass = options.btnResetColorClass || 'btn_reset_color';
    options.selectedMarkerClass = options.selectedMarkerClass || 'selected_color_marker';
    autoBind__default['default'](this);
  }
  /**
   * @param {HTMLElement} el
   * @returns {boolean}
   */


  isResetButton(el) {
    return el.classList.contains(this.options.btnResetColorClass);
  }
  /**
  * @param {Config} config
  */


  apply({
    controls,
    popup
  }) {
    const self = this;
    let control;

    if (control = controls[JODIT_CONTROL_ALIGN]) {
      const {
        getLabel = noop
      } = control;

      control.getLabel = function () {
        const result = getLabel.apply(this, arguments);
        self.getAlignmentLabel(...arguments);
        return result;
      };
    }

    if (control = controls[JODIT_CONTROL_COLOR]) {
      const {
        getLabel = noop
      } = control;

      control.getLabel = function () {
        const result = getLabel.apply(this, arguments);
        self.getColorLabel(...arguments);
        return result;
      };

      const {
        popup: createPopup = noop
      } = control;

      control.popup = function () {
        const popup = createPopup.apply(this, arguments);
        if (!popup) return popup;
        return self.colorPopup(popup, ...arguments);
      };
    }

    if (Array.isArray(popup.table)) {
      control = popup.table.find(it => it.name === JODIT_CONTROL_COLOR);

      if (control) {
        const {
          popup: createPopup = noop
        } = control;

        control.popup = function () {
          const popup = createPopup.apply(this, arguments);
          if (!popup) return popup;
          return self.inlineColorPopup(popup, ...arguments);
        };
      }
    }
  }
  /**
  * @param {Jodit} jodit
  * @param {Control} control
  * @param {Button} button
  */


  getAlignmentLabel(jodit, control, button) {
    // Show current alignment inside button label.
    const currentValue = control.data && control.data.currentValue;
    if (!currentValue) return;
    button.textBox.innerHTML = '';
    button.textBox.appendChild(button.createIcon(currentValue, control));
  }
  /**
  * @param {Jodit} jodit
  * @param {Control} control
  * @param {Button} button
  */


  getColorLabel(jodit, control, button) {
    // Colorize material design `color-helper` icon.
    const colorHelper = button.textBox.querySelector('.mdi-color-helper');
    const svg = button.textBox.querySelector('svg');
    if (!colorHelper || !svg) return;
    colorHelper.style.color = svg.style.fill;
  }
  /**
   * @param {HTMLElement} popup
   * @param {Jodit} jodit
   * @param {Node} current
   * @param {Control} control
   * @param {Function} close
   */


  colorPopup(popup, jodit, current, control, close = noop) {
    const {
      events,
      options
    } = jodit;
    const pickers = getColorPickers(popup, {
      defaultTab: options.colorPickerDefaultTab
    }); // Add reset color buttons to main toolbar's colorpicker/s.

    onSelect(events, this.addResetButton(pickers.textColor), () => {
      jodit.execCommand(JODIT_COMMAND_TEXT_COLOR, false, CSS_NO_COLOR);
      close();
    });
    onSelect(events, this.addResetButton(pickers.backgroundColor), () => {
      jodit.execCommand(JODIT_COMMAND_BACKGROUND_COLOR, false, CSS_NO_COLOR);
      close();
    });
    return popup;
  }
  /**
  * @param {HTMLElement} popup
  * @param {Jodit} jodit
  * @param {HTMLTableElement} table
  */


  inlineColorPopup(popup, jodit, table) {
    const self = this;
    const {
      constructor: Jodit,
      events
    } = jodit;
    const pickers = getColorPickers(popup, {
      defaultTab: 'background'
    });
    pickers.forEach(picker => {
      const selected = picker.querySelector('.active');
      if (selected) this.changeSelectedMarker(selected);
      const [eventDesc] = events.getStore(picker).get(JODIT_PICKER_SELECTION_EVENTS[0], JODIT_DEFAULT_EVENT_NAMESPACE$2);
      const oldListener = eventDesc && eventDesc.originalCallback;
      if (!oldListener) return;
      replaceListener$1(jodit, picker, JODIT_PICKER_SELECTION_EVENTS.join(' '), newListener, oldListener);

      function newListener(e) {
        oldListener.apply(this, arguments);
        self.onColorChange(e, picker);
      }
    }); // Add reset color buttons to inline toolbar's colorpicker/s.

    onSelect(events, this.addResetButton(pickers.textColor), () => {
      const selectedCells = Jodit.modules.Table.getAllSelectedCells(table);
      selectedCells.forEach(cell => cell.style.color = CSS_NO_COLOR);
      jodit.setEditorValue();
    });
    onSelect(events, this.addResetButton(pickers.backgroundColor), () => {
      const selectedCells = Jodit.modules.Table.getAllSelectedCells(table);
      selectedCells.forEach(cell => cell.style.backgroundColor = CSS_NO_COLOR);
      jodit.setEditorValue();
    });
    onSelect(events, this.addResetButton(pickers.borderColor), () => {
      const selectedCells = Jodit.modules.Table.getAllSelectedCells(table);
      selectedCells.forEach(cell => cell.style.borderColor = CSS_NO_COLOR);
      jodit.setEditorValue();
    });
    return popup;
  }
  /**
   * @param {Event} e
   * @param {HTMLElement} picker
   */


  onColorChange(e, picker) {
    const {
      constructor: Jodit
    } = this.jodit;
    const button = Jodit.modules.Dom.up(e.target, el => el.matches('[data-color]'), picker);
    if (!button) return;
    const selected = picker.querySelector('.active');
    if (!selected) return;

    if (this.isResetButton(button)) {
      selected.classList.remove('active');
      selected.innerHTML = '';
      return;
    }

    this.changeSelectedMarker(selected);
  }
  /**
   * @param {HTMLElement} picker
   * @return {HTMLSpanElement}
   */


  addResetButton(picker) {
    const btnResetColor = picker && Array.from(picker.children).filter(el => el.matches('a')).pop();
    if (!btnResetColor) return document.createElement('span');
    btnResetColor.classList.add(this.options.btnResetColorClass);
    btnResetColor.innerHTML = '';
    const tabIndex = this.jodit.options.allowTabNavigation ? 0 : -1;
    btnResetColor.appendChild(createButton({
      icon: 'mdi-water-off',
      text: 'None',
      tabIndex
    }));
    return btnResetColor;
  }
  /**
   * @param {HTMLAnchorElement} selected
   */


  changeSelectedMarker(selected) {
    // Swap eye icon marking selected color with colorized bullet.
    selected.classList.add(this.options.selectedMarkerClass);
    const svg = selected.querySelector('svg');
    const circle = createIcon('mdi-circle');
    Object.assign(circle.style, {
      color: svg.style.fill,
      fontSize: '8px'
    });
    selected.appendChild(circle);
  }
  /**
   * @param {Jodit} jodit
   */


  init({
    events
  }) {
    events.on('getIcon', getMdiIcon);
  }
  /**
   * @param {Jodit} jodit
   */


  beforeDestruct(jodit) {
    jodit.events.off('getIcon', getMdiIcon);
  }

}
/**
 * @param {HTMLElement} popup
 * @param {Object} options
 * @param {String} options.defaultTab
 * @returns {ColorPickers}
 */

function getColorPickers(popup, {
  defaultTab
}) {
  const pickers = Array.from(popup.querySelectorAll(JODIT_COLORPICKER));
  if (pickers.length <= 0) return pickers;
  let textColor, backgroundColor, borderColor;

  if (defaultTab === 'background') {
    [backgroundColor, textColor, borderColor] = pickers;
  } else if (defaultTab === 'color') {
    [textColor, backgroundColor, borderColor] = pickers;
  }

  return Object.assign(pickers, {
    textColor,
    backgroundColor,
    borderColor
  });
}
/**
 * @param {Events} events
 * @param {Object} target
 * @param {EventListener} listener
 */


function onSelect(events, target, listener) {
  return events.on(target, JODIT_PICKER_SELECTION_EVENTS.join(' '), listener);
}
/**
 * @param {Jodit} jodit
 * @param {Object} target
 * @param {String} events
 * @param {EventListener} listener
 * @param {EventListener} oldListener
 */


function replaceListener$1(jodit, target, events, listener, oldListener) {
  jodit.events.off(target, events, oldListener).on(target, events, listener);
}
/**
 * @param {Object} options
 * @param {String} options.icon
 * @param {String} options.text
 * @param {Number} [options.tabIndex=0]
 * @returns {HTMLSpanElement}
 */


function createButton({
  icon,
  text,
  tabIndex = 0
}) {
  const btn = document.createElement('span');
  btn.tabIndex = tabIndex;
  btn.setAttribute('role', 'button');
  btn.appendChild(createIcon(icon));
  btn.innerHTML += text;
  return btn;
}
/**
 * @param {String} name
 * @returns {HTMLSpanElement}
 */

function createIcon(name) {
  const icon = document.createElement('span');
  icon.classList.add('jodit_icon', 'mdi', name);
  return icon;
}

const isFunction$1 = arg => typeof arg === 'function';

const isString = arg => typeof arg === 'string';

const splitArray = arg => isString(arg) ? arg.split(/[,\s]+/) : arg;
/** @typedef {import('jodit/src/Config').Config & import('jodit/src/plugins')} Config */

/** @typedef {import('jodit').IJodit} Jodit */


class PluginProxy {
  /**
   * @param {Object} plugin
   * @param {Jodit} jodit
   */
  constructor(plugin, jodit) {
    this._plugin = plugin;
    this.jodit = jodit;
    autoBind__default['default'](this);
    jodit.attachEvents({
      afterInit: this.afterInit,
      beforeDestruct: this.beforeDestruct
    });
  }

  afterInit() {
    if (!isFunction$1(this._plugin.afterInit)) return;

    this._plugin.afterInit(this.jodit);
  }

  beforeDestruct() {
    this.jodit.events.off('beforeDestruct', this.beforeDestruct);
    if (!isFunction$1(this._plugin.beforeDestruct)) return;

    this._plugin.beforeDestruct(this.jodit);
  }

  destruct() {
    if (!isFunction$1(this._plugin.destruct)) return;

    this._plugin.destruct();
  }

}

function extend(Jodit) {
  /**
   * @param {Config} config
   */
  Jodit.prototype.$applyPlugins = function (config) {
    const {
      plugins = []
    } = config;
    const disablePlugins = splitArray(config.disablePlugins);
    this.__plugins = this.__plugins = {};
    this.$plugins = new Map();
    plugins.forEach(({
      use: Plugin,
      options = {}
    }) => {
      const {
        pluginName
      } = Plugin;
      if (disablePlugins.includes(pluginName)) return; // Create plugin instance with provided options.

      const plugin = new Plugin(options);
      plugin.options = options;
      this.$plugins.set(pluginName, plugin);
      this.__plugins[uniqueId__default['default']('plugin_proxy__')] = new PluginProxy(plugin, this); // Apply plugin on jodit options.

      if (isFunction$1(plugin.apply)) plugin.apply(config, Jodit);
    });
  };

  Object.defineProperty(Jodit.prototype, 'options', {
    enumerable: true,
    configurable: false,

    get() {
      return this.$options;
    },

    set(options = {}) {
      if (this.isJodit) {
        options = cloneOptions(options);
        this.$applyPlugins(options);
      }

      this.$options = options;
    }

  });
  const {
    afterInitHook
  } = Jodit.prototype;

  Jodit.prototype.afterInitHook = function () {
    this.$plugins.forEach(plugin => {
      if (isFunction$1(plugin.init)) plugin.init(this, plugin.options);
      plugin.jodit = this;
    });
    return afterInitHook.apply(this, arguments);
  };
}

function cloneOptions(options) {
  const shared = ['ownerDocument', 'ownerWindow'];
  return Object.fromEntries(keysIn__default['default'](options).map(key => {
    const value = options[key];
    if (shared.includes(key)) return [key, value];
    return [key, cloneDeep__default['default'](value)];
  }));
}

// NOTE: `brace` is browserify compatible ACE wrapper.

window.ace = ace__default['default'];
/** @typedef {import('jodit/src/Config').Config & import('jodit/src/plugins')} Config */

/** @typedef {import('jodit').IJodit} Jodit */

class SourceEditorPlugin {
  static get pluginName() {
    return 'source-editor';
  }

  constructor(options) {
    options.theme = options.theme || 'ace/theme/chrome';
    autoBind__default['default'](this);
  }
  /**
   * @param {Config} config
   */


  apply(config) {
    config.sourceEditorNativeOptions = config.sourceEditorNativeOptions || {};
    Object.assign(config.sourceEditorNativeOptions, {
      mode: 'ace/mode/html',
      theme: this.options.theme
    });
  }
  /**
   * @param {Jodit} jodit
   */


  init(jodit) {
    if (jodit.options.beautifyHTML) {
      // NOTE: Unfortunately jodit gets beautify function from window global. :(
      window.html_beautify = beautify__default['default'];
    }

    jodit.events.on('aceInited', this.onAceEditorReady);
  }

  onAceEditorReady() {
    const {
      source
    } = this.jodit.__plugins;
    /** @type {import('brace').Editor} */

    const aceEditor = source.aceEditor;
    aceEditor.setShowPrintMargin(false);
  }
  /**
   * @param {Jodit} jodit
   */


  beforeDestruct(jodit) {
    jodit.events.off('aceInited', this.onAceEditorReady);
  }

}

const JODIT_RECALC_POPUP_POSITION_EVENT = 'recalcPositionPopup';
const JODIT_DEFAULT_EVENT_NAMESPACE$1 = 'JoditEventDefaultNamespace';
/** @typedef {import('jodit').IJodit} Jodit */

class TablePopupsPlugin {
  static get pluginName() {
    return 'table-popups';
  }

  constructor() {
    autoBind__default['default'](this);
  }
  /**
   * @param {Jodit} jodit
   */


  init(jodit) {
    const self = this;
    const {
      afterInitHook
    } = jodit;

    jodit.afterInitHook = function () {
      afterInitHook.apply(this, arguments);
      self.observeTables(jodit);
      self.scrollContainer = scrollparent__default['default'](jodit.container);
      if (self.scrollContainer) self.addScrollHandler(jodit);
    };
  }
  /**
   * @param {Jodit} jodit
   */


  observeTables(jodit) {
    const {
      constructor: Jodit
    } = jodit;
    const {
      table
    } = jodit.__plugins;
    const {
      $$: query
    } = Jodit.modules.Helpers;
    query('table', jodit.editor).forEach(tableEl => {
      if (table[table.__key]) return;
      table.observe(tableEl);
    });
  }
  /**
   * @param {Jodit} jodit
   */


  addScrollHandler(jodit) {
    const [eventDesc] = jodit.events.getStore(jodit.events).get(JODIT_RECALC_POPUP_POSITION_EVENT, JODIT_DEFAULT_EVENT_NAMESPACE$1);
    const recalcPopupPosition = eventDesc && eventDesc.originalCallback;
    if (!recalcPopupPosition) return;
    this.scrollHandler = this.createScrollHandler(recalcPopupPosition);
    jodit.events.on(this.scrollContainer, 'scroll', this.scrollHandler);
  }
  /**
   * @param {Function} recalcPopupPosition
   */


  createScrollHandler(recalcPopupPosition) {
    return scrollHandler.bind(this);

    function scrollHandler() {
      const {
        inlinePopup
      } = this.jodit.__plugins;
      if (!inlinePopup || !inlinePopup.isShown) return;
      return recalcPopupPosition.call(inlinePopup);
    }
  }
  /**
   * @param {Jodit} jodit
   */


  beforeDestruct(jodit) {
    if (this.scrollContainer && this.scrollHandler) {
      jodit.events.off(this.scrollContainer, 'scroll', this.scrollHandler);
    }
  }

}

//
//
//
//
const id = 'joditToolbar';
const buttons = [[['source', 'Source']], [['undo', 'Undo'], ['redo', 'Redo'], ['cut', 'Cut selection'], ['copyformat', 'Paint format']], [['paragraph', 'Style'], ['font', 'Font'], ['fontsize', 'Font size']], [['bold', 'Bold'], ['italic', 'Italic'], ['underline', 'Underline'], ['strikethrough', 'Strikethrough']], [['brush', 'Text color']], [['link', 'Insert link...'], ['table', 'Insert table'], ['image', 'Image'], ['tooltip', 'Tooltip'], ['symbol', 'Insert special character'], ['hr', 'Horizontal line']], [['ol', 'Numbered list'], ['ul', 'Bulleted list'], ['outdent', 'Decrease indent'], ['indent', 'Increase indent']], [['align', 'Alignment']], [['subscript', 'Subscript'], ['superscript', 'Superscript']], [['eraser', 'Clear formatting']]];
var script$2 = {
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

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

/* script */
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "jodit-toolbar-editor-collection_container",
    attrs: {
      "id": _vm.id
    }
  });
};

var __vue_staticRenderFns__$2 = [];
/* style */

const __vue_inject_styles__$2 = undefined;
/* scoped */

const __vue_scope_id__$2 = undefined;
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var Toolbar = normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

/** @typedef {import('jodit').IJodit} Jodit */

class ToolbarBuilderPlugin {
  static get pluginName() {
    return 'toolbar-builder';
  }

  constructor(options) {
    options.buttons = options.buttons || [];
    options.separator = options.separator || '|';
    autoBind__default['default'](this);
  }
  /**
   * @param {Config} config
   * @param {*} Jodit
   */


  apply(config, Jodit) {
    const language = config.language || 'en';
    config.language = uniqueId__default['default'](`${language}_`);
    Jodit.lang[config.language] = cloneDeep__default['default'](Jodit.lang[language]);
    this.options.language = config.language;
    config.buttons = [];
    this.options.buttons.forEach(it => this.addGroup(config, Jodit, it));
  }

  addGroup(config, Jodit, controls = []) {
    const buttons = controls.reduce((acc, [name, tooltip]) => {
      const control = config.controls[name];
      const lang = Jodit.lang[this.options.language];
      if (!control) return acc;
      control.tooltip = control.tooltip || tooltip;
      Object.assign(lang, {
        [control.tooltip]: tooltip
      });
      Object.assign(control, {
        hotkeys: []
      });
      acc.push(name);
      return acc;
    }, []);

    if (config.buttons.length > 0 && buttons.length > 0) {
      config.buttons.push(this.options.separator);
    }

    config.buttons = config.buttons.concat(buttons);
  }

}

const JODIT_DEFAULT_EVENT_NAMESPACE = 'JoditEventDefaultNamespace';
const JODIT_POPUP_ARROW = '.jodit_popup_triangle';
const JODIT_POPUP_TRIGGER_EVENTS = ['mousedown', 'touchend'];
const JODIT_TOOLBAR_BUTTON = '.jodit_toolbar_btn';
const toggle = Symbol('toggle');

const hide = el => el.style.display = 'none';

const isToolbarButton = el => el.matches(JODIT_TOOLBAR_BUTTON);
/** @typedef {import('jodit/src/Config').Config & import('jodit/src/plugins')} Config */

/** @typedef {import('jodit').IJodit} Jodit */

/** @typedef {import('jodit').IComponent} Component */


class ToolbarPopupsPlugin {
  static get pluginName() {
    return 'toolbar-popups';
  }

  constructor(options) {
    options.popupOpenClass = options.popupOpenClass || 'popup_open';
    autoBind__default['default'](this);
    this.popups = new Map();
  }
  /**
   * @param {Jodit} jodit
   */


  init(jodit) {
    jodit.events.on('beforeOpenPopup', this.beforeOpenPopup);
  }
  /**
   * @param {Component} popup
   */


  beforeOpenPopup(popup) {
    const self = this;
    if (!isToolbarButton(popup.target)) return;
    hide(popup.container);
    this.popups.set(popup.target, popup);
    const {
      calcPosition,
      doClose
    } = popup;

    popup.calcPosition = function () {
      calcPosition.apply(this, arguments);
      self.onOpenPopup(popup);
    };

    popup.doClose = function () {
      doClose.apply(this, arguments);
      self.onClosePopup(popup);
    };

    const [eventDesc] = this.jodit.events.getStore(popup.target).get(JODIT_POPUP_TRIGGER_EVENTS[0], JODIT_DEFAULT_EVENT_NAMESPACE);
    const oldListener = eventDesc && eventDesc.originalCallback;
    if (!oldListener || oldListener[toggle]) return;
    replaceListener(this.jodit, popup.target, JODIT_POPUP_TRIGGER_EVENTS.join(' '), this.createToggleAction(popup.target, oldListener), oldListener);
  }
  /**
   * @param {Component} popup
   */


  onOpenPopup(popup) {
    popup.target.classList.add(this.options.popupOpenClass);
    const arrow = popup.container.querySelector(JODIT_POPUP_ARROW);
    if (arrow) arrow.style.marginLeft = 0;
    Object.assign(popup.container.style, {
      marginLeft: 0,
      display: 'initial'
    });
  }
  /**
   * @param {Component} popup
   */


  onClosePopup(popup) {
    this.popups.delete(popup.target, popup);
    popup.target.classList.remove(this.options.popupOpenClass);
  }
  /**
   * @param {Object} target
   * @param {EventListener} listener
   * @returns {EventListener}
   */


  createToggleAction(target, listener) {
    const self = this;
    return Object.assign(togglePopup, {
      [toggle]: true
    });

    function togglePopup() {
      const popup = self.popups.get(target);

      if (popup && popup.isOpened) {
        popup.close();
        return;
      }

      return listener.apply(this, arguments);
    }
  }
  /**
   * @param {Jodit} jodit
   */


  beforeDestruct(jodit) {
    jodit.events.off('beforeOpenPopup', this.beforeOpenPopup);
  }

}
/**
 * @param {Jodit} jodit
 * @param {Object} target
 * @param {String} events
 * @param {EventListener} listener
 * @param {EventListener} oldListener
 */

function replaceListener(jodit, target, events, listener, oldListener) {
  jodit.events.off(target, events, oldListener).on(target, events, listener);
}

const TOOLTIP_CONTROL = 'tooltip';
const TOOLTIP_TAG = 'span';
const TOOLTIP_ATTR = 'data-tooltip';
const TOOLTIP_CLASS = 'tce-jodit-tooltip';
const TOOLTIP_POPUP_FORM = `
  <form class="jodit-ui-form">
    <div class="jodit-ui-block jodit-ui-block_align_left jodit-ui-block_size_middle">
      <div class="jodit-ui-input">
        <span class="jodit-ui-input__label">Tooltip</span>
        <textarea name="tooltip" class="jodit-ui-input__input" rows="5" style="height: auto;"></textarea>
      </div>
    </div>
  <div class="jodit-ui-block jodit-ui-block_align_left jodit-ui-block_size_middle">
    <div class="jodit-ui-input">
      <span class="jodit-ui-input__label">Text</span>
      <input name="text" type="text" class="jodit-ui-input__input">
    </div>
  </div>
    <div class="jodit-ui-block jodit-ui-block_align_left jodit-ui-block_size_middle">
      <button class="jodit-ui-button jodit-ui-button_size_middle jodit-ui-button_unlink jodit-ui-button_status_default jodit-ui-button_text-icons_true" name="delete" type="button">Delete</button>
      <button class="jodit-ui-button jodit-ui-button_size_middle jodit-ui-button_insert jodit-ui-button_status_primary jodit-ui-button_text-icons_true" name="submit" type="submit">Submit</button>
    </div>
  </form>`;

const isTooltipNode = node => {
  if (!node || !isFunction__default['default'](node.hasAttribute)) return false;
  return node.hasAttribute(TOOLTIP_ATTR);
};

const isHtmlElement = el => el && el instanceof HTMLElement;
/** @typedef {import('jodit').IJodit} Jodit */

/** @typedef {import('jodit').IToolbarButton} Button */

/** @typedef {import('jodit').IControlType<Jodit,Button} Control */


class TooltipPlugin {
  static get pluginName() {
    return 'tooltip';
  }

  constructor() {
    autoBind__default['default'](this);
  }
  /**
   * @param {Config} config
   */


  apply({
    controls
  }) {
    controls[TOOLTIP_CONTROL] = {
      popup: this.createTooltipPopup,
      isDisable: this.isDisabled,
      isActive: this.isActive
    };
  }
  /**
   * @param {Jodit} jodit
   */


  isDisabled(jodit) {
    const {
      constructor: Jodit,
      editor,
      selection
    } = jodit;
    if (!jodit.isInited || !selection.isFocused()) return;
    let start = selection.sel.anchorNode;
    if (start.nodeType !== Node.ELEMENT_NODE) start = start.parentElement;
    const {
      Dom
    } = Jodit.modules;
    return Dom.up(start, el => isHtmlElement(el) && el.matches('table'), editor);
  }
  /**
   * @param {Jodit} jodit
   */


  isActive(jodit) {
    const {
      constructor: Jodit,
      editor,
      selection
    } = jodit;
    if (!jodit.isInited || !selection.isFocused()) return;
    let start = selection.sel.anchorNode;
    if (start.nodeType !== Node.ELEMENT_NODE) start = start.parentElement;
    const {
      Dom
    } = Jodit.modules;
    return Dom.up(start, el => isHtmlElement(el) && el.matches(`.${TOOLTIP_CLASS}`), editor);
  }
  /**
   * @param {Jodit} jodit
   * @param {Node} current
   * @param {Control} self
   * @param {Function} close
   */


  createTooltipPopup(jodit, current, self, close) {
    const {
      constructor: Jodit,
      events,
      selection
    } = jodit;
    const {
      val
    } = Jodit.modules.Helpers;
    const form = jodit.create.fromHTML(TOOLTIP_POPUP_FORM);
    const deleteButton = form.querySelector('button[name=delete]');
    current = Jodit.modules.Dom.up(current, isTooltipNode, jodit.editor);

    if (current) {
      const tooltipValue = current.getAttribute(TOOLTIP_ATTR) || '';
      val(form, 'textarea[name=tooltip]', tooltipValue);
      val(form, 'input[name=text]', current.innerText);
    } else {
      const {
        sel
      } = selection;
      val(form, 'input[name=text]', sel ? sel.toString() : '');
      deleteButton.style.display = 'none';
    }

    this.selectionInfo = selection.save();
    events.on(form, 'submit', event => this.attachTooltip(event, current, close));
    events.on(deleteButton, 'click', event => this.detachTooltip(event, current, close));
    return form;
  }
  /**
   * @param {Event} event
   * @param {Node} current
   * @param {Function} close
   */


  attachTooltip(event, current, close) {
    const {
      constructor: Jodit,
      selection
    } = this.jodit;
    const {
      val
    } = Jodit.modules.Helpers;
    event.preventDefault();
    selection.restore(this.selectionInfo);
    this.selectionInfo = null;
    const tooltipElement = current || document.createElement(TOOLTIP_TAG);
    const tooltipValue = val(event.target, 'textarea[name=tooltip]');
    const innerText = val(event.target, 'input[name=text]');
    tooltipElement.setAttribute(TOOLTIP_ATTR, tooltipValue);
    tooltipElement.classList.add(TOOLTIP_CLASS);
    tooltipElement.innerText = innerText;
    if (!current && innerText) selection.insertNode(tooltipElement);
    close();
  }
  /**
   * @param {Event} event
   * @param {Node} current
   * @param {Function} close
   */


  detachTooltip(event, current, close) {
    const {
      constructor: Jodit,
      selection
    } = this.jodit;
    event.preventDefault();
    if (current) Jodit.modules.Dom.unwrap(current);
    selection.restore(this.selectionInfo);
    this.selectionInfo = null;
    close();
  }

}

//
const JODIT_READY_EVENT = 'joditReady';
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
extend(joditVue.Jodit);
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
  use: SourceEditorPlugin
}, {
  use: TablePopupsPlugin
}, {
  use: AutofocusPlugin,
  options: {
    readyEvent: JODIT_READY_EVENT
  }
}];
var script$1 = {
  props: {
    value: {
      type: String,
      required: true
    },
    minHeight: {
      type: Number,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Insert text here...'
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    config: vm => ({ ...joditConfig,
      minHeight: vm.minHeight,
      placeholder: !vm.value ? vm.placeholder : '',
      plugins
    })
  },
  methods: {
    input(value) {
      return this.$emit('input', value);
    }

  },
  watch: {
    readonly(state) {
      const {
        editor
      } = this.$refs.jodit;
      if (!editor) return;
      editor.setReadOnly(state);
      if (!state) editor.selection.focus();
    }

  },
  components: {
    JoditVue: joditVue.JoditVue
  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "jodit-wrapper"
  }, [_c('jodit-vue', {
    ref: "jodit",
    attrs: {
      "config": _vm.config,
      "value": _vm.value
    },
    on: {
      "input": _vm.input
    }
  })], 1);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = undefined;
/* scoped */

const __vue_scope_id__$1 = "data-v-28543044";
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var JoditEditor = normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

//
var script = {
  name: 'tce-jodit-html',
  props: {
    element: {
      type: Object,
      required: true
    },
    isFocused: {
      type: Boolean,
      default: false
    },
    isDragged: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    showPlaceholder: {
      type: Boolean,
      default: true
    }
  },
  data: vm => {
    var _vm$element$data$cont, _vm$element, _vm$element$data;

    return {
      content: (_vm$element$data$cont = (_vm$element = vm.element) === null || _vm$element === void 0 ? void 0 : (_vm$element$data = _vm$element.data) === null || _vm$element$data === void 0 ? void 0 : _vm$element$data.content) !== null && _vm$element$data$cont !== void 0 ? _vm$element$data$cont : '',
      readonly: false
    };
  },
  computed: {
    hasChanges() {
      var _this$element$data$co, _this$element, _this$element$data;

      const previousValue = (_this$element$data$co = (_this$element = this.element) === null || _this$element === void 0 ? void 0 : (_this$element$data = _this$element.data) === null || _this$element$data === void 0 ? void 0 : _this$element$data.content) !== null && _this$element$data$co !== void 0 ? _this$element$data$co : '';
      return previousValue !== this.content;
    }

  },
  methods: {
    save() {
      if (!this.hasChanges) return;
      const {
        element,
        content
      } = this;
      this.$emit('save', { ...element.data,
        content
      });
    }

  },
  watch: {
    element(val) {
      // Make sure that component state is kept
      // until events (i.e. focusout => save) are triggered
      setTimeout(() => {
        var _val$data$content, _val$data;

        if (this.isFocused) return;
        this.content = (_val$data$content = val === null || val === void 0 ? void 0 : (_val$data = val.data) === null || _val$data === void 0 ? void 0 : _val$data.content) !== null && _val$data$content !== void 0 ? _val$data$content : '';
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

    content: debounce__default['default'](function () {
      this.save();
    }, 4000)
  },
  components: {
    JoditEditor
  }
};

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "tce-jodit-html",
    class: {
      sm: _vm.dense,
      disabled: _vm.isDisabled
    }
  }, [!_vm.isFocused && !_vm.content && _vm.showPlaceholder ? _c('div', {
    staticClass: "jodit-html-placeholder"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "message"
  }, [_c('span', {
    staticClass: "heading"
  }, [_vm._v("HTML component")]), _vm._v(" "), !_vm.dense ? _c('span', [_vm._v("Select to edit")]) : _vm._e()])]) : [_vm.isFocused ? _c('jodit-editor', {
    attrs: {
      "min-height": _vm.$el.clientHeight,
      "readonly": _vm.readonly
    },
    model: {
      value: _vm.content,
      callback: function ($$v) {
        _vm.content = $$v;
      },
      expression: "content"
    }
  }) : _c('div', {
    staticClass: "jodit-container"
  }, [_c('div', {
    staticClass: "jodit-wysiwyg",
    domProps: {
      "innerHTML": _vm._s(_vm.content)
    }
  })])]], 2);
};

var __vue_staticRenderFns__ = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "placeholder-avatar"
  }, [_c('span', [_vm._v("<")]), _vm._v(" "), _c('span', {
    staticClass: "divider"
  }, [_vm._v("/")]), _vm._v(" "), _c('span', [_vm._v(">")])]);
}];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = "data-v-147d3590";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var Edit = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var plugin__default = {
  initState: () => ({
    content: ''
  }),
  components: {
    Edit,
    Toolbar
  }
};

var plugin = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Edit: Edit,
  Toolbar: Toolbar,
  'default': plugin__default
});

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign$1 = function() {
    __assign$1 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/**
 * Source: ftp://ftp.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt
 */
/**
 * Lower case as a function.
 */
function lowerCase(str) {
    return str.toLowerCase();
}

// Support camel case ("camelCase" -> "camel Case" and "CAMELCase" -> "CAMEL Case").
var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
// Remove all non-word characters.
var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
/**
 * Normalize the string into something other libraries can manipulate easier.
 */
function noCase(input, options) {
    if (options === void 0) { options = {}; }
    var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b, _c = options.transform, transform = _c === void 0 ? lowerCase : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
    var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
    var start = 0;
    var end = result.length;
    // Trim the delimiter from around the output string.
    while (result.charAt(start) === "\0")
        start++;
    while (result.charAt(end - 1) === "\0")
        end--;
    // Transform each token independently.
    return result.slice(start, end).split("\0").map(transform).join(delimiter);
}
/**
 * Replace `re` in the input string with the replacement value.
 */
function replace(input, re, value) {
    if (re instanceof RegExp)
        return input.replace(re, value);
    return re.reduce(function (input, re) { return input.replace(re, value); }, input);
}

function dotCase(input, options) {
    if (options === void 0) { options = {}; }
    return noCase(input, __assign({ delimiter: "." }, options));
}

function paramCase(input, options) {
    if (options === void 0) { options = {}; }
    return dotCase(input, __assign$1({ delimiter: "-" }, options));
}

var hasProp = function hasProp(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

var isFunction = function isFunction(arg) {
  return typeof arg === 'function';
};
var _pluginOptions$initSt = plugin__default.initState,
    initState = _pluginOptions$initSt === void 0 ? function () {
  return {};
} : _pluginOptions$initSt,
    _pluginOptions$compon = plugin__default.components,
    components = _pluginOptions$compon === void 0 ? {} : _pluginOptions$compon;
var options = Object.assign({
  version: version,
  initState: initState,
  components: components
}, tailor);
var install = function install(Vue) {
  if (hasProp(plugin, 'install')) {
    isFunction(undefined) && undefined(Vue);
  }

  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        name$1 = _ref2[0],
        component = _ref2[1];

    name$1 = paramCase(name$1);
    if (name$1 === 'edit') Vue.component(name, component);
    Vue.component("".concat(name, "--").concat(name$1), component);
  });
};

exports.Edit = Edit;
exports.Toolbar = Toolbar;
exports.default = install;
exports.install = install;
exports.options = options;
