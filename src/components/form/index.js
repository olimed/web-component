import uniqueId from "lodash/uniqueId";
import Component from "../classes/index";

/**
 * Form component
 *
 * @class
 */
export default class FormComponent extends Component {
  static VIEW_CLASS_NAME = "app-form";
  constructor(cfg = {}) {
    const id =
      cfg.attributes && cfg.attributes.id
        ? cfg.attributes.id
        : cfg.id || uniqueId("form:view");
    super({
      tagName: "form",
      className: `${FormComponent.VIEW_CLASS_NAME} ${cfg.className || ""} ${
        cfg.hidden ? "view-hidden" : ""
      }`,
      attributes: {
        ...(cfg.attributes || {}),
        id,
      },
      on: cfg.on || {},
    });
    this._elements = cfg.elements || [];
    this.renderForm();
  }

  renderForm() {
    this.createComponent();
    this.setElements();
    this._attachEvents();
  }

  get elements() {
    return this._elements;
  }

  set elements(els) {
    this._elements = els;
  }

  setElements() {
    this.elements.forEach((el) => {
      this.element.append(el.element || el.createComponent());
    });
  }
}
