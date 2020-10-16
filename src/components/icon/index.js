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
      tagName: "i",
      className: `${IconComponent.VIEW_CLASS_NAME} ${cfg.className || ""} mdi ${
        cfg.icon || ""
      } ${cfg.hidden ? "view-hidden" : ""}`,
      attributes: {
        ...(cfg.attributes || {}),
        id,
      },
      on: cfg.on || {},
    });
    this._icon = cfg.icon || "";
    this.renderIcon();
  }

  renderIcon() {
    this.createComponent();
    this._attachEvents();
  }

  get events() {
    return this._events;
  }

  get icon() {
    return this._icon;
  }

  set icon(icon) {
    this._icon = icon;
  }

  changeIcon(icon) {
    if (icon != this.icon) {
      const classList = this.element.classList;
      classList.add(icon);
      classList.remove(this.icon);
      this.icon = icon;
    }
  }
}
