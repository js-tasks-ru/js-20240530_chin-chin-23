export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.render();
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.getHeaderCells()}
          </div>
          <div data-element="body" class="sortable-table__body">
            ${this.getBodyRows()}
          </div>
        </div>
      </div>
    `;

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);
  }

  getHeaderCells() {
    return this.headerConfig.map(({ id, title, sortable }) => {
      const order = sortable ? 'data-sortable="true"' : 'data-sortable="false"';
      return `
        <div class="sortable-table__cell" data-id="${id}" ${order}>
          <span>${title}</span>
          ${sortable ? '<span data-element="arrow" class="sortable-table__sort-arrow"><span class="sort-arrow"></span></span>' : ''}
        </div>
      `;
    }).join('');
  }

  getBodyRows() {
    return this.data.map(item => {
      const cells = this.headerConfig.map(({ id, template }) => {
        return template ? template(item[id]) : `<div class="sortable-table__cell">${item[id]}</div>`;
      }).join('');

      return `<div class="sortable-table__row">${cells}</div>`;
    }).join('');
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');
    return [...elements].reduce((acc, subElement) => {
      acc[subElement.dataset.element] = subElement;
      return acc;
    }, {});
  }

  sort(fieldValue, orderValue) {
    const column = this.headerConfig.find(item => item.id === fieldValue);
    if (!column || !column.sortable) return;

    const direction = orderValue === 'asc' ? 1 : -1;
    const { sortType } = column;

    const compare = {
      number: (a, b) => a - b,
      string: (a, b) => a.localeCompare(b, ['ru', 'en']),
      date: (a, b) => new Date(a) - new Date(b)
    }[sortType];

    this.data.sort((a, b) => direction * compare(a[fieldValue], b[fieldValue]));
    this.updateBody();
  }

  updateBody() {
    this.subElements.body.innerHTML = this.getBodyRows();
  }

  destroy() {
    this.element.remove();
    this.subElements = {};
  }
}

