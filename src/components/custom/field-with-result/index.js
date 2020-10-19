import uniqueId from "lodash/uniqueId";
import Component from "../../classes/index";
import IconComponent from "../../icon/index";

/**
 * Component with text value and icon inside
 *
 * @class
 */
export default class ResultField extends Component {
  static VIEW_CLASS_NAME = "app-result-field-items";
  constructor(cfg = { icon: {}, innerText: {} }) {
    const id =
      cfg.attributes && cfg.attributes.id
        ? cfg.attributes.id
        : cfg.id || uniqueId("result:field");
    super({
      tagName: "div",
      className: `${ResultField.VIEW_CLASS_NAME} ${cfg.className || ""} ${
        cfg.hidden ? "view-hidden" : ""
      }`,
      attributes: {
        ...(cfg.attributes || {}),
        id,
      },
      on: cfg.on || {},
    });
    this._innerText = new Component({
      tagName: "span",
      className: cfg.innerText.class || "",
      attributes: {
        ...(cfg.innerText.attributes || {}),
      },
      on: cfg.innerText.on || {},
    });
    this._icon = cfg.icon
      ? new IconComponent({
          icon: cfg.icon.icon || "mdi mdi-close-outline",
          className: cfg.icon.class || "close-icon",
          attributes: {
            ...(cfg.icon.attributes || {}),
          },
          on: cfg.icon.on || {},
        })
      : cfg.icon;
    this._value = cfg.value || "";
    this.render();
  }

  render() {
    this.createComponent();
    this._attachEvents();
    this.appendChilds();
  }

  get iconView() {
    return this._icon || "";
  }

  get innerTextView() {
    this._innerText.createComponent();
    this._innerText._attachEvents();
    this._innerText.element.textContent = this._value;
    return this._innerText || "";
  }

  get childs() {
    this._childs = [this.innerTextView, this.iconView];
    return this._childs;
  }

  appendChilds() {
    this.childs.forEach((child) => {
      if (child) {
        this.element.append(child.element);
      }
    });
  }

  removeView() {
    this.remove(this.id);
  }
}
