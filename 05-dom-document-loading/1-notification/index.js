export default class NotificationMessage {
  static activeNotification;
  constructor(
    message = '',
    {
      duration = 2000,
      type = 'success'
    } = {}
  ) {
    this.message = message;
    this.type = type;
    this.duration = duration;
    this.element = this.createElement(this.createTemplate());
  }

  createElement(template) {
    const element = document.createElement('div');
    element.className = `notification ${this.type}`;
    element.style.setProperty('--value', `${this.duration / 1000}s`);
    element.innerHTML = template;
    return element;
  }

  createTemplate() {
    return (`
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>`);
  }

  show(parent = document.body) {
    if (NotificationMessage.activeNotification) {
      NotificationMessage.activeNotification.remove();
    }

    parent.append(this.element);

    this.timerId = setTimeout(() => this.remove(), this.duration);
    NotificationMessage.activeNotification = this;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    clearTimeout(this.timerId);
  }
}
