import autoBind from 'auto-bind';
import isFunction from 'lodash/isFunction';

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
  if (!node || !isFunction(node.hasAttribute)) return false;
  return node.hasAttribute(TOOLTIP_ATTR);
};

const isHtmlElement = el => el && el instanceof HTMLElement;

/** @typedef {import('jodit').IJodit} Jodit */
/** @typedef {import('jodit').IToolbarButton} Button */
/** @typedef {import('jodit').IControlType<Jodit,Button} Control */

export default class TooltipPlugin {
  static get pluginName() {
    return 'tooltip';
  }

  constructor() {
    autoBind(this);
  }

  /**
   * @param {Config} config
   */
  apply({ controls }) {
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
    const { constructor: Jodit, editor, selection } = jodit;
    if (!jodit.isInited || !selection.isFocused()) return;
    let start = selection.sel.anchorNode;
    if (start.nodeType !== Node.ELEMENT_NODE) start = start.parentElement;
    const { Dom } = Jodit.modules;
    return Dom.up(
      start,
      el => isHtmlElement(el) && el.matches('table'),
      editor
    );
  }

  /**
   * @param {Jodit} jodit
   */
  isActive(jodit) {
    const { constructor: Jodit, editor, selection } = jodit;
    if (!jodit.isInited || !selection.isFocused()) return;
    let start = selection.sel.anchorNode;
    if (start.nodeType !== Node.ELEMENT_NODE) start = start.parentElement;
    const { Dom } = Jodit.modules;
    return Dom.up(
      start,
      el => isHtmlElement(el) && el.matches(`.${TOOLTIP_CLASS}`),
      editor
    );
  }

  /**
   * @param {Jodit} jodit
   * @param {Node} current
   * @param {Control} self
   * @param {Function} close
   */
  createTooltipPopup(jodit, current, self, close) {
    const { constructor: Jodit, events, selection } = jodit;
    const { val } = Jodit.modules.Helpers;
    const form = jodit.create.fromHTML(TOOLTIP_POPUP_FORM);
    const deleteButton = form.querySelector('button[name=delete]');
    current = Jodit.modules.Dom.up(current, isTooltipNode, jodit.editor);
    if (current) {
      const tooltipValue = current.getAttribute(TOOLTIP_ATTR) || '';
      val(form, 'textarea[name=tooltip]', tooltipValue);
      val(form, 'input[name=text]', current.innerText);
    } else {
      const { sel } = selection;
      val(form, 'input[name=text]', sel ? sel.toString() : '');
      deleteButton.style.display = 'none';
    }

    this.selectionInfo = selection.save();
    events.on(form, 'submit', event =>
      this.attachTooltip(event, current, close)
    );
    events.on(deleteButton, 'click', event =>
      this.detachTooltip(event, current, close)
    );

    return form;
  }

  /**
   * @param {Event} event
   * @param {Node} current
   * @param {Function} close
   */
  attachTooltip(event, current, close) {
    const { constructor: Jodit, selection } = this.jodit;
    const { val } = Jodit.modules.Helpers;
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
    const { constructor: Jodit, selection } = this.jodit;
    event.preventDefault();
    if (current) Jodit.modules.Dom.unwrap(current);
    selection.restore(this.selectionInfo);
    this.selectionInfo = null;
    close();
  }
}
