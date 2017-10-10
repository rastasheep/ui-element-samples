'use strict';

class ViewSource extends HTMLElement {
  static get TEMPLATE () {
    return `
    <style>
      a {
        position: fixed;
        right: 0;
        bottom: 0;
        margin-right: 20px;
        margin-bottom: 20px;
        z-index: 900;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
        border-radius: 2px;
        padding: 0 16px;
        line-height: 36px;
        background-color: rgb(255,171,64);
        color: #fff;
        font-weight: 500;
        text-transform: uppercase;
        text-decoration: none;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
      }
    </style>

    <a target="_blank" class="view-source" href="https://github.com/rastasheep/ui-lab">View Source</a>
    `;
  }

  constructor () {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = ViewSource.TEMPLATE;
    this.link = this.shadowRoot.querySelector('.view-source');
  }
}
customElements.define('view-source', ViewSource);