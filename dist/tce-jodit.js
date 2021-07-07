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
var version = "0.0.1";
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

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
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
    buttons: __vue_component__$2.$buttons
  }
}, {
  use: ExternalToolbarPlugin,
  options: {
    readyEvent: JODIT_READY_EVENT,
    toolbarContainer: __vue_component__$2.$containerId
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

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
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
    JoditEditor: __vue_component__$1
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

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var plugin__default = {
  initState: () => ({
    content: ''
  }),
  components: {
    Edit: __vue_component__,
    Toolbar: __vue_component__$2
  }
};

var plugin = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Edit: __vue_component__,
  Toolbar: __vue_component__$2,
  'default': plugin__default
});

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

/**
 * Special language-specific overrides.
 *
 * Source: ftp://ftp.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt
 *
 * @type {Object}
 */
var LANGUAGES = {
  tr: {
    regexp: /\u0130|\u0049|\u0049\u0307/g,
    map: {
      '\u0130': '\u0069',
      '\u0049': '\u0131',
      '\u0049\u0307': '\u0069'
    }
  },
  az: {
    regexp: /[\u0130]/g,
    map: {
      '\u0130': '\u0069',
      '\u0049': '\u0131',
      '\u0049\u0307': '\u0069'
    }
  },
  lt: {
    regexp: /[\u0049\u004A\u012E\u00CC\u00CD\u0128]/g,
    map: {
      '\u0049': '\u0069\u0307',
      '\u004A': '\u006A\u0307',
      '\u012E': '\u012F\u0307',
      '\u00CC': '\u0069\u0307\u0300',
      '\u00CD': '\u0069\u0307\u0301',
      '\u0128': '\u0069\u0307\u0303'
    }
  }
};

/**
 * Lowercase a string.
 *
 * @param  {String} str
 * @return {String}
 */
var lowerCase = function (str, locale) {
  var lang = LANGUAGES[locale];

  str = str == null ? '' : String(str);

  if (lang) {
    str = str.replace(lang.regexp, function (m) { return lang.map[m] });
  }

  return str.toLowerCase()
};

var nonWordRegexp = /[^A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC0-9\xB2\xB3\xB9\xBC-\xBE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]+/g;

var camelCaseRegexp = /([a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7FA\uAB30-\uAB5A\uAB60-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A0-9\xB2\xB3\xB9\xBC-\xBE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])([A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AD\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A])/g;

var camelCaseUpperRegexp = /([A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AD\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A])([A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AD\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A][a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7FA\uAB30-\uAB5A\uAB60-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A])/g;

/**
 * Sentence case a string.
 *
 * @param  {string} str
 * @param  {string} locale
 * @param  {string} replacement
 * @return {string}
 */
var noCase = function (str, locale, replacement) {
  if (str == null) {
    return ''
  }

  replacement = typeof replacement !== 'string' ? ' ' : replacement;

  function replace (match, index, value) {
    if (index === 0 || index === (value.length - match.length)) {
      return ''
    }

    return replacement
  }

  str = String(str)
    // Support camel case ("camelCase" -> "camel Case").
    .replace(camelCaseRegexp, '$1 $2')
    // Support odd camel case ("CAMELCase" -> "CAMEL Case").
    .replace(camelCaseUpperRegexp, '$1 $2')
    // Remove all non-word characters and replace with a single space.
    .replace(nonWordRegexp, replace);

  // Lower case the entire string.
  return lowerCase(str, locale)
};

/**
 * Param case a string.
 *
 * @param  {string} value
 * @param  {string} [locale]
 * @return {string}
 */
var paramCase = function (value, locale) {
  return noCase(value, locale, '-')
};

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
    isFunction(_missingExportShim) && _missingExportShim(Vue);
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

exports.Edit = __vue_component__;
exports.Toolbar = __vue_component__$2;
exports.default = install;
exports.install = install;
exports.options = options;
