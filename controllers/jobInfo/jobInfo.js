const { Op } = require("sequelize");
const User = require('../../models').User;
const JobInfo = require('../../models').JobInfo;
const Application = require('../../models').Application;
const { validationResult } = require('express-validator');
const { _response } = require('../../utils/functions/response');
const { getPagination, getPagingData } = require('../../utils/functions/functions');


exports.add = async (req, res) => {

    const { companyId, position, vacancy, jobContext, responsibility, employmentStatus } = req.body;

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        const jobInfo = await JobInfo.create({ companyId, position, vacancy, jobContext, responsibility, employmentStatus });
        if (!jobInfo) { return res.status(200).json({ message: _response.failed }) };
        return res.status(200).json({ jobInfo });

    } catch (error) { console.log(error) };
};

exports.edit = async (req, res) => {

    const { position, vacancy, jobContext, responsibility, employmentStatus } = req.body;
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        const jobInfo = await JobInfo.update({ position, vacancy, jobContext, responsibility, employmentStatus }, condition);
        if (!jobInfo) { return res.status(200).json({ message: _response.failed }) };
        return res.status(200).json({ message: _response.update });

    } catch (error) { console.log(error) };
};

exports.remove = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* FIND_&_DELETE_&_RESPONCE */
        const jobInfo = await jobInfo.destroy(condition);

        if (jobInfo === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (jobInfo === 0) {
            return res.status(404).json({ message: _response.emptyList });
        } else { return res.status(500).json({ message: _response.error }) };

    } catch (error) { console.log(error) };
};

exports.view = async (req, res) => {
    const id = req.params.id;
    const query = {
        where: { id: id },
        include: { model: Application },
    };

    try {
        /* FIND_&_RESPONCE  */
        const details = await JobInfo.findOne(query);
        if (!details) { return res.status(404).json({ message: _response.emptyList }) };
        // const imageUrl = imageUrlProcess.imageUrl(req, details.dataValues.image);

        return res.status(404).json({
            details,
            // imageUrl
        });

    } catch (error) { console.log(error) };
};
