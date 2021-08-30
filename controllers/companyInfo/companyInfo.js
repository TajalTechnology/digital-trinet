const CompanyInfo = require('../../models').CompanyInfo;
const JobInfo = require('../../models').JobInfo;
const imageUrlProcess = require('../../utils/functions/imageUrl');
const { validationResult } = require('express-validator');
const { _response } = require('../../utils/functions/response');


exports.add = async (req, res) => {

    const { name, address, phone, totalEmployee } = req.body;
    const imagePath = 'upload/images' + '/' + req.file.filename;
    const imageUrl = imageUrlProcess.imageUrl(req, imagePath);
    const condition = { where: { name: name } };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* EXISTING_NAME */
        const existingCompanyInfo = await CompanyInfo.findOne(condition);

        /* CREATE */
        if (!existingCompanyInfo) {

            const companyInfo = await CompanyInfo.create({ name, address, phone, totalEmployee, image: imagePath });
            if (!companyInfo) { return res.status(424).json({ message: _response.failed }) };
            return res.status(200).json({ message: _response.sucess });

        } else { return res.status(302).json({ message: _response.duplicateValue }) };

    } catch (error) { console.log(error) };
};

exports.edit = async (req, res) => {

    const id = req.params.id;
    const { name, address, phone, totalEmployee, } = req.body;
    const imagePath = 'upload/images' + '/' + req.file.filename;
    const imageUrl = imageUrlProcess.imageUrl(req, imagePath);
    const condition1 = { where: { name: name } };
    const condition2 = { where: { id: id } };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* EXISTING_NAME */
        const uniqueName = await CompanyInfo.findOne(condition1);

        /* UPDATE */
        if (!uniqueName || (uniqueName && uniqueName.id == id)) {

            const updateInfo = await CompanyInfo.update({ name, address, phone, totalEmployee, image: imagePath }, condition2);
            if (!updateInfo) { return res.status(424).json({ message: _response.failed }) };
            return res.status(200).json({ message: _response.update });

        } else { return res.status(302).json({ message: _response.duplicateValue }) };

    } catch (error) { console.log(error) };
};

exports.remove = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* FIND_&_DELETE */
        const deleteInfo = await CompanyInfo.destroy(condition);

        /* RESPONCE */
        if (deleteInfo === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (deleteInfo === 0) {
            return res.status(404).json({ message: _response.emptyList });
        } else { return res.status(500).json({ message: _response.error }) };

    } catch (error) { console.log(error) };
};

exports.view = async (req, res) => {
    const id = req.params.id;
    const query = {
        where: { id: id },
        include: [{ model: JobInfo }],
    };

    try {
        /* FIND_&_RESPONCE  */
        const details = await CompanyInfo.findOne(query);
        if (!details) { return res.status(404).json({ message: _response.emptyList }) };
        return res.status(404).json({ details });

    } catch (error) { console.log(error) };
};
