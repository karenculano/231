import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import eventMatches from '../../globals/js/misc/event-matches';

class StructuredList extends mixin(createComponent, initComponentBySearch) {
  /**
   * StructuredList
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The root element of tables
   * @param {Object} [options] the... options
   * @param {string} [options.selectorInit] selector initialization
   * @param {string} [options.selectorRow] css selector for selected row
   */
  constructor(element, options) {
    super(element, options);
    this.element.addEventListener('keydown', evt => {
      if (evt.which === 38 || evt.which === 40) {
        this._handleKeydownArrow(evt);
      }
      if (evt.which === 13 || evt.which === 32) {
        this._handleKeydownChecked(evt);
      }
    });
  }

  _direction(evt) {
    return {
      38: -1, // backward
      40: 1, // forward
    }[evt.which];
  }

  _nextIndex(array, arrayItem, direction) {
    return array.indexOf(arrayItem) + direction; // returns -1, 0, 1, 2, 3, 4...
  }

  _getInput(index) {
    const rows = [...this.element.querySelectorAll(this.options.selectorRow)];
    const id = `#${rows[index].getAttribute('for')}`;
    return this.element.ownerDocument.querySelector(`${id}.bx--structured-list-input`);
  }

  _handleInputChecked(index) {
    const input = this._getInput(index);
    input.checked = true;
  }

  _handleKeydownChecked(evt) {
    const selectedRow = eventMatches(evt, this.options.selectorRow);
    if (selectedRow) {
      const input = this.element.querySelector(
        `#${selectedRow.getAttribute('for')}.bx--structured-list-input`
      );
      input.checked = true;
    }
  }

  _handleKeydownArrow(evt) {
    const selectedRow = eventMatches(evt, this.options.selectorRow);
    const direction = this._direction(evt);

    if (direction && selectedRow !== undefined) {
      const rows = [...this.element.querySelectorAll(this.options.selectorRow)];
      const firstIndex = 0;
      const nextIndex = this._nextIndex(rows, selectedRow, direction);
      const lastIndex = rows.length - 1;

      switch (nextIndex) {
        case -1:
          rows[lastIndex].focus();
          this._handleInputChecked(lastIndex);
          break;
        case rows.length:
          rows[firstIndex].focus();
          this._handleInputChecked(firstIndex);
          break;
        default:
          rows[nextIndex].focus();
          this._handleInputChecked(nextIndex);
          break;
      }
    }
  }

  static components = new WeakMap();

  static options = {
    selectorInit: '[data-structured-list]',
    selectorRow:
      '[data-structured-list] .bx--structured-list-tbody > label.bx--structured-list-row',
  };
}

export default StructuredList;
