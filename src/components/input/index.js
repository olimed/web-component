import uniqueId from "lodash/uniqueId";
import Component from "../classes/index";

/**
 * Input component
 *
 * @class
 */
export default class InputComponent extends Component {
  static VIEW_CLASS_NAME = "app-input";
  constructor(cfg = {}) {
    const id =
      cfg.attributes && cfg.attributes.id
        ? cfg.attributes.id
        : cfg.id || uniqueId("input:view");
    super({
      tagName: "input",
      className: `${InputComponent.VIEW_CLASS_NAME} ${cfg.className || ""} ${
        cfg.hidden ? "view-hidden" : ""
      }`,
      attributes: {
        ...(cfg.attributes || {}),
        id,
      },
      on: cfg.on || {},
    });
    this.renderInput();
  }

  renderInput() {
    this.createComponent();
    this._attachEvents();
  }
}
