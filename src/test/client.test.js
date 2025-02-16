global.fetch = require('node-fetch');
// Mock the DOM
document.body.innerHTML = `
  <form id="travel-form">
    <input id="destination" value="Paris" />
    <input id="departure-date" value="2025-01-01" />
    <button type="submit">Submit</button>
  </form>
  <div id="results"></div>
`;

// node-fetch
global.fetch = require('node-fetch');

const { handleFormSubmit } = require('../client/js/app'); 

describe('Client JavaScript', () => {
  it('should handle form submission', async () => {
    // trigger the submission
    document.getElementById('travel-form').dispatchEvent(new Event('submit'));

    // wait code to complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    // check if the results element updated
    const results = document.getElementById('results');
    expect(results.innerHTML).toBe('<p>Loading...</p>');
  });
});