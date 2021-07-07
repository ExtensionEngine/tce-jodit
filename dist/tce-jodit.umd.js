(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jodit-vue'), require('auto-bind'), require('brace'), require('js-beautify/js/src/html'), require('brace/mode/html'), require('brace/theme/chrome'), require('scrollparent')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jodit-vue', 'auto-bind', 'brace', 'js-beautify/js/src/html', 'brace/mode/html', 'brace/theme/chrome', 'scrollparent'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.__TAILOR_CONTENT_ELEMENTS__ = global.__TAILOR_CONTENT_ELEMENTS__ || {}, global.__TAILOR_CONTENT_ELEMENTS__['@extensionengine/tce-jodit'] = {}), global.joditVue, global.autoBind, global.ace, global.beautify, null, null, global.scrollparent));
}(this, (function (exports, joditVue, autoBind, ace, beautify, html, chrome, scrollparent) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var autoBind__default = /*#__PURE__*/_interopDefaultLegacy(autoBind);
  var ace__default = /*#__PURE__*/_interopDefaultLegacy(ace);
  var beautify__default = /*#__PURE__*/_interopDefaultLegacy(beautify);
  var scrollparent__default = /*#__PURE__*/_interopDefaultLegacy(scrollparent);

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

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, basedir, module) {
  	return module = {
  	  path: basedir,
  	  exports: {},
  	  require: function (path, base) {
        return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
      }
  	}, fn(module, module.exports), module.exports;
  }

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = _freeGlobal || freeSelf || Function('return this')();

  var _root = root;

  /**
   * Gets the timestamp of the number of milliseconds that have elapsed since
   * the Unix epoch (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Date
   * @returns {number} Returns the timestamp.
   * @example
   *
   * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
   * // => Logs the number of milliseconds it took for the deferred invocation.
   */
  var now = function() {
    return _root.Date.now();
  };

  var now_1 = now;

  /** Built-in value references. */
  var Symbol$1 = _root.Symbol;

  var _Symbol = Symbol$1;

  /** Used for built-in method references. */
  var objectProto$c = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$9 = objectProto$c.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$c.toString;

  /** Built-in value references. */
  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty$9.call(value, symToStringTag$1),
        tag = value[symToStringTag$1];

    try {
      value[symToStringTag$1] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag;

  /** Used for built-in method references. */
  var objectProto$b = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto$b.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }

  var _objectToString = objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag && symToStringTag in Object(value))
      ? _getRawTag(value)
      : _objectToString(value);
  }

  var _baseGetTag = baseGetTag;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike;

  /** `Object#toString` result references. */
  var symbolTag$2 = '[object Symbol]';

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return typeof value == 'symbol' ||
      (isObjectLike_1(value) && _baseGetTag(value) == symbolTag$2);
  }

  var isSymbol_1 = isSymbol;

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol_1(value)) {
      return NAN;
    }
    if (isObject_1(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject_1(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : (reIsBadHex.test(value) ? NAN : +value);
  }

  var toNumber_1 = toNumber;

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max,
      nativeMin = Math.min;

  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was
   * invoked. The debounced function comes with a `cancel` method to cancel
   * delayed `func` invocations and a `flush` method to immediately invoke them.
   * Provide `options` to indicate whether `func` should be invoked on the
   * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
   * with the last arguments provided to the debounced function. Subsequent
   * calls to the debounced function return the result of the last `func`
   * invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the debounced function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.debounce` and `_.throttle`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0] The number of milliseconds to delay.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=false]
   *  Specify invoking on the leading edge of the timeout.
   * @param {number} [options.maxWait]
   *  The maximum time `func` is allowed to be delayed before it's invoked.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // Avoid costly calculations while the window size is in flux.
   * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
   *
   * // Invoke `sendMail` when clicked, debouncing subsequent calls.
   * jQuery(element).on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
   *
   * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
   * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
   * var source = new EventSource('/stream');
   * jQuery(source).on('message', debounced);
   *
   * // Cancel the trailing debounced invocation.
   * jQuery(window).on('popstate', debounced.cancel);
   */
  function debounce(func, wait, options) {
    var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber_1(wait) || 0;
    if (isObject_1(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
      var args = lastArgs,
          thisArg = lastThis;

      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time;
      // Start the timer for the trailing edge.
      timerId = setTimeout(timerExpired, wait);
      // Invoke the leading edge.
      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          timeWaiting = wait - timeSinceLastCall;

      return maxing
        ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
        : timeWaiting;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime;

      // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.
      return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
        (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
    }

    function timerExpired() {
      var time = now_1();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      // Restart the timer.
      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined;

      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(now_1());
    }

    function debounced() {
      var time = now_1(),
          isInvoking = shouldInvoke(time);

      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          clearTimeout(timerId);
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }

  var debounce_1 = debounce;

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

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  var _listCacheClear = listCacheClear;

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  var eq_1 = eq;

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq_1(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  var _assocIndexOf = assocIndexOf;

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  var _listCacheDelete = listCacheDelete;

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  var _listCacheGet = listCacheGet;

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return _assocIndexOf(this.__data__, key) > -1;
  }

  var _listCacheHas = listCacheHas;

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  var _listCacheSet = listCacheSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = _listCacheClear;
  ListCache.prototype['delete'] = _listCacheDelete;
  ListCache.prototype.get = _listCacheGet;
  ListCache.prototype.has = _listCacheHas;
  ListCache.prototype.set = _listCacheSet;

  var _ListCache = ListCache;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new _ListCache;
    this.size = 0;
  }

  var _stackClear = stackClear;

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);

    this.size = data.size;
    return result;
  }

  var _stackDelete = stackDelete;

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  var _stackGet = stackGet;

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  var _stackHas = stackHas;

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag$2 = '[object Function]',
      genTag$1 = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction$2(value) {
    if (!isObject_1(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = _baseGetTag(value);
    return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction$2;

  /** Used to detect overreaching core-js shims. */
  var coreJsData = _root['__core-js_shared__'];

  var _coreJsData = coreJsData;

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  var _isMasked = isMasked;

  /** Used for built-in method references. */
  var funcProto$1 = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString$1.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  var _toSource = toSource;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto = Function.prototype,
      objectProto$a = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString.call(hasOwnProperty$8).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject_1(value) || _isMasked(value)) {
      return false;
    }
    var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(_toSource(value));
  }

  var _baseIsNative = baseIsNative;

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  var _getValue = getValue;

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = _getValue(object, key);
    return _baseIsNative(value) ? value : undefined;
  }

  var _getNative = getNative;

  /* Built-in method references that are verified to be native. */
  var Map$1 = _getNative(_root, 'Map');

  var _Map = Map$1;

  /* Built-in method references that are verified to be native. */
  var nativeCreate = _getNative(Object, 'create');

  var _nativeCreate = nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
    this.size = 0;
  }

  var _hashClear = hashClear;

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  var _hashDelete = hashDelete;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$9 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (_nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED$1 ? undefined : result;
    }
    return hasOwnProperty$7.call(data, key) ? data[key] : undefined;
  }

  var _hashGet = hashGet;

  /** Used for built-in method references. */
  var objectProto$8 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$6.call(data, key);
  }

  var _hashHas = hashHas;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
    return this;
  }

  var _hashSet = hashSet;

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = _hashClear;
  Hash.prototype['delete'] = _hashDelete;
  Hash.prototype.get = _hashGet;
  Hash.prototype.has = _hashHas;
  Hash.prototype.set = _hashSet;

  var _Hash = Hash;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new _Hash,
      'map': new (_Map || _ListCache),
      'string': new _Hash
    };
  }

  var _mapCacheClear = mapCacheClear;

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  var _isKeyable = isKeyable;

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return _isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  var _getMapData = getMapData;

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    var result = _getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  var _mapCacheDelete = mapCacheDelete;

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return _getMapData(this, key).get(key);
  }

  var _mapCacheGet = mapCacheGet;

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return _getMapData(this, key).has(key);
  }

  var _mapCacheHas = mapCacheHas;

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    var data = _getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  var _mapCacheSet = mapCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = _mapCacheClear;
  MapCache.prototype['delete'] = _mapCacheDelete;
  MapCache.prototype.get = _mapCacheGet;
  MapCache.prototype.has = _mapCacheHas;
  MapCache.prototype.set = _mapCacheSet;

  var _MapCache = MapCache;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof _ListCache) {
      var pairs = data.__data__;
      if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new _MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }

  var _stackSet = stackSet;

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    var data = this.__data__ = new _ListCache(entries);
    this.size = data.size;
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = _stackClear;
  Stack.prototype['delete'] = _stackDelete;
  Stack.prototype.get = _stackGet;
  Stack.prototype.has = _stackHas;
  Stack.prototype.set = _stackSet;

  var _Stack = Stack;

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  var _arrayEach = arrayEach;

  var defineProperty = (function() {
    try {
      var func = _getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }());

  var _defineProperty = defineProperty;

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && _defineProperty) {
      _defineProperty(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  var _baseAssignValue = baseAssignValue;

  /** Used for built-in method references. */
  var objectProto$7 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$5.call(object, key) && eq_1(objValue, value)) ||
        (value === undefined && !(key in object))) {
      _baseAssignValue(object, key, value);
    }
  }

  var _assignValue = assignValue;

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});

    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];

      var newValue = customizer
        ? customizer(object[key], source[key], key, object, source)
        : undefined;

      if (newValue === undefined) {
        newValue = source[key];
      }
      if (isNew) {
        _baseAssignValue(object, key, newValue);
      } else {
        _assignValue(object, key, newValue);
      }
    }
    return object;
  }

  var _copyObject = copyObject;

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  var _baseTimes = baseTimes;

  /** `Object#toString` result references. */
  var argsTag$2 = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike_1(value) && _baseGetTag(value) == argsTag$2;
  }

  var _baseIsArguments = baseIsArguments;

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
    return isObjectLike_1(value) && hasOwnProperty$4.call(value, 'callee') &&
      !propertyIsEnumerable$1.call(value, 'callee');
  };

  var isArguments_1 = isArguments;

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  var isArray_1 = isArray;

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  var stubFalse_1 = stubFalse;

  var isBuffer_1 = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse_1;

  module.exports = isBuffer;
  });

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$1 : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  var _isIndex = isIndex;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  var isLength_1 = isLength;

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]',
      arrayTag$1 = '[object Array]',
      boolTag$2 = '[object Boolean]',
      dateTag$2 = '[object Date]',
      errorTag$1 = '[object Error]',
      funcTag$1 = '[object Function]',
      mapTag$4 = '[object Map]',
      numberTag$2 = '[object Number]',
      objectTag$2 = '[object Object]',
      regexpTag$2 = '[object RegExp]',
      setTag$4 = '[object Set]',
      stringTag$2 = '[object String]',
      weakMapTag$2 = '[object WeakMap]';

  var arrayBufferTag$2 = '[object ArrayBuffer]',
      dataViewTag$3 = '[object DataView]',
      float32Tag$2 = '[object Float32Array]',
      float64Tag$2 = '[object Float64Array]',
      int8Tag$2 = '[object Int8Array]',
      int16Tag$2 = '[object Int16Array]',
      int32Tag$2 = '[object Int32Array]',
      uint8Tag$2 = '[object Uint8Array]',
      uint8ClampedTag$2 = '[object Uint8ClampedArray]',
      uint16Tag$2 = '[object Uint16Array]',
      uint32Tag$2 = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] =
  typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] =
  typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] =
  typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] =
  typedArrayTags[uint32Tag$2] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] =
  typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] =
  typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] =
  typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
  typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] =
  typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] =
  typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] =
  typedArrayTags[weakMapTag$2] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike_1(value) &&
      isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
  }

  var _baseIsTypedArray = baseIsTypedArray;

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  var _baseUnary = baseUnary;

  var _nodeUtil = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && _freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  module.exports = nodeUtil;
  });

  /* Node.js helper references. */
  var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

  var isTypedArray_1 = isTypedArray;

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$5.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_1(value),
        isArg = !isArr && isArguments_1(value),
        isBuff = !isArr && !isArg && isBuffer_1(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? _baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$3.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             _isIndex(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  var _arrayLikeKeys = arrayLikeKeys;

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$4;

    return value === proto;
  }

  var _isPrototype = isPrototype;

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  var _overArg = overArg;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = _overArg(Object.keys, Object);

  var _nativeKeys = nativeKeys;

  /** Used for built-in method references. */
  var objectProto$3 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!_isPrototype(object)) {
      return _nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$2.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeys = baseKeys;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength_1(value.length) && !isFunction_1(value);
  }

  var isArrayLike_1 = isArrayLike;

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
  }

  var keys_1 = keys;

  /**
   * The base implementation of `_.assign` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssign(object, source) {
    return object && _copyObject(source, keys_1(source), object);
  }

  var _baseAssign = baseAssign;

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }

  var _nativeKeysIn = nativeKeysIn;

  /** Used for built-in method references. */
  var objectProto$2 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn(object) {
    if (!isObject_1(object)) {
      return _nativeKeysIn(object);
    }
    var isProto = _isPrototype(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$1.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeysIn = baseKeysIn;

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn$1(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
  }

  var keysIn_1 = keysIn$1;

  /**
   * The base implementation of `_.assignIn` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssignIn(object, source) {
    return object && _copyObject(source, keysIn_1(source), object);
  }

  var _baseAssignIn = baseAssignIn;

  var _cloneBuffer = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root.Buffer : undefined,
      allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length,
        result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

    buffer.copy(result);
    return result;
  }

  module.exports = cloneBuffer;
  });

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  var _copyArray = copyArray;

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  var _arrayFilter = arrayFilter;

  /**
   * This method returns a new empty array.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {Array} Returns the new empty array.
   * @example
   *
   * var arrays = _.times(2, _.stubArray);
   *
   * console.log(arrays);
   * // => [[], []]
   *
   * console.log(arrays[0] === arrays[1]);
   * // => false
   */
  function stubArray() {
    return [];
  }

  var stubArray_1 = stubArray;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbols = !nativeGetSymbols$1 ? stubArray_1 : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return _arrayFilter(nativeGetSymbols$1(object), function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    });
  };

  var _getSymbols = getSymbols;

  /**
   * Copies own symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbols(source, object) {
    return _copyObject(source, _getSymbols(source), object);
  }

  var _copySymbols = copySymbols;

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  var _arrayPush = arrayPush;

  /** Built-in value references. */
  var getPrototype = _overArg(Object.getPrototypeOf, Object);

  var _getPrototype = getPrototype;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own and inherited enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbolsIn = !nativeGetSymbols ? stubArray_1 : function(object) {
    var result = [];
    while (object) {
      _arrayPush(result, _getSymbols(object));
      object = _getPrototype(object);
    }
    return result;
  };

  var _getSymbolsIn = getSymbolsIn;

  /**
   * Copies own and inherited symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbolsIn(source, object) {
    return _copyObject(source, _getSymbolsIn(source), object);
  }

  var _copySymbolsIn = copySymbolsIn;

  /**
   * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
   * `keysFunc` and `symbolsFunc` to get the enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @param {Function} symbolsFunc The function to get the symbols of `object`.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
  }

  var _baseGetAllKeys = baseGetAllKeys;

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeys(object) {
    return _baseGetAllKeys(object, keys_1, _getSymbols);
  }

  var _getAllKeys = getAllKeys;

  /**
   * Creates an array of own and inherited enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeysIn(object) {
    return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
  }

  var _getAllKeysIn = getAllKeysIn;

  /* Built-in method references that are verified to be native. */
  var DataView = _getNative(_root, 'DataView');

  var _DataView = DataView;

  /* Built-in method references that are verified to be native. */
  var Promise$1 = _getNative(_root, 'Promise');

  var _Promise = Promise$1;

  /* Built-in method references that are verified to be native. */
  var Set = _getNative(_root, 'Set');

  var _Set = Set;

  /* Built-in method references that are verified to be native. */
  var WeakMap = _getNative(_root, 'WeakMap');

  var _WeakMap = WeakMap;

  /** `Object#toString` result references. */
  var mapTag$3 = '[object Map]',
      objectTag$1 = '[object Object]',
      promiseTag = '[object Promise]',
      setTag$3 = '[object Set]',
      weakMapTag$1 = '[object WeakMap]';

  var dataViewTag$2 = '[object DataView]';

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = _toSource(_DataView),
      mapCtorString = _toSource(_Map),
      promiseCtorString = _toSource(_Promise),
      setCtorString = _toSource(_Set),
      weakMapCtorString = _toSource(_WeakMap);

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag = _baseGetTag;

  // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
  if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
      (_Map && getTag(new _Map) != mapTag$3) ||
      (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
      (_Set && getTag(new _Set) != setTag$3) ||
      (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
    getTag = function(value) {
      var result = _baseGetTag(value),
          Ctor = result == objectTag$1 ? value.constructor : undefined,
          ctorString = Ctor ? _toSource(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString: return dataViewTag$2;
          case mapCtorString: return mapTag$3;
          case promiseCtorString: return promiseTag;
          case setCtorString: return setTag$3;
          case weakMapCtorString: return weakMapTag$1;
        }
      }
      return result;
    };
  }

  var _getTag = getTag;

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Initializes an array clone.
   *
   * @private
   * @param {Array} array The array to clone.
   * @returns {Array} Returns the initialized clone.
   */
  function initCloneArray(array) {
    var length = array.length,
        result = new array.constructor(length);

    // Add properties assigned by `RegExp#exec`.
    if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }

  var _initCloneArray = initCloneArray;

  /** Built-in value references. */
  var Uint8Array = _root.Uint8Array;

  var _Uint8Array = Uint8Array;

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
    return result;
  }

  var _cloneArrayBuffer = cloneArrayBuffer;

  /**
   * Creates a clone of `dataView`.
   *
   * @private
   * @param {Object} dataView The data view to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned data view.
   */
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }

  var _cloneDataView = cloneDataView;

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /**
   * Creates a clone of `regexp`.
   *
   * @private
   * @param {Object} regexp The regexp to clone.
   * @returns {Object} Returns the cloned regexp.
   */
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }

  var _cloneRegExp = cloneRegExp;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
      symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;

  /**
   * Creates a clone of the `symbol` object.
   *
   * @private
   * @param {Object} symbol The symbol object to clone.
   * @returns {Object} Returns the cloned symbol object.
   */
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }

  var _cloneSymbol = cloneSymbol;

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  var _cloneTypedArray = cloneTypedArray;

  /** `Object#toString` result references. */
  var boolTag$1 = '[object Boolean]',
      dateTag$1 = '[object Date]',
      mapTag$2 = '[object Map]',
      numberTag$1 = '[object Number]',
      regexpTag$1 = '[object RegExp]',
      setTag$2 = '[object Set]',
      stringTag$1 = '[object String]',
      symbolTag$1 = '[object Symbol]';

  var arrayBufferTag$1 = '[object ArrayBuffer]',
      dataViewTag$1 = '[object DataView]',
      float32Tag$1 = '[object Float32Array]',
      float64Tag$1 = '[object Float64Array]',
      int8Tag$1 = '[object Int8Array]',
      int16Tag$1 = '[object Int16Array]',
      int32Tag$1 = '[object Int32Array]',
      uint8Tag$1 = '[object Uint8Array]',
      uint8ClampedTag$1 = '[object Uint8ClampedArray]',
      uint16Tag$1 = '[object Uint16Array]',
      uint32Tag$1 = '[object Uint32Array]';

  /**
   * Initializes an object clone based on its `toStringTag`.
   *
   * **Note:** This function only supports cloning values with tags of
   * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {string} tag The `toStringTag` of the object to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag$1:
        return _cloneArrayBuffer(object);

      case boolTag$1:
      case dateTag$1:
        return new Ctor(+object);

      case dataViewTag$1:
        return _cloneDataView(object, isDeep);

      case float32Tag$1: case float64Tag$1:
      case int8Tag$1: case int16Tag$1: case int32Tag$1:
      case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
        return _cloneTypedArray(object, isDeep);

      case mapTag$2:
        return new Ctor;

      case numberTag$1:
      case stringTag$1:
        return new Ctor(object);

      case regexpTag$1:
        return _cloneRegExp(object);

      case setTag$2:
        return new Ctor;

      case symbolTag$1:
        return _cloneSymbol(object);
    }
  }

  var _initCloneByTag = initCloneByTag;

  /** Built-in value references. */
  var objectCreate = Object.create;

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  var baseCreate = (function() {
    function object() {}
    return function(proto) {
      if (!isObject_1(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object;
      object.prototype = undefined;
      return result;
    };
  }());

  var _baseCreate = baseCreate;

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    return (typeof object.constructor == 'function' && !_isPrototype(object))
      ? _baseCreate(_getPrototype(object))
      : {};
  }

  var _initCloneObject = initCloneObject;

  /** `Object#toString` result references. */
  var mapTag$1 = '[object Map]';

  /**
   * The base implementation of `_.isMap` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   */
  function baseIsMap(value) {
    return isObjectLike_1(value) && _getTag(value) == mapTag$1;
  }

  var _baseIsMap = baseIsMap;

  /* Node.js helper references. */
  var nodeIsMap = _nodeUtil && _nodeUtil.isMap;

  /**
   * Checks if `value` is classified as a `Map` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   * @example
   *
   * _.isMap(new Map);
   * // => true
   *
   * _.isMap(new WeakMap);
   * // => false
   */
  var isMap = nodeIsMap ? _baseUnary(nodeIsMap) : _baseIsMap;

  var isMap_1 = isMap;

  /** `Object#toString` result references. */
  var setTag$1 = '[object Set]';

  /**
   * The base implementation of `_.isSet` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   */
  function baseIsSet(value) {
    return isObjectLike_1(value) && _getTag(value) == setTag$1;
  }

  var _baseIsSet = baseIsSet;

  /* Node.js helper references. */
  var nodeIsSet = _nodeUtil && _nodeUtil.isSet;

  /**
   * Checks if `value` is classified as a `Set` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   * @example
   *
   * _.isSet(new Set);
   * // => true
   *
   * _.isSet(new WeakSet);
   * // => false
   */
  var isSet = nodeIsSet ? _baseUnary(nodeIsSet) : _baseIsSet;

  var isSet_1 = isSet;

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG$1 = 1,
      CLONE_FLAT_FLAG = 2,
      CLONE_SYMBOLS_FLAG$1 = 4;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
  cloneableTags[boolTag] = cloneableTags[dateTag] =
  cloneableTags[float32Tag] = cloneableTags[float64Tag] =
  cloneableTags[int8Tag] = cloneableTags[int16Tag] =
  cloneableTags[int32Tag] = cloneableTags[mapTag] =
  cloneableTags[numberTag] = cloneableTags[objectTag] =
  cloneableTags[regexpTag] = cloneableTags[setTag] =
  cloneableTags[stringTag] = cloneableTags[symbolTag] =
  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] =
  cloneableTags[weakMapTag] = false;

  /**
   * The base implementation of `_.clone` and `_.cloneDeep` which tracks
   * traversed objects.
   *
   * @private
   * @param {*} value The value to clone.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Deep clone
   *  2 - Flatten inherited properties
   *  4 - Clone symbols
   * @param {Function} [customizer] The function to customize cloning.
   * @param {string} [key] The key of `value`.
   * @param {Object} [object] The parent object of `value`.
   * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
   * @returns {*} Returns the cloned value.
   */
  function baseClone(value, bitmask, customizer, key, object, stack) {
    var result,
        isDeep = bitmask & CLONE_DEEP_FLAG$1,
        isFlat = bitmask & CLONE_FLAT_FLAG,
        isFull = bitmask & CLONE_SYMBOLS_FLAG$1;

    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== undefined) {
      return result;
    }
    if (!isObject_1(value)) {
      return value;
    }
    var isArr = isArray_1(value);
    if (isArr) {
      result = _initCloneArray(value);
      if (!isDeep) {
        return _copyArray(value, result);
      }
    } else {
      var tag = _getTag(value),
          isFunc = tag == funcTag || tag == genTag;

      if (isBuffer_1(value)) {
        return _cloneBuffer(value, isDeep);
      }
      if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
        result = (isFlat || isFunc) ? {} : _initCloneObject(value);
        if (!isDeep) {
          return isFlat
            ? _copySymbolsIn(value, _baseAssignIn(result, value))
            : _copySymbols(value, _baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = _initCloneByTag(value, tag, isDeep);
      }
    }
    // Check for circular references and return its corresponding clone.
    stack || (stack = new _Stack);
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);

    if (isSet_1(value)) {
      value.forEach(function(subValue) {
        result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
      });
    } else if (isMap_1(value)) {
      value.forEach(function(subValue, key) {
        result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
    }

    var keysFunc = isFull
      ? (isFlat ? _getAllKeysIn : _getAllKeys)
      : (isFlat ? keysIn : keys_1);

    var props = isArr ? undefined : keysFunc(value);
    _arrayEach(props || value, function(subValue, key) {
      if (props) {
        key = subValue;
        subValue = value[key];
      }
      // Recursively populate clone (susceptible to call stack limits).
      _assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
    return result;
  }

  var _baseClone = baseClone;

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG = 1,
      CLONE_SYMBOLS_FLAG = 4;

  /**
   * This method is like `_.clone` except that it recursively clones `value`.
   *
   * @static
   * @memberOf _
   * @since 1.0.0
   * @category Lang
   * @param {*} value The value to recursively clone.
   * @returns {*} Returns the deep cloned value.
   * @see _.clone
   * @example
   *
   * var objects = [{ 'a': 1 }, { 'b': 2 }];
   *
   * var deep = _.cloneDeep(objects);
   * console.log(deep[0] === objects[0]);
   * // => false
   */
  function cloneDeep(value) {
    return _baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
  }

  var cloneDeep_1 = cloneDeep;

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  var _arrayMap = arrayMap;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = _Symbol ? _Symbol.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }
    if (isArray_1(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return _arrayMap(value, baseToString) + '';
    }
    if (isSymbol_1(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
  }

  var _baseToString = baseToString;

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString(value) {
    return value == null ? '' : _baseToString(value);
  }

  var toString_1 = toString;

  /** Used to generate unique IDs. */
  var idCounter = 0;

  /**
   * Generates a unique ID. If `prefix` is given, the ID is appended to it.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {string} [prefix=''] The value to prefix the ID with.
   * @returns {string} Returns the unique ID.
   * @example
   *
   * _.uniqueId('contact_');
   * // => 'contact_104'
   *
   * _.uniqueId();
   * // => '105'
   */
  function uniqueId(prefix) {
    var id = ++idCounter;
    return toString_1(prefix) + id;
  }

  var uniqueId_1 = uniqueId;

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
        this.__plugins[uniqueId_1('plugin_proxy__')] = new PluginProxy(plugin, this); // Apply plugin on jodit options.

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
    return Object.fromEntries(keysIn_1(options).map(key => {
      const value = options[key];
      if (shared.includes(key)) return [key, value];
      return [key, cloneDeep_1(value)];
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
      config.language = uniqueId_1(`${language}_`);
      Jodit.lang[config.language] = cloneDeep_1(Jodit.lang[language]);
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
    if (!node || !isFunction_1(node.hasAttribute)) return false;
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

      content: debounce_1(function () {
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

  Object.defineProperty(exports, '__esModule', { value: true });

})));
