/** @typedef {import('jodit').IJodit} Jodit */

const LINK_INPUT_SELECTOR = 'div.jodit_toolbar_popup-open input[name="url"]';

export default class LinkPlugin {
  static get pluginName() {
    return 'links';
  }

  /**
   * @param {Jodit} jodit
   */
  init(jodit) {
    jodit.registerCommand('link', {
      exec: () => {
        jodit.events.fire('click-link-btn', new Event('link'));
        setTimeout(() => {
          const input = jodit.toolbar.container.querySelector(LINK_INPUT_SELECTOR);
          if (input) input.focus();
        });
      },
      hotkeys: ['ctrl+k', 'cmd+k']
    });
  }
}
