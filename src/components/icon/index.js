import uniqueId from "lodash/uniqueId";
import Component from "../classes/index";

/**
 * Icon component
 *
 * @class
 */
export default class IconComponent extends Component {
  static VIEW_CLASS_NAME = "app-icon";
  constructor(cfg = {}) {
    const id =
      cfg.attributes && cfg.attributes.id
        ? cfg.attributes.id
        : cfg.id || uniqueId("icon:view");
    super({
      tagName: "button",
      className: `${IconComponent.VIEW_CLASS_NAME} ${cfg.className || ""} ${
        cfg.hidden ? "view-hidden" : ""
      }`,
      attributes: {
        type: "button",
        ...(cfg.buttonAttributes || {}),
        id,
      },
      on: cfg.on || {},
    });
    this._iconAttributes = cfg.attributes || {};
    this._icon = cfg.icon || "";
    this.renderIcon();
  }

  renderIcon() {
    this.createComponent();
    this._attachEvents();
    this.element.append(this.iconView.element);
  }

  get iconAttributes() {
    return this._iconAttributes;
  }

  get iconView() {
    if (!this._iconView) {
      this._iconView = new Component({
        tagName: "i",
        className: `mdi ${this.icon || ""}`,
        attributes: this.iconAttributes,
      });
      this._iconView.createComponent();
    }
    return this._iconView;
  }

  get icon() {
    return this._icon;
  }

  set icon(icon) {
    this._icon = icon;
  }

  changeIcon(icon) {
    if (icon != this.icon) {
      const classList = this.iconView.element.classList;
      classList.add(icon);
      classList.remove(this.icon);
      this.icon = icon;
    }
  }
}
