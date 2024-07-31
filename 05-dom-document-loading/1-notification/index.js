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
    this.element = this.createElement();
  }

  createElement() {
    const element = document.createElement('div');
    element.className = `notification ${this.type}`;
    element.style.setProperty('--value', `${this.duration / 1000}s`);
    element.innerHTML = `
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>`;
    return element;
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

    if (NotificationMessage.activeNotification === this) {
      NotificationMessage.activeNotification = null;
    }
  }

  destroy() {
    this.remove();
    clearTimeout(this.timerId);
    this.element = null;
  }
}
