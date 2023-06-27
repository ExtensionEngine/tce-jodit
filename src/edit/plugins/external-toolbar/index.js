import autoBind from 'auto-bind';

const isString = arg => typeof arg === 'string';
const splitArray = arg => (isString(arg) ? arg.split(/[,\s]+/) : arg);

/** @typedef {import('jodit/src/Config').Config & import('jodit/src/plugins')} Config */
/** @typedef {import('jodit').IJodit} Jodit */

export default class ExternalToolbarPlugin {
  static get pluginName() {
    return 'external-toolbar';
  }

  constructor(options) {
    options.readyEvent = options.readyEvent || 'ready';
    autoBind(this);
  }

  /**
   * @param {Config} config
   */
  apply(config) {
    config.toolbar = false;
    this.options.buttons = splitArray(config.buttons).concat(
      config.extraButtons
    );
  }

  /**
   * @param {Jodit} jodit
   */
  init(jodit) {
    jodit.setPanel(this.options.toolbarContainer);
  }
}
