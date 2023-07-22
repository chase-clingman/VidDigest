// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks

import { bexContent } from 'quasar/wrappers'

export default bexContent((/* bridge */) => {
  // Check if the current URL is a YouTube page
  if (window.location.href.match(/:\/\/(www\.)?youtube\.com\//)) {

    const insertCustomElement = () => {
      // Create a custom div element
      const customElement = document.createElement('div');
      customElement.id = 'my-custom-element';
      customElement.innerHTML = '<h1>Hello from Quasar BEX!</h1>';
      customElement.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
      customElement.style.padding = '10px';
      customElement.style.marginBottom = '10px';

      // Locate the recommended section
      const targetElement = document.querySelector('#related ytd-watch-next-secondary-results-renderer');
      if (targetElement) {
        // Insert the custom element right above the recommended section
        targetElement.parentNode.insertBefore(customElement, targetElement);
      } else {
        // Retry after a short delay if the target element is not found
        setTimeout(insertCustomElement, 500);
      }
    };

    // Call the function to insert the custom element
    insertCustomElement();
  }

  // Hook into the bridge to listen for events sent from the client BEX.
  /*
  bridge.on('some.event', event => {
    if (event.data.yourProp) {
      // Access a DOM element from here.
      // Document in this instance is the underlying website the contentScript runs on
      const el = document.getElementById('some-id')
      if (el) {
        el.value = 'Quasar Rocks!'
      }
    }
  })
  */
})
