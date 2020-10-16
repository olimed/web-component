import uniqueId from "lodash/uniqueId";
import { EVENT_NAMES } from "../../const/index";

/**
 * Component which render DOM elements
 *
 * @class
 */
export default class Component {
  constructor(cfg = {}) {
    this._tag = cfg.tagName || "div";
    this._id =
      cfg.attributes && cfg.attributes.id
        ? cfg.attributes.id
        : cfg.id || uniqueId(`${this.tagName}:view`);
    this._hidden = !!cfg.hidden;
    this._className = `${cfg.className || ""} ${
      this.hidden ? "view-hidden" : ""
    }`;
    this._attributes = {
      ...(cfg.attributes || {}),
      id: this.id,
    };
    this._events = cfg.on || {};
  }

  get id() {
    return this._id;
  }

  get tagName() {
    return this._tag;
  }

  get className() {
    return this._className;
  }

  get attributes() {
    return this._attributes;
  }

  get hidden() {
    return this._hidden;
  }

  set hidden(value) {
    this._hidden = !!value;
  }

  get events() {
    return this._events;
  }

  createComponent() {
    this.element = document.createElement(this.tagName);
    this.element.className = this.className;
    Object.keys(this.attributes).forEach((attribute) => {
      this.element.setAttribute(attribute, this.attributes[attribute]);
    });

    return this.element;
  }

  renderComponent(parentNode, type) {
    parentNode[type](this.element);
  }

  addChild(component) {
    this.element.appendChild(component);
  }

  setInnerText(text) {
    this.element.textContent = text;
  }

  remove() {
    this.element.parentNode.removeChild(this.element);
  }

  hide() {
    this.changeVisiableState(true);
  }

  show() {
    this.changeVisiableState();
  }

  changeVisiableState(state) {
    this.hidden = !!state;
    const classList = this.element.classList;
    classList[state ? "add" : "remove"]("view-hidden");
    classList[state ? "remove" : "add"]("view-show");
  }

  _attachEvents() {
    Object.values(EVENT_NAMES).forEach((eventName) => {
      if (this.events[eventName]) {
        this.element[eventName] = this.events[eventName];
      }
    });
  }

  attachEvent(name, callback) {
    this.element[name] = callback;
  }
}
