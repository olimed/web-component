import uniqueId from "lodash/uniqueId";
import { TYPES_OF_INSERT, EVENT_NAMES, VIEW_NAMES } from "../../../const/index";
import FormComponent from "../../form/index";
import ButtonComponent from "../../button/index";
import IconComponent from "../../icon/index";
import InputComponent from "../../input/index";
import ResultField from "../field-with-result/index";
import Suggest from "../suggest/index";
import Component from "../../classes/index";

/**
 * Multiselect component
 *
 * @class
 */
export default class MultiSelectComponent extends FormComponent {
  static VIEW_CLASS_NAME = "app-multiselect";
  constructor(cfg = {}) {
    const id =
      cfg.attributes && cfg.attributes.id
        ? cfg.attributes.id
        : cfg.id || uniqueId("multiselect:view");
    super({
      className: `${MultiSelectComponent.VIEW_CLASS_NAME} ${
        cfg.className || ""
      }`,
      attributes: {
        ...(cfg.attributes || {}),
        id,
      },
    });
    this._options = cfg.options || [];
    this._parentNode = cfg.parentNode || document.body;
    this.renderMultiselect();
  }

  renderMultiselect() {
    this.renderElements();
    this.renderComponent(this.parentNode, TYPES_OF_INSERT.APPEND);
    this._renderDefaultState();
    this.events();
  }

  renderElements() {
    this.elements = [
      this.fieldWithSelectedItems,
      this.wrapperInputField,
      this.selectIconView,
      this.clearButtonView,
    ];
    this.setElements();
  }

  _renderDefaultState() {
    const node = this.fieldWithSelectedItems.element;
    if (node) {
      this.defaultView.renderComponent(node, TYPES_OF_INSERT.APPEND);
    }
  }

  get mainFieldId() {
    if (!this._mainFieldId) {
      this._mainFieldId = uniqueId("main:selected:field");
    }
    return this._mainFieldId;
  }

  get parentNode() {
    return this._parentNode;
  }

  get fieldWithSelectedItems() {
    if (!this._fieldWithSelectedItems) {
      this._fieldWithSelectedItems = new Component({
        className: "selected-item",
        attributes: {
          id: this.mainFieldId,
        },
      });
      this._fieldWithSelectedItems.createComponent();
    }
    return this._fieldWithSelectedItems;
  }

  get wrapperInputId() {
    if (!this._wrapperInputId) {
      this._wrapperInputId = uniqueId("wrapper:input:div");
    }
    return this._wrapperInputId;
  }

  get wrapperInputField() {
    if (!this._wrapperInputField) {
      this._wrapperInputField = new Component({
        className: "wrapper",
        attributes: {
          id: this.wrapperInputId,
        },
      });
      this._wrapperInputField
        .createComponent()
        .appendChild(this.searchInputView.element);
    }
    return this._wrapperInputField;
  }

  get searchInputId() {
    if (!this._searchInputId) {
      this._searchInputId = uniqueId("search:input:view");
    }
    return this._searchInputId;
  }

  get searchInputView() {
    if (!this._searchInputView) {
      this._searchInputView = new InputComponent({
        className: "suggest-input",
        attributes: {
          id: this.searchInputId,
          placeholder: "Select a data",
          autofocus: false,
        },
        on: {
          [EVENT_NAMES.INPUT]: this.onKeyPress.bind(this),
        },
      });
    }
    return this._searchInputView;
  }

  get selectIconId() {
    if (!this._selectIconId) {
      this._selectIconId = uniqueId("select:icon:view");
    }
    return this._selectIconId;
  }

  get selectIconView() {
    if (!this._selectIconView) {
      this._selectIconView = new IconComponent({
        icon: "mdi-menu-down",
        className: "pos--fixes",
        attributes: {
          "area-label": "Open suggest with items",
          id: this.selectIconId,
        },
        on: {
          [EVENT_NAMES.CLICK]: this._iconClick.bind(this),
        },
      });
    }
    return this._selectIconView;
  }

  get clearButtonId() {
    if (!this._clearButtonId) {
      this._clearButtonId = uniqueId("clear:button:view");
    }
    return this._clearButtonId;
  }

  get clearButtonView() {
    if (!this._clearButtonView) {
      this._clearButtonView = new ButtonComponent({
        label: "Clear selection",
        className: "pos--fixes pos--left",
        hidden: true,
        attributes: {
          id: this.clearButtonId,
          type: "button",
        },
        on: {
          [EVENT_NAMES.CLICK]: this.clear.bind(this),
        },
      });
    }
    return this._clearButtonView;
  }

  get suggestId() {
    if (!this._suggestId) {
      this._suggestId = uniqueId("suggest:view");
    }
    return this._suggestId;
  }

  get suggest() {
    if (!this._suggest) {
      this._suggest = new Suggest({
        className: "suggest-items",
        attributes: {
          id: this.suggestId,
        },
        options: this._options,
        on: {
          onItemClick: this.selectItem.bind(this),
        },
      });
    }
    return this._suggest;
  }

  get inputView() {
    return this.searchInputView.element;
  }

  get iconView() {
    return this.selectIconView.element;
  }

  get defaultStateId() {
    if (!this._defaultStateId) {
      this._defaultStateId = uniqueId("default:state:view");
    }
    return this._defaultStateId;
  }

  get defaultView() {
    if (!this._defaultView) {
      this._defaultView = new ResultField({
        className: "selected-item",
        id: this.defaultStateId,
        icon: false,
        innerText: {},
        value: "All",
      });
    }
    return this._defaultView;
  }

  get selectedItems() {
    if (!this._selectedItems) {
      this._selectedItems = {};
    }
    return this._selectedItems;
  }

  onKeyPress() {
    this.openSuggest(this.inputView.value);
  }

  openSuggest(val) {
    const iconComponent = this.selectIconView;
    this.inputView.parentNode.appendChild(this.suggest.element);
    this.suggest.setListWithOptions(val);
    iconComponent.changeIcon(val ? "mdi-close" : "mdi-menu-down");
  }

  closeSuggest(target) {
    const iconComponent = this.selectIconView;
    this.inputView.value = "";
    this.suggest.closeAllLists(target);
    iconComponent.changeIcon("mdi-menu-down");
  }

  _iconClick(e) {
    if (this.selectIconView.icon == "mdi-menu-down") {
      this.openSuggest(true);
    } else {
      this.closeSuggest(e.target);
    }
  }

  events() {
    this.element.addEventListener("closeSuggest", (e) => {
      this.closeSuggest(e.target);
    });

    document.onclick = (e) => {
      const allMultiselects = document.getElementsByClassName(
        MultiSelectComponent.VIEW_CLASS_NAME
      );
      if (allMultiselects.length) {
        const multiselect = e.target.closest(
          `.${MultiSelectComponent.VIEW_CLASS_NAME}`
        );
        [...allMultiselects].forEach((elem) => {
          if (elem != multiselect) {
            elem.dispatchEvent(new Event("closeSuggest"));
          }
        });
      }
    };
  }

  clear() {
    Object.keys(this.selectedItems).forEach((key) => {
      this.unselectItem(false, key);
    });
    this.clearButtonView.hide();
    this.defaultView.show();
  }

  selectItem(e, option) {
    this.closeSuggest();
    if (option.select) {
      this.unselectItem(e, option.id);
      if (
        !Object.keys(this.selectedItems).length &&
        !this.clearButtonView.hidden
      ) {
        this.clearButtonView.hide();
        this.defaultView.show();
      }
      return true;
    }
    this.suggest.changeStateItem(option.id, option.select ? false : true);

    const fieldNode = this.fieldWithSelectedItems.element;
    if (fieldNode) {
      const value = new ResultField({
        className: "selected-item",
        icon: {
          icon: "mdi mdi-close-outline",
          attributes: {
            "area-label": "Remove item from field and unselect in suggest",
          },
          on: {
            [EVENT_NAMES.CLICK]: this.unselectItem.bind(this, e, option.id),
            [EVENT_NAMES.KEY_DOWN]: this.keyDownEvent.bind(
              this,
              option.id,
              VIEW_NAMES.ICON
            ),
          },
        },
        innerText: {},
        value: option.value,
      });
      value.renderComponent(fieldNode, TYPES_OF_INSERT.APPEND);
      this.selectedItems[option.id] = value;
    }

    if (Object.keys(this.selectedItems).length && this.clearButtonView.hidden) {
      this.clearButtonView.show();
      this.defaultView.hide();
    }
    return true;
  }

  unselectItem(e, optionId) {
    this.selectedItems[optionId].removeView();
    delete this.selectedItems[optionId];
    this.suggest.changeStateItem(optionId);
    if (!Object.keys(this.selectedItems).length) {
      this.clear();
    }
  }

  keyDownEvent(optionId, viewName, e) {
    switch (e.keyCode) {
      case 40:
        break;
      case 38:
        break;
      case 13:
        if (viewName == VIEW_NAMES.ICON) {
          this.unselectItem(e, optionId);
        }
        break;
      default:
        break;
    }
  }
}
