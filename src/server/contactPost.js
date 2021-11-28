'use strict';

const Celebrate  = require('celebrate');
const nodemailer = require('nodemailer');
const isEmpty    = require('lodash/isEmpty');

function getTestConfiguration() {
    const authorization = {
        user: 'austin30@ethereal.email',
        pass: 'Gb5tyjdyqmYV1bud4J'
    };

    return {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: authorization
    };
}

function getConfiguration() {
    const authorization = {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    };

    return {
        host: 'smtp.gmail.com',
        post: 465,
        secure: true,
        auth: authorization
    };
}

function getDefaultSubject(name, subject) {
    if (isEmpty(subject)) {
        return `[personal-site] Message from "${name}"`;
    }

    return `[personal-site] Message from "${name}" about "${subject}"`;
}

function sendMessage(body) {
    const { name, email, subject, message } = body;

    const defaultName    = name || 'Anonymous';
    const defaultSubject = getDefaultSubject(name, subject)

    const transporter = nodemailer.createTransport(
        true
            ? getConfiguration()
            : getTestConfiguration()
    );

    return transporter.sendMail({
        to: `"Jeremy Hull" <${process.env.EMAIL_USERNAME}>`,
        bcc: `"Jeremy Hull" <${process.env.GMAIL_USERNAME}>`,
        replyTo: email,
        subject: getDefaultSubject(name, subject),
        text: message
    });
}

async function handler(request, response) {
    let payload = null;

    try {
        payload = await sendMessage(request.body);
    } catch (error) {
        console.log(error);

        response.status(500).json({
            statusCode: 500,
            error: 'Internal Server Error',
            message: error
        });

        return;
    }

    response.json({
        statusCode: 200,
        payload: payload
    });
}

const { Joi, Segments } = Celebrate;

const validation = Celebrate.celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().default('Anonymous'),
        email: Joi.string().email().required(),
        subject: Joi.string(),
        message: Joi.string().required()
    })
})

module.exports = { validation, handler };
