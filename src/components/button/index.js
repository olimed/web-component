import uniqueId from "lodash/uniqueId";
import Component from "../classes/index";

/**
 * Button component
 *
 * @class
 */
export default class ButtonComponent extends Component {
  static VIEW_CLASS_NAME = "app-button";
  constructor(cfg) {
    const id =
      cfg.attributes && cfg.attributes.id
        ? cfg.attributes.id
        : cfg.id || uniqueId("button:view");
    super({
      tagName: "button",
      className: `${ButtonComponent.VIEW_CLASS_NAME} ${cfg.className || ""} ${
        cfg.hidden ? "view-hidden" : ""
      }`,
      hidden: cfg.hidden,
      attributes: {
        ...(cfg.attributes || {}),
        id,
      },
      on: cfg.on || {},
    });
    this._innerText = cfg.label || "Button";
    this.renderButton();
  }

  renderButton() {
    this.createComponent();
    this._attachEvents();
    this.setInnerText(this.innerText);
  }

  get innerText() {
    return this._innerText || "";
  }

  set innerText(text) {
    this._innerText = text;
  }
}
