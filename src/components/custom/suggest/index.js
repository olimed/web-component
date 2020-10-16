import uniqueId from "lodash/uniqueId";
import { EVENT_NAMES } from "../../../const/index";
import Component from "../../classes/index";

/**
 * Suggest component (popup with items)
 *
 * @class
 */
export default class Suggest extends Component {
  constructor(cfg = {}) {
    const id =
      cfg.attributes && cfg.attributes.id
        ? cfg.attributes.id
        : cfg.id || uniqueId("suggest:view");
    super({
      tagName: "div",
      className: `${cfg.className || ""} ${cfg.hidden ? "view-hidden" : ""}`,
      attributes: {
        id,
        ...(cfg.attributes || {}),
      },
      on: {
        ...(cfg.on || {}),
      },
    });
    this._selectEvent =
      cfg.on && cfg.on.onItemClick ? cfg.on.onItemClick : false;
    this._options = cfg.options || [];
    this.renderSuggest();
  }

  renderSuggest() {
    this.createComponent();
    this._attachEvents();
  }

  get options() {
    return this._options;
  }

  set options(options) {
    this._options = options;
  }

  get selectEvent() {
    return this._selectEvent;
  }

  setListWithOptions(val) {
    this.closeAllLists();
    if (!val) return false;
    this.options.forEach((option) => {
      if (
        val ||
        option.value.toString().toLowerCase().indexOf(val.toLowerCase()) !== -1
      ) {
        const optionView = new Component({
          className: `list-item suggest-items ${
            option.select ? "suggest-selected-item" : ""
          }`,
          attributes: {
            id: option.id || uniqueId("suggest:item:id"),
            tabIndex: 0,
          },
          on: this.selectEvent
            ? { [EVENT_NAMES.CLICK]: (e) => this.selectEvent(e, option) }
            : {},
        });
        optionView.createComponent();
        optionView._attachEvents();
        optionView.element.textContent = option.value;

        this.element.appendChild(optionView.element);
      }
    });
    return true;
  }

  closeAllLists(el) {
    const items = [...this.element.children];
    for (let node of items) {
      if (el != node) this.element.removeChild(node);
    }
  }

  getSelectedItems() {
    return this.options.filter((o) => o.select);
  }

  changeStateItem(id, state) {
    const option = this.options.find((o) => o.id === id);
    option.select = !!state;
    const node = document.getElementById(id);
    if (node) {
      node.classList[state ? "add" : "remove"]("suggest-selected-item");
    }
  }

  getItem(id) {
    if (!id) {
      return false;
    }
    return this.options.find((o) => o.id === id);
  }
}
