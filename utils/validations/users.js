const { check } = require('express-validator')

module.exports = {

    validSignUp: [

        check('password')
            .not()
            .isEmpty()
            .withMessage('Password required')
            .isString()
            .withMessage('Password Must be string')
            .isLength({ min: 6 })
            .withMessage('Password minimum 6 characters'),

        check('email')
            .not()
            .isEmpty()
            .withMessage('Email required')
            .isEmail()
            .withMessage('Must be email format'),
    ],

    validInfo: [

        check('name')
            .not()
            .isEmpty()
            .withMessage('Name required')
            .isString()
            .withMessage('Name Must be string')
            .isLength({ min: 6 })
            .withMessage('Name minimum 6 characters'),

        check('address')
            .not()
            .isEmpty()
            .withMessage('Address required')
            .isString()
            .withMessage('Address Must be string')
            .isLength({ min: 6 })
            .withMessage('Address minimum 6 characters'),

        check('email')
            .not()
            .isEmpty()
            .withMessage('Email required')
            .isEmail()
            .withMessage('Must be email format'),
    ],

}