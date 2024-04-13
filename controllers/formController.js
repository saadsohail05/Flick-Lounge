const formModel = require('../models/formModel');

const formController = {
    sendData : async (req, res) => {
        try {
            const formData = req.body;
            const response = await formModel.sendFormDataToAPI(formData);
            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error"});
        }
    }
};

module.exports = formController;