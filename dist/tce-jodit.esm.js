import debounce from 'lodash/debounce';
import { Jodit, JoditVue } from 'jodit-vue';
import autoBind from 'auto-bind';
import cloneDeep from 'lodash/cloneDeep';
import keysIn from 'lodash/keysIn';
import uniqueId from 'lodash/uniqueId';
import ace from 'brace';
import beautify from 'js-beautify/js/src/html';
import 'brace/mode/html';
import 'brace/theme/chrome';
import scrollparent from 'scrollparent';
import isFunction$2 from 'lodash/isFunction';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

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

/** @typedef {import('jodit').IJodit} Jodit */

var AutofocusPlugin =
/*#__PURE__*/
function () {
  _createClass(AutofocusPlugin, null, [{
    key: "pluginName",
    get: function get() {
      return 'autofocus';
    }
  }]);

  function AutofocusPlugin(options) {
    _classCallCheck(this, AutofocusPlugin);

    options.readyEvent = options.readyEvent || 'joditReady';
    options.cursorStyle = options.cursorStyle || 'auto';
    autoBind(this);
  }
  /**
   * @param {Jodit} jodit
   */


  _createClass(AutofocusPlugin, [{
    key: "init",
    value: function init(jodit) {
      jodit.editor.style.cursor = this.options.cursorStyle;
    }
    /**
     * @param {Jodit} jodit
     */

  }, {
    key: "afterInit",
    value: function afterInit(jodit) {
      var _this = this;

      setTimeout(function () {
        jodit.selection.focus();
        jodit.events.fire(_this.options.readyEvent);
      }, 0);
    }
  }]);

  return AutofocusPlugin;
}();

var isFunction = function isFunction(arg) {
  return typeof arg === 'function';
};

var isString = function isString(arg) {
  return typeof arg === 'string';
};

var hide = function hide(el) {
  return el.style.display = 'none';
};

var show = function show(el) {
  return el.style.display = 'block';
};

var splitArray = function splitArray(arg) {
  return isString(arg) ? arg.split(/[,\s]+/) : arg;
};
/** @typedef {import('jodit/src/Config').Config & import('jodit/src/plugins')} Config */

/** @typedef {import('jodit').IJodit} Jodit */


var ExternalToolbarPlugin =
/*#__PURE__*/
function () {
  _createClass(ExternalToolbarPlugin, null, [{
    key: "pluginName",
    get: function get() {
      return 'external-toolbar';
    }
  }]);

  function ExternalToolbarPlugin(options) {
    _classCallCheck(this, ExternalToolbarPlugin);

    options.readyEvent = options.readyEvent || 'joditReady';
    autoBind(this);
  }
  /**
   * @param {Config} config
   */


  _createClass(ExternalToolbarPlugin, [{
    key: "apply",
    value: function apply(config) {
      config.toolbar = false;
      this.options.buttons = splitArray(config.buttons).concat(config.extraButtons);
    }
    /**
     * @param {Jodit} jodit
     */

  }, {
    key: "init",
    value: function init(jodit) {
      var self = this;
      var __initEditor = jodit.__initEditor;

      jodit.__initEditor = function () {
        __initEditor.apply(this, arguments);

        self.renderToolbar();
      };

      jodit.events.on(this.options.readyEvent, this.showToolbar);
    }
  }, {
    key: "renderToolbar",
    value: function renderToolbar() {
      var _this$jodit = this.jodit,
          statusbar = _this$jodit.statusbar,
          toolbar = _this$jodit.toolbar;
      var container = document.querySelector(this.options.toolbarContainer);
      hide(toolbar.container);
      toolbar.build(this.options.buttons, container);
      if (statusbar) statusbar.show();
    }
  }, {
    key: "showToolbar",
    value: function showToolbar() {
      var toolbar = this.jodit.toolbar;
      immediateCheckActiveButtons(toolbar);
      show(toolbar.container);
    }
    /**
     * @param {Jodit} jodit
     */

  }, {
    key: "beforeDestruct",
    value: function beforeDestruct(jodit) {
      jodit.events.off(this.options.readyEvent, this.showToolbar);
    }
  }]);

  return ExternalToolbarPlugin;
}(); // TODO: Remove this proxy function after typo inside Jodit source gets fixed!

function immediateCheckActiveButtons(toolbar) {
  if (isFunction(toolbar.immediateCheckActiveButtons)) {
    return toolbar.immediateCheckActiveButtons();
  }

  return toolbar.immedateCheckActiveButtons();
}

var JODIT_CONTROL_FONT = 'font';
var JODIT_CONTROL_FONTSIZE = 'fontsize';
var JODIT_CONTROL_PARAGRAPH_STYLE = 'paragraph';

var isEmpty = function isEmpty(el) {
  return !el.innerHTML;
};

var find = function find(arr, cb, defVal) {
  return arr.find(cb) || defVal;
};
/** @typedef {import('jodit/src/Config').Config & import('jodit/src/plugins')} Config */

/** @typedef {import('jodit').IJodit} Jodit */

/** @typedef {import('jodit').IToolbarButton} Button */

/** @typedef {import('jodit').IControlType<Jodit,Button} Control */


var FontControlsPlugin =
/*#__PURE__*/
function () {
  _createClass(FontControlsPlugin, null, [{
    key: "pluginName",
    get: function get() {
      return 'font-controls';
    }
  }]);

  function FontControlsPlugin(options) {
    _classCallCheck(this, FontControlsPlugin);

    options.defaultFontFamily = options.defaultFontFamily || 'Sans Serif';
    options.defaultFontSize = options.defaultFontSize || 16;
    /* px */

    options.defaultParagraphStyle = options.defaultParagraphStyle || 'Normal';
    options.pickerLabelClass = options.pickerLabelClass || 'picker_label';
    autoBind(this);
  }
  /**
   * @param {Config} config
   */


  _createClass(FontControlsPlugin, [{
    key: "apply",
    value: function apply(_ref) {
      var controls = _ref.controls;
      var control;

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

  }, {
    key: "getLabel",
    value: function getLabel(jodit, control, button) {
      var entry = this.getActiveEntry(jodit, control, control.defaultValue);

      var _entry = _slicedToArray(entry, 2),
          key = _entry[1];

      var icon = button.createIcon(control.icon, control);
      var label = document.createElement('span');
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

  }, {
    key: "getActiveEntry",
    value: function getActiveEntry(jodit, control, defaultValue) {
      if (!jodit.isInited) return [null, defaultValue];
      var entries = Object.entries(control.list);
      var entry = entries.find(function (args) {
        return control.isActiveChild(jodit, {
          args: args
        });
      });
      if (entry) return entry;
      if (isEmpty(jodit.editor)) return [null, defaultValue];

      if (control.name === JODIT_CONTROL_FONT) {
        var _getComputedStyle = getComputedStyle(jodit.editor),
            currentFontFamily = _getComputedStyle.fontFamily;

        return find(entries, function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 1),
              fontFamily = _ref3[0];

          return normalize.fontFamily(fontFamily) === currentFontFamily;
        }, [null, defaultValue]);
      }

      if (control.name === JODIT_CONTROL_FONTSIZE) {
        var _getComputedStyle2 = getComputedStyle(jodit.editor),
            currentFontSize = _getComputedStyle2.fontSize;

        return find(entries, function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              _ = _ref5[0],
              fontSize = _ref5[1];

          return fontSize === normalize.fontSize(currentFontSize);
        }, [null, defaultValue]);
      }

      if (control.name === JODIT_CONTROL_PARAGRAPH_STYLE) {
        return find(entries, function (_ref6) {
          var _ref7 = _slicedToArray(_ref6, 2),
              _ = _ref7[0],
              style = _ref7[1];

          return style.toLowerCase() === 'normal';
        }, [null, defaultValue]);
      }
    }
  }]);

  return FontControlsPlugin;
}();

var normalize = function () {
  var span = document.createElement('span');
  return {
    fontFamily: function fontFamily(str) {
      span.style.fontFamily = str;
      return span.style.fontFamily;
    },
    fontSize: function fontSize(str) {
      return String(parseFloat(str));
    }
  };
}();

var mdiIcons = Object.assign({
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
  link: 'link'
}, {
  left: 'format-align-left',
  center: 'format-align-center',
  right: 'format-align-right',
  justify: 'format-align-justify'
}, {
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
});
var textColor = "\n  <span class=\"icon stack\">\n    <span class=\"icon stacked mdi mdi-format-color-text\"></span>\n    <span class=\"icon stacked mdi mdi-color-helper\"></span>\n    <svg width=\"0\" height=\"0\" style=\"display: none;\"></svg>\n  </span>";
function getMdiIcon(name) {
  if (name === 'brush') return textColor;
  var code = mdiIcons[name];
  return "<span class=\"mdi mdi-".concat(code, "\"></span>");
}

var CSS_NO_COLOR = '';
var JODIT_COLORPICKER = '.jodit_colorpicker';
var JODIT_COMMAND_BACKGROUND_COLOR = 'background';
var JODIT_COMMAND_TEXT_COLOR = 'forecolor';
var JODIT_CONTROL_ALIGN = 'align';
var JODIT_CONTROL_COLOR = 'brush';
var JODIT_DEFAULT_EVENT_NAMESPACE = 'JoditEventDefaultNamespace';
var JODIT_PICKER_SELECTION_EVENTS = ['mousedown', 'touchend'];

var noop = function noop() {};
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


var MdiIconsPlugin =
/*#__PURE__*/
function () {
  _createClass(MdiIconsPlugin, null, [{
    key: "pluginName",
    get: function get() {
      return 'mdi-icons';
    }
  }]);

  function MdiIconsPlugin(options) {
    _classCallCheck(this, MdiIconsPlugin);

    options.btnResetColorClass = options.btnResetColorClass || 'btn_reset_color';
    options.selectedMarkerClass = options.selectedMarkerClass || 'selected_color_marker';
    autoBind(this);
  }
  /**
   * @param {HTMLElement} el
   * @returns {boolean}
   */


  _createClass(MdiIconsPlugin, [{
    key: "isResetButton",
    value: function isResetButton(el) {
      return el.classList.contains(this.options.btnResetColorClass);
    }
    /**
    * @param {Config} config
    */

  }, {
    key: "apply",
    value: function apply(_ref) {
      var controls = _ref.controls,
          popup = _ref.popup;
      var self = this;
      var control;

      if (control = controls[JODIT_CONTROL_ALIGN]) {
        var _control = control,
            _control$getLabel = _control.getLabel,
            getLabel = _control$getLabel === void 0 ? noop : _control$getLabel;

        control.getLabel = function () {
          var result = getLabel.apply(this, arguments);
          self.getAlignmentLabel.apply(self, arguments);
          return result;
        };
      }

      if (control = controls[JODIT_CONTROL_COLOR]) {
        var _control2 = control,
            _control2$getLabel = _control2.getLabel,
            _getLabel = _control2$getLabel === void 0 ? noop : _control2$getLabel;

        control.getLabel = function () {
          var result = _getLabel.apply(this, arguments);

          self.getColorLabel.apply(self, arguments);
          return result;
        };

        var _control3 = control,
            _control3$popup = _control3.popup,
            createPopup = _control3$popup === void 0 ? noop : _control3$popup;

        control.popup = function () {
          var popup = createPopup.apply(this, arguments);
          if (!popup) return popup;
          return self.colorPopup.apply(self, [popup].concat(Array.prototype.slice.call(arguments)));
        };
      }

      if (Array.isArray(popup.table)) {
        control = popup.table.find(function (it) {
          return it.name === JODIT_CONTROL_COLOR;
        });

        if (control) {
          var _control4 = control,
              _control4$popup = _control4.popup,
              _createPopup = _control4$popup === void 0 ? noop : _control4$popup;

          control.popup = function () {
            var popup = _createPopup.apply(this, arguments);

            if (!popup) return popup;
            return self.inlineColorPopup.apply(self, [popup].concat(Array.prototype.slice.call(arguments)));
          };
        }
      }
    }
    /**
    * @param {Jodit} jodit
    * @param {Control} control
    * @param {Button} button
    */

  }, {
    key: "getAlignmentLabel",
    value: function getAlignmentLabel(jodit, control, button) {
      // Show current alignment inside button label.
      var currentValue = control.data && control.data.currentValue;
      if (!currentValue) return;
      button.textBox.innerHTML = '';
      button.textBox.appendChild(button.createIcon(currentValue, control));
    }
    /**
    * @param {Jodit} jodit
    * @param {Control} control
    * @param {Button} button
    */

  }, {
    key: "getColorLabel",
    value: function getColorLabel(jodit, control, button) {
      // Colorize material design `color-helper` icon.
      var colorHelper = button.textBox.querySelector('.mdi-color-helper');
      var svg = button.textBox.querySelector('svg');
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

  }, {
    key: "colorPopup",
    value: function colorPopup(popup, jodit, current, control) {
      var close = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : noop;
      var events = jodit.events,
          options = jodit.options;
      var pickers = getColorPickers(popup, {
        defaultTab: options.colorPickerDefaultTab
      }); // Add reset color buttons to main toolbar's colorpicker/s.

      onSelect(events, this.addResetButton(pickers.textColor), function () {
        jodit.execCommand(JODIT_COMMAND_TEXT_COLOR, false, CSS_NO_COLOR);
        close();
      });
      onSelect(events, this.addResetButton(pickers.backgroundColor), function () {
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

  }, {
    key: "inlineColorPopup",
    value: function inlineColorPopup(popup, jodit, table) {
      var _this = this;

      var self = this;
      var Jodit = jodit.constructor,
          events = jodit.events;
      var pickers = getColorPickers(popup, {
        defaultTab: 'background'
      });
      pickers.forEach(function (picker) {
        var selected = picker.querySelector('.active');
        if (selected) _this.changeSelectedMarker(selected);

        var _events$getStore$get = events.getStore(picker).get(JODIT_PICKER_SELECTION_EVENTS[0], JODIT_DEFAULT_EVENT_NAMESPACE),
            _events$getStore$get2 = _slicedToArray(_events$getStore$get, 1),
            eventDesc = _events$getStore$get2[0];

        var oldListener = eventDesc && eventDesc.originalCallback;
        if (!oldListener) return;
        replaceListener(jodit, picker, JODIT_PICKER_SELECTION_EVENTS.join(' '), newListener, oldListener);

        function newListener(e) {
          oldListener.apply(this, arguments);
          self.onColorChange(e, picker);
        }
      }); // Add reset color buttons to inline toolbar's colorpicker/s.

      onSelect(events, this.addResetButton(pickers.textColor), function () {
        var selectedCells = Jodit.modules.Table.getAllSelectedCells(table);
        selectedCells.forEach(function (cell) {
          return cell.style.color = CSS_NO_COLOR;
        });
        jodit.setEditorValue();
      });
      onSelect(events, this.addResetButton(pickers.backgroundColor), function () {
        var selectedCells = Jodit.modules.Table.getAllSelectedCells(table);
        selectedCells.forEach(function (cell) {
          return cell.style.backgroundColor = CSS_NO_COLOR;
        });
        jodit.setEditorValue();
      });
      onSelect(events, this.addResetButton(pickers.borderColor), function () {
        var selectedCells = Jodit.modules.Table.getAllSelectedCells(table);
        selectedCells.forEach(function (cell) {
          return cell.style.borderColor = CSS_NO_COLOR;
        });
        jodit.setEditorValue();
      });
      return popup;
    }
    /**
     * @param {Event} e
     * @param {HTMLElement} picker
     */

  }, {
    key: "onColorChange",
    value: function onColorChange(e, picker) {
      var Jodit = this.jodit.constructor;
      var button = Jodit.modules.Dom.up(e.target, function (el) {
        return el.matches('[data-color]');
      }, picker);
      if (!button) return;
      var selected = picker.querySelector('.active');
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

  }, {
    key: "addResetButton",
    value: function addResetButton(picker) {
      var btnResetColor = picker && Array.from(picker.children).filter(function (el) {
        return el.matches('a');
      }).pop();
      if (!btnResetColor) return document.createElement('span');
      btnResetColor.classList.add(this.options.btnResetColorClass);
      btnResetColor.innerHTML = '';
      var tabIndex = this.jodit.options.allowTabNavigation ? 0 : -1;
      btnResetColor.appendChild(createButton({
        icon: 'mdi-water-off',
        text: 'None',
        tabIndex: tabIndex
      }));
      return btnResetColor;
    }
    /**
     * @param {HTMLAnchorElement} selected
     */

  }, {
    key: "changeSelectedMarker",
    value: function changeSelectedMarker(selected) {
      // Swap eye icon marking selected color with colorized bullet.
      selected.classList.add(this.options.selectedMarkerClass);
      var svg = selected.querySelector('svg');
      var circle = createIcon('mdi-circle');
      Object.assign(circle.style, {
        color: svg.style.fill,
        fontSize: '8px'
      });
      selected.appendChild(circle);
    }
    /**
     * @param {Jodit} jodit
     */

  }, {
    key: "init",
    value: function init(_ref2) {
      var events = _ref2.events;
      events.on('getIcon', getMdiIcon);
    }
    /**
     * @param {Jodit} jodit
     */

  }, {
    key: "beforeDestruct",
    value: function beforeDestruct(jodit) {
      jodit.events.off('getIcon', getMdiIcon);
    }
  }]);

  return MdiIconsPlugin;
}();

function getColorPickers(popup, _ref3) {
  var defaultTab = _ref3.defaultTab;
  var pickers = Array.from(popup.querySelectorAll(JODIT_COLORPICKER));
  if (pickers.length <= 0) return pickers;
  var textColor, backgroundColor, borderColor;

  if (defaultTab === 'background') {
    var _pickers = _slicedToArray(pickers, 3);

    backgroundColor = _pickers[0];
    textColor = _pickers[1];
    borderColor = _pickers[2];
  } else if (defaultTab === 'color') {
    var _pickers2 = _slicedToArray(pickers, 3);

    textColor = _pickers2[0];
    backgroundColor = _pickers2[1];
    borderColor = _pickers2[2];
  }

  return Object.assign(pickers, {
    textColor: textColor,
    backgroundColor: backgroundColor,
    borderColor: borderColor
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


function replaceListener(jodit, target, events, listener, oldListener) {
  jodit.events.off(target, events, oldListener).on(target, events, listener);
}
/**
 * @param {Object} options
 * @param {String} options.icon
 * @param {String} options.text
 * @param {Number} [options.tabIndex=0]
 * @returns {HTMLSpanElement}
 */


function createButton(_ref4) {
  var icon = _ref4.icon,
      text = _ref4.text,
      _ref4$tabIndex = _ref4.tabIndex,
      tabIndex = _ref4$tabIndex === void 0 ? 0 : _ref4$tabIndex;
  var btn = document.createElement('span');
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
  var icon = document.createElement('span');
  icon.classList.add('jodit_icon', 'mdi', name);
  return icon;
}

var isFunction$1 = function isFunction(arg) {
  return typeof arg === 'function';
};

var isString$1 = function isString(arg) {
  return typeof arg === 'string';
};

var splitArray$1 = function splitArray(arg) {
  return isString$1(arg) ? arg.split(/[,\s]+/) : arg;
};
/** @typedef {import('jodit/src/Config').Config & import('jodit/src/plugins')} Config */

/** @typedef {import('jodit').IJodit} Jodit */


var PluginProxy =
/*#__PURE__*/
function () {
  /**
   * @param {Object} plugin
   * @param {Jodit} jodit
   */
  function PluginProxy(plugin, jodit) {
    _classCallCheck(this, PluginProxy);

    this._plugin = plugin;
    this.jodit = jodit;
    autoBind(this);
    jodit.events.on('afterInit', this.afterInit).on('beforeDestruct', this.beforeDestruct);
  }

  _createClass(PluginProxy, [{
    key: "afterInit",
    value: function afterInit() {
      if (!isFunction$1(this._plugin.afterInit)) return;

      this._plugin.afterInit(this.jodit);
    }
  }, {
    key: "beforeDestruct",
    value: function beforeDestruct() {
      this.jodit.events.off('beforeDestruct', this.beforeDestruct);
      if (!isFunction$1(this._plugin.beforeDestruct)) return;

      this._plugin.beforeDestruct(this.jodit);
    }
  }, {
    key: "destruct",
    value: function destruct() {
      if (!isFunction$1(this._plugin.destruct)) return;

      this._plugin.destruct();
    }
  }]);

  return PluginProxy;
}();

function extend(Jodit) {
  /**
   * @param {Config} config
   */
  Jodit.prototype.$applyPlugins = function (config) {
    var _this = this;

    var _config$plugins = config.plugins,
        plugins = _config$plugins === void 0 ? [] : _config$plugins;
    var disablePlugins = splitArray$1(config.disablePlugins);
    this.__plugins = this.__plugins = {};
    this.$plugins = new Map();
    plugins.forEach(function (_ref) {
      var Plugin = _ref.use,
          _ref$options = _ref.options,
          options = _ref$options === void 0 ? {} : _ref$options;
      var pluginName = Plugin.pluginName;
      if (disablePlugins.includes(pluginName)) return; // Create plugin instance with provided options.

      var plugin = new Plugin(options);
      plugin.options = options;

      _this.$plugins.set(pluginName, plugin);

      _this.__plugins[uniqueId('plugin_proxy__')] = new PluginProxy(plugin, _this); // Apply plugin on jodit options.

      if (isFunction$1(plugin.apply)) plugin.apply(config, Jodit);
    });
  };

  Object.defineProperty(Jodit.prototype, 'options', {
    enumerable: true,
    configurable: false,
    get: function get() {
      return this.$options;
    },
    set: function set() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.jodit) {
        options = cloneOptions(options);
        this.$applyPlugins(options);
      }

      this.$options = options;
    }
  });
  var __initPlugines = Jodit.prototype.__initPlugines;

  Jodit.prototype.__initPlugines = function () {
    var _this2 = this;

    this.$plugins.forEach(function (plugin) {
      if (isFunction$1(plugin.init)) plugin.init(_this2, plugin.options);
      plugin.jodit = _this2;
    });
    return __initPlugines.apply(this, arguments);
  };
}

function cloneOptions(options) {
  var shared = ['ownerDocument', 'ownerWindow'];
  return Object.fromEntries(keysIn(options).map(function (key) {
    var value = options[key];
    if (shared.includes(key)) return [key, value];
    return [key, cloneDeep(value)];
  }));
}

window.ace = ace;
/** @typedef {import('jodit/src/Config').Config & import('jodit/src/plugins')} Config */

/** @typedef {import('jodit').IJodit} Jodit */

var SourceEditorPlugin =
/*#__PURE__*/
function () {
  _createClass(SourceEditorPlugin, null, [{
    key: "pluginName",
    get: function get() {
      return 'source-editor';
    }
  }]);

  function SourceEditorPlugin(options) {
    _classCallCheck(this, SourceEditorPlugin);

    options.theme = options.theme || 'ace/theme/chrome';
    autoBind(this);
  }
  /**
   * @param {Config} config
   */


  _createClass(SourceEditorPlugin, [{
    key: "apply",
    value: function apply(config) {
      config.sourceEditorNativeOptions = config.sourceEditorNativeOptions || {};
      Object.assign(config.sourceEditorNativeOptions, {
        mode: 'ace/mode/html',
        theme: this.options.theme
      });
    }
    /**
     * @param {Jodit} jodit
     */

  }, {
    key: "init",
    value: function init(jodit) {
      if (jodit.options.beautifyHTML) {
        // NOTE: Unfortunately jodit gets beautify function from window global. :(
        window.html_beautify = beautify;
      }

      jodit.events.on('aceInited', this.onAceEditorReady);
    }
  }, {
    key: "onAceEditorReady",
    value: function onAceEditorReady() {
      var source = this.jodit.__plugins.source;
      /** @type {import('brace').Editor} */

      var aceEditor = source.aceEditor;
      aceEditor.setShowPrintMargin(false);
    }
    /**
     * @param {Jodit} jodit
     */

  }, {
    key: "beforeDestruct",
    value: function beforeDestruct(jodit) {
      jodit.events.off('aceInited', this.onAceEditorReady);
    }
  }]);

  return SourceEditorPlugin;
}();

var JODIT_RECALC_POPUP_POSITION_EVENT = 'recalcPositionPopup';
var JODIT_DEFAULT_EVENT_NAMESPACE$1 = 'JoditEventDefaultNamespace';
/** @typedef {import('jodit').IJodit} Jodit */

var TablePopupsPlugin =
/*#__PURE__*/
function () {
  _createClass(TablePopupsPlugin, null, [{
    key: "pluginName",
    get: function get() {
      return 'table-popups';
    }
  }]);

  function TablePopupsPlugin() {
    _classCallCheck(this, TablePopupsPlugin);

    autoBind(this);
  }
  /**
   * @param {Jodit} jodit
   */


  _createClass(TablePopupsPlugin, [{
    key: "init",
    value: function init(jodit) {
      var self = this;
      var afterInitHook = jodit.afterInitHook;

      jodit.afterInitHook = function () {
        afterInitHook.apply(this, arguments);
        self.observeTables(jodit);
        self.scrollContainer = scrollparent(jodit.container);
        if (self.scrollContainer) self.addScrollHandler(jodit);
      };
    }
    /**
     * @param {Jodit} jodit
     */

  }, {
    key: "observeTables",
    value: function observeTables(jodit) {
      var Jodit = jodit.constructor;
      var table = jodit.__plugins.table;
      var query = Jodit.modules.Helpers.$$;
      query('table', jodit.editor).forEach(function (tableEl) {
        if (table[table.__key]) return;
        table.observe(tableEl);
      });
    }
    /**
     * @param {Jodit} jodit
     */

  }, {
    key: "addScrollHandler",
    value: function addScrollHandler(jodit) {
      var _jodit$events$getStor = jodit.events.getStore(jodit.events).get(JODIT_RECALC_POPUP_POSITION_EVENT, JODIT_DEFAULT_EVENT_NAMESPACE$1),
          _jodit$events$getStor2 = _slicedToArray(_jodit$events$getStor, 1),
          eventDesc = _jodit$events$getStor2[0];

      var recalcPopupPosition = eventDesc && eventDesc.originalCallback;
      if (!recalcPopupPosition) return;
      this.scrollHandler = this.createScrollHandler(recalcPopupPosition);
      jodit.events.on(this.scrollContainer, 'scroll', this.scrollHandler);
    }
    /**
     * @param {Function} recalcPopupPosition
     */

  }, {
    key: "createScrollHandler",
    value: function createScrollHandler(recalcPopupPosition) {
      return scrollHandler.bind(this);

      function scrollHandler() {
        var inlinePopup = this.jodit.__plugins.inlinePopup;
        if (!inlinePopup || !inlinePopup.isShown) return;
        return recalcPopupPosition.call(inlinePopup);
      }
    }
    /**
     * @param {Jodit} jodit
     */

  }, {
    key: "beforeDestruct",
    value: function beforeDestruct(jodit) {
      if (this.scrollContainer && this.scrollHandler) {
        jodit.events.off(this.scrollContainer, 'scroll', this.scrollHandler);
      }
    }
  }]);

  return TablePopupsPlugin;
}();

//
//
//
//
var _id = 'joditToolbar';
var _buttons = [[['source', 'Source']], [['undo', 'Undo'], ['redo', 'Redo'], ['cut', 'Cut selection'], ['copyformat', 'Paint format']], [['paragraph', 'Style'], ['font', 'Font'], ['fontsize', 'Font size']], [['bold', 'Bold'], ['italic', 'Italic'], ['underline', 'Underline'], ['strikethrough', 'Strikethrough']], [['brush', 'Text color']], [['link', 'Insert link...'], ['table', 'Insert table'], ['image', 'Image'], ['tooltip', 'Tooltip'], ['symbol', 'Insert special character'], ['hr', 'Horizontal line']], [['ol', 'Numbered list'], ['ul', 'Bulleted list'], ['outdent', 'Decrease indent'], ['indent', 'Increase indent']], [['align', 'Alignment']], [['subscript', 'Subscript'], ['superscript', 'Superscript']], [['eraser', 'Clear formatting']]];
var script = {
  get $containerId() {
    return "#".concat(_id);
  },

  get $buttons() {
    return _buttons;
  },

  computed: {
    id: function id() {
      return _id;
    },
    buttons: function buttons() {
      return _buttons;
    }
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

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "jodit_toolbar_container",
    attrs: {
      "id": _vm.id
    }
  });
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var Toolbar = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

/** @typedef {import('jodit').IJodit} Jodit */

var ToolbarBuilderPlugin =
/*#__PURE__*/
function () {
  _createClass(ToolbarBuilderPlugin, null, [{
    key: "pluginName",
    get: function get() {
      return 'toolbar-builder';
    }
  }]);

  function ToolbarBuilderPlugin(options) {
    _classCallCheck(this, ToolbarBuilderPlugin);

    options.buttons = options.buttons || [];
    options.separator = options.separator || '|';
    autoBind(this);
  }
  /**
   * @param {Config} config
   * @param {*} Jodit
   */


  _createClass(ToolbarBuilderPlugin, [{
    key: "apply",
    value: function apply(config, Jodit) {
      var _this = this;

      var language = config.language || 'en';
      config.language = uniqueId("".concat(language, "_"));
      Jodit.lang[config.language] = cloneDeep(Jodit.lang[language]);
      this.options.language = config.language;
      config.buttons = [];
      this.options.buttons.forEach(function (it) {
        return _this.addGroup(config, Jodit, it);
      });
    }
  }, {
    key: "addGroup",
    value: function addGroup(config, Jodit) {
      var _this2 = this;

      var controls = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var buttons = controls.reduce(function (acc, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            name = _ref2[0],
            tooltip = _ref2[1];

        var control = config.controls[name];
        var lang = Jodit.lang[_this2.options.language];
        if (!control) return acc;
        control.tooltip = control.tooltip || tooltip;
        Object.assign(lang, _defineProperty({}, control.tooltip, tooltip));
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
  }]);

  return ToolbarBuilderPlugin;
}();

var JODIT_DEFAULT_EVENT_NAMESPACE$2 = 'JoditEventDefaultNamespace';
var JODIT_POPUP_ARROW = '.jodit_popup_triangle';
var JODIT_POPUP_TRIGGER_EVENTS = ['mousedown', 'touchend'];
var JODIT_TOOLBAR_BUTTON = '.jodit_toolbar_btn';
var toggle = Symbol('toggle');

var hide$1 = function hide(el) {
  return el.style.display = 'none';
};

var isToolbarButton = function isToolbarButton(el) {
  return el.matches(JODIT_TOOLBAR_BUTTON);
};
/** @typedef {import('jodit/src/Config').Config & import('jodit/src/plugins')} Config */

/** @typedef {import('jodit').IJodit} Jodit */

/** @typedef {import('jodit').IComponent} Component */


var ToolbarPopupsPlugin =
/*#__PURE__*/
function () {
  _createClass(ToolbarPopupsPlugin, null, [{
    key: "pluginName",
    get: function get() {
      return 'toolbar-popups';
    }
  }]);

  function ToolbarPopupsPlugin(options) {
    _classCallCheck(this, ToolbarPopupsPlugin);

    options.popupOpenClass = options.popupOpenClass || 'popup_open';
    autoBind(this);
    this.popups = new Map();
  }
  /**
   * @param {Jodit} jodit
   */


  _createClass(ToolbarPopupsPlugin, [{
    key: "init",
    value: function init(jodit) {
      jodit.events.on('beforeOpenPopup', this.beforeOpenPopup);
    }
    /**
     * @param {Component} popup
     */

  }, {
    key: "beforeOpenPopup",
    value: function beforeOpenPopup(popup) {
      var self = this;
      if (!isToolbarButton(popup.target)) return;
      hide$1(popup.container);
      this.popups.set(popup.target, popup);
      var calcPosition = popup.calcPosition,
          doClose = popup.doClose;

      popup.calcPosition = function () {
        calcPosition.apply(this, arguments);
        self.onOpenPopup(popup);
      };

      popup.doClose = function () {
        doClose.apply(this, arguments);
        self.onClosePopup(popup);
      };

      var _this$jodit$events$ge = this.jodit.events.getStore(popup.target).get(JODIT_POPUP_TRIGGER_EVENTS[0], JODIT_DEFAULT_EVENT_NAMESPACE$2),
          _this$jodit$events$ge2 = _slicedToArray(_this$jodit$events$ge, 1),
          eventDesc = _this$jodit$events$ge2[0];

      var oldListener = eventDesc && eventDesc.originalCallback;
      if (!oldListener || oldListener[toggle]) return;
      replaceListener$1(this.jodit, popup.target, JODIT_POPUP_TRIGGER_EVENTS.join(' '), this.createToggleAction(popup.target, oldListener), oldListener);
    }
    /**
     * @param {Component} popup
     */

  }, {
    key: "onOpenPopup",
    value: function onOpenPopup(popup) {
      popup.target.classList.add(this.options.popupOpenClass);
      var arrow = popup.container.querySelector(JODIT_POPUP_ARROW);
      if (arrow) arrow.style.marginLeft = 0;
      Object.assign(popup.container.style, {
        marginLeft: 0,
        display: 'initial'
      });
    }
    /**
     * @param {Component} popup
     */

  }, {
    key: "onClosePopup",
    value: function onClosePopup(popup) {
      this.popups["delete"](popup.target, popup);
      popup.target.classList.remove(this.options.popupOpenClass);
    }
    /**
     * @param {Object} target
     * @param {EventListener} listener
     * @returns {EventListener}
     */

  }, {
    key: "createToggleAction",
    value: function createToggleAction(target, listener) {
      var self = this;
      return Object.assign(togglePopup, _defineProperty({}, toggle, true));

      function togglePopup() {
        var popup = self.popups.get(target);

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

  }, {
    key: "beforeDestruct",
    value: function beforeDestruct(jodit) {
      jodit.events.off('beforeOpenPopup', this.beforeOpenPopup);
    }
  }]);

  return ToolbarPopupsPlugin;
}();

function replaceListener$1(jodit, target, events, listener, oldListener) {
  jodit.events.off(target, events, oldListener).on(target, events, listener);
}

var TOOLTIP_CONTROL = 'tooltip';
var TOOLTIP_TAG = 'span';
var TOOLTIP_ATTR = 'data-tooltip';
var TOOLTIP_CLASS = 'tce-jodit-tooltip';
var TOOLTIP_POPUP_FORM = "\n  <form class=\"jodit_form\">\n    <textarea name=\"tooltip\" placeholder=\"Tooltip\"></textarea>\n    <input name=\"text\" type=\"text\" placeholder=\"Text\">\n    <div style=\"text-align: right\">\n      <button name=\"delete\" type=\"button\">Delete</button>\n      <button name=\"submit\" type=\"submit\">Submit</button>\n    </div>\n  </form>";

var isTooltipNode = function isTooltipNode(node) {
  if (!node || !isFunction$2(node.hasAttribute)) return false;
  return node.hasAttribute(TOOLTIP_ATTR);
};
/** @typedef {import('jodit').IJodit} Jodit */

/** @typedef {import('jodit').IToolbarButton} Button */

/** @typedef {import('jodit').IControlType<Jodit,Button} Control */


var TooltipPlugin =
/*#__PURE__*/
function () {
  _createClass(TooltipPlugin, null, [{
    key: "pluginName",
    get: function get() {
      return 'tooltip';
    }
  }]);

  function TooltipPlugin() {
    _classCallCheck(this, TooltipPlugin);

    autoBind(this);
  }
  /**
   * @param {Config} config
   */


  _createClass(TooltipPlugin, [{
    key: "apply",
    value: function apply(_ref) {
      var controls = _ref.controls;
      controls[TOOLTIP_CONTROL] = {
        popup: this.createTooltipPopup,
        isDisable: this.isDisabled,
        isActive: this.isActive
      };
    }
    /**
     * @param {Jodit} jodit
     */

  }, {
    key: "isDisabled",
    value: function isDisabled(jodit) {
      var Jodit = jodit.constructor,
          editor = jodit.editor,
          selection = jodit.selection;
      if (!jodit.isInited || !selection.isFocused()) return;
      var start = selection.sel.anchorNode;
      if (start.nodeType !== Node.ELEMENT_NODE) start = start.parentElement;
      var Dom = Jodit.modules.Dom;
      return Dom.up(start, function (el) {
        return el.matches('table');
      }, editor);
    }
    /**
     * @param {Jodit} jodit
     */

  }, {
    key: "isActive",
    value: function isActive(jodit) {
      var Jodit = jodit.constructor,
          editor = jodit.editor,
          selection = jodit.selection;
      if (!jodit.isInited || !selection.isFocused()) return;
      var start = selection.sel.anchorNode;
      if (start.nodeType !== Node.ELEMENT_NODE) start = start.parentElement;
      var Dom = Jodit.modules.Dom;
      return Dom.up(start, function (el) {
        return el.matches(".".concat(TOOLTIP_CLASS));
      }, editor);
    }
    /**
     * @param {Jodit} jodit
     * @param {Node} current
     * @param {Control} self
     * @param {Function} close
     */

  }, {
    key: "createTooltipPopup",
    value: function createTooltipPopup(jodit, current, self, close) {
      var _this = this;

      var Jodit = jodit.constructor,
          events = jodit.events,
          selection = jodit.selection;
      var val = Jodit.modules.Helpers.val;
      var form = jodit.create.fromHTML(TOOLTIP_POPUP_FORM);
      var deleteButton = form.querySelector('button[name=delete]');
      current = Jodit.modules.Dom.up(current, isTooltipNode, jodit.editor);

      if (current) {
        var tooltipValue = current.getAttribute(TOOLTIP_ATTR) || '';
        val(form, 'textarea[name=tooltip]', tooltipValue);
        val(form, 'input[name=text]', current.innerText);
      } else {
        var sel = selection.sel;
        val(form, 'input[name=text]', sel ? sel.toString() : '');
        deleteButton.style.display = 'none';
      }

      this.selectionInfo = selection.save();
      events.on(form, 'submit', function (event) {
        return _this.attachTooltip(event, current, close);
      });
      events.on(deleteButton, 'click', function (event) {
        return _this.detachTooltip(event, current, close);
      });
      return form;
    }
    /**
     * @param {Event} event
     * @param {Node} current
     * @param {Function} close
     */

  }, {
    key: "attachTooltip",
    value: function attachTooltip(event, current, close) {
      var _this$jodit = this.jodit,
          Jodit = _this$jodit.constructor,
          selection = _this$jodit.selection;
      var val = Jodit.modules.Helpers.val;
      event.preventDefault();
      selection.restore(this.selectionInfo);
      this.selectionInfo = null;
      var tooltipElement = current || document.createElement(TOOLTIP_TAG);
      var tooltipValue = val(event.target, 'textarea[name=tooltip]');
      var innerText = val(event.target, 'input[name=text]');
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

  }, {
    key: "detachTooltip",
    value: function detachTooltip(event, current, close) {
      var _this$jodit2 = this.jodit,
          Jodit = _this$jodit2.constructor,
          selection = _this$jodit2.selection;
      event.preventDefault();
      if (current) Jodit.modules.Dom.unwrap(current);
      selection.restore(this.selectionInfo);
      this.selectionInfo = null;
      close();
    }
  }]);

  return TooltipPlugin;
}();

//
//       caused by: https://github.com/xdan/jodit/blob/3.2.55/src/modules/helpers/checker/isJoditObject.ts#L18

Object.defineProperty(Jodit, 'name', {
  value: 'Jodit'
});
var JODIT_READY_EVENT = 'joditReady';
/** @type {import('jodit/src/Config').Config & import('jodit/src/plugins')} */

var joditConfig = {
  autofocus: true,
  addNewLineOnDBLClick: false,
  showTooltipDelay: 350,
  colorPickerDefaultTab: 'color',
  disablePlugins: ['fullsize'],
  language: 'en'
};
extend(Jodit);
var plugins = [{
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
  use: MdiIconsPlugin
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
      "default": 'Insert text here...'
    },
    readonly: {
      type: Boolean,
      "default": false
    }
  },
  computed: {
    config: function config(vm) {
      return Object.assign({}, joditConfig, {
        minHeight: vm.minHeight,
        placeholder: vm.placeholder,
        plugins: plugins
      });
    }
  },
  methods: {
    input: function input(value) {
      var innerText = this.$refs.jodit.$el.innerText;
      return this.$emit('input', innerText ? value : '');
    }
  },
  watch: {
    readonly: function readonly(state) {
      var editor = this.$refs.jodit.editor;
      if (!editor) return;
      editor.setReadOnly(state);
      if (!state) editor.selection.focus();
    }
  },
  components: {
    JoditVue: JoditVue
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "jodit_wrapper"
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

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = "data-v-13b42c81";
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var JoditEditor = normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

//
var script$2 = {
  name: 'tce-jodit-html',
  props: {
    element: {
      type: Object,
      required: true
    },
    isFocused: {
      type: Boolean,
      "default": false
    },
    isDragged: {
      type: Boolean,
      "default": false
    },
    showPlaceholder: {
      type: Boolean,
      "default": true
    }
  },
  data: function data(vm) {
    var _ref, _vm$element, _vm$element$data;

    return {
      content: (_ref = (_vm$element = vm.element) === null || _vm$element === void 0 ? void 0 : (_vm$element$data = _vm$element.data) === null || _vm$element$data === void 0 ? void 0 : _vm$element$data.content) !== null && _ref !== void 0 ? _ref : '',
      readonly: false
    };
  },
  computed: {
    hasChanges: function hasChanges() {
      var _ref2, _this$element, _this$element$data;

      var previousValue = (_ref2 = (_this$element = this.element) === null || _this$element === void 0 ? void 0 : (_this$element$data = _this$element.data) === null || _this$element$data === void 0 ? void 0 : _this$element$data.content) !== null && _ref2 !== void 0 ? _ref2 : '';
      return previousValue !== this.content;
    }
  },
  methods: {
    save: function save() {
      if (!this.hasChanges) return;
      this.$emit('save', {
        content: this.content
      });
    }
  },
  watch: {
    element: function element(val) {
      var _this = this;

      // Make sure that component state is kept
      // until events (i.e. focusout => save) are triggered
      setTimeout(function () {
        var _ref3, _val$data;

        if (_this.isFocused) return;
        _this.content = (_ref3 = val === null || val === void 0 ? void 0 : (_val$data = val.data) === null || _val$data === void 0 ? void 0 : _val$data.content) !== null && _ref3 !== void 0 ? _ref3 : '';
      }, 0);
    },
    isFocused: function isFocused(val, oldVal) {
      if (oldVal && !val) this.save();
    },
    isDragged: function isDragged(state, oldState) {
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
    JoditEditor: JoditEditor
  }
};

/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "tce-jodit-html"
  }, [!_vm.isFocused && !_vm.content && _vm.showPlaceholder ? _c('div', {
    staticClass: "well jodit-html-placeholder"
  }, [_vm._m(0)]) : [_vm.isFocused ? _c('jodit-editor', {
    attrs: {
      "min-height": _vm.$el.clientHeight,
      "readonly": _vm.readonly
    },
    model: {
      value: _vm.content,
      callback: function callback($$v) {
        _vm.content = $$v;
      },
      expression: "content"
    }
  }) : _c('div', {
    staticClass: "jodit_container"
  }, [_c('div', {
    staticClass: "jodit_wysiwyg",
    domProps: {
      "innerHTML": _vm._s(_vm.content)
    }
  })])]], 2);
};

var __vue_staticRenderFns__$2 = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "message"
  }, [_c('span', {
    staticClass: "heading"
  }, [_vm._v("Text placeholder")]), _vm._v(" "), _c('span', [_vm._v("Click to edit")])]);
}];
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = "data-v-fe3f9eb6";
/* module identifier */

var __vue_module_identifier__$2 = undefined;
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var Edit = normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

var initState = function initState() {
  return {
    content: ''
  };
};

var index = {
  name: 'Html',
  type: 'JODIT_HTML',
  version: '1.0',
  initState: initState,
  Edit: Edit,
  Toolbar: Toolbar,
  ui: {
    icon: 'mdi-text',
    forceFullWidth: false
  }
};

export default index;
