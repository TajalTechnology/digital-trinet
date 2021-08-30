const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const User = require('../../models').User;
const Application = require('../../models').Application;
const { validationResult } = require('express-validator');
const { _response } = require('../../utils/functions/response');
const { userData } = require('../../utils/functions/dataFormat');
const imageUrlProcess = require('../../utils/functions/imageUrl');
const { getPagination, getPagingData } = require('../../utils/functions/functions');


exports.signUp = async (req, res) => {
    const { userName, email, password } = req.body;
    const condition = { where: { email: email } };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* EXISTING_USER */
        const existingUser = await User.findOne(condition);

        /* CREATE */
        if (!existingUser) {
            
            const user = await User.create({ userName, email, password: bcrypt.hashSync(password, 10) });
            if (!user) { return res.status(424).json({ message: _response.failed }) };
            return res.status(200).json({message: _response.sucess});

        } else { return res.status(406).json({ message: _response.alreadyRegistered }) };

    } catch (error) { console.log(error) };
};

exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        /* EXISTING_USER */
        const existingUser = await User.findOne({ where: { email: email } });

        /* LOGN_WITH_JWT */
        if (existingUser) {

            const userInfo = userData(existingUser);
            if (bcrypt.compareSync(password, existingUser.password)) {
                const token = jwt.sign(userInfo, process.env.SECRET_KEY);
                return res.status(200).json({
                    message: _response.loginSucess,
                    token: "Bearer " + token,
                });
            } else { return res.status(406).json({ message: _response.passWrong }) };

        } else { return res.status(401).json({ message: _response.unAuthorized }) };
    } catch (error) { console.log(error) };
};

exports.adminSignIn = async (req, res) => {
    const { email, password } = req.body;
    const query = {
        where: {
            [Op.or]: [
                { [Op.and]: [{ email: email }, { isAdmin: true }] },
                { [Op.and]: [{ email: email }, { superAdmin: true }] }
            ]
        }
    };

    try {
        /* EXISTING_USER */
        const existingUser = await User.findOne(query);

        /* LOGN_WITH_JWT */
        if (existingUser) {

            const userInfo = userData(existingUser);
            if (bcrypt.compareSync(password, existingUser.password)) {
                const token = jwt.sign(userInfo, process.env.SECRET_KEY);
                return res.status(200).json({
                    message: _response.loginSucess,
                    token: "Bearer " + token,
                });
            } else { return res.status(406).json({ message: _response.passWrong }) };

        } else { return res.status(401).json({ message: _response.isAdmin }) };
    } catch (error) { console.log(error) };
};

exports.profileImage = async (req, res) => {
    const id = req.user.id;
    let { profile } = req.body;
    const imagePath = 'upload/images' + '/' + req.file.filename;
    const imageUrl = imageUrlProcess.imageUrl(req, imagePath);
    const condition = { where: { id: id } };

    try {
        /* EXISTING_USER */
        const existingUser = await User.findOne(condition);

        /* UPDATE */
        if (existingUser) {
            const profileUrl = await existingUser.update({ profileImage: imagePath });
            if (!profileUrl) { return res.status(424).json({ message: _response.failed }) };
            return res.status(200).json({ imageUrl })
        } else { return res.status(404).json({ message: _response.userEmpty }) }

    } catch (error) { console.log(error) };

};

exports.userList = async (req, res) => {

    let { page, size } = req.query;
    if (page === undefined) { page = 1 };
    const { limit, offset } = getPagination(page, size);
    const condition = {
        limit: limit,
        offset: offset,
        attributes: { exclude: ['password'] },
        where: { superAdmin: false },
    };

    try {
        /* FIND_&_PAGINATION */
        const data = await User.findAndCountAll(condition);
        const userList = getPagingData(data, page, limit);

        if (userList.records.length !== 0) {
            return res.status(200).json({ userList });
        } else { return res.status(404).json({ message: _response.userEmpty }) };

    } catch (error) { console.log(error) };

};

exports.apply = async (req, res) => {
    const id = req.user.id;
    let { cv ,jobId} = req.body;
    const imagePath = 'upload/cv' + '/' + req.file.filename;
    const cvUrl = imageUrlProcess.imageUrl(req, imagePath);
    const condition = {
        where: { [Op.and]: [{ userId: id }, { jobId: jobId }] }
    }

    try {
        /* EXISTING_APPLICATION */
        const existingApplication = await Application.findOne(condition);

        /* CREATE */
        if (!existingApplication) {
            const application = await Application.create({ cv: imagePath, userId: id ,jobId});
            if (!application) { return res.status(424).json({ message: _response.failed }) };
            return res.status(200).json({ 
                application,
                cvUrl
             });

        } else { return res.status(302).json({ message: _response.duplicateValue }) };

    } catch (error) { console.log(error) };
};

