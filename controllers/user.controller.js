const fetch = require('node-fetch');

exports.submit_form_data = async (req, res) => {
    try {
        const formData = req.body; 

        // Make a POST request to another endpoint
        const response = await fetch('https://postman-echo.com/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const responseData = await response.json();
            res.status(200).json(responseData);
        } else {
            res.status(500).json({ error: 'Failed to submit form data to the API' });
        }
    } catch (error) {
        console.error('Error submitting form data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
