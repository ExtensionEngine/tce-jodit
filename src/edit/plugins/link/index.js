/** @typedef {import('jodit').IJodit} Jodit */

export default class LinkPlugin {
  static get pluginName() {
    return 'links';
  }

  /**
   * @param {Jodit} jodit
   */
  init(jodit) {
    jodit.registerCommand('link', {
      exec: () => jodit.events.fire('click-link-btn', new Event('link')),
      hotkeys: ['ctrl+k', 'cmd+k']
    });
  }
}
