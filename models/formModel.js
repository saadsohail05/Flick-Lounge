const fetch = require('node-fetch');

const formModel = {
  sendFormDataToAPI: async (formData) => {
    try {
      const response = await fetch('https://example.com/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to send form data to API');
    }
  }
};

module.exports = formModel;
