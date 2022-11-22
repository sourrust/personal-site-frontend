import Celebrate  from 'celebrate';
import dotenv     from 'dotenv';
import http       from 'http';
import isEmpty    from 'lodash/isEmpty';
import nodemailer from 'nodemailer';

import { NextApiResponse, NextApiRequest } from 'next';

import runApiMiddleware from '../../utility/runApiMiddleware';

dotenv.config();

interface Message {
    name: string;
    email: string;
    subject?: string;
    message: string;
}

function getTestConfiguration() {
    const authorization = {
        user: 'austin30@ethereal.email',
        pass: 'Gb5tyjdyqmYV1bud4J',
    };

    return {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: authorization,
    };
}

function getConfiguration() {
    const authorization = {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
    };

    return {
        service: 'gmail',
        auth: authorization,
    };
}

function getDefaultSubject(name: string, subject?: string) {
    if (isEmpty(subject)) {
        return `[personal-site] Message from "${name}"`;
    }

    return `[personal-site] Message from "${name}" about "${subject}"`;
}

function sendMessage(body: Message) {
    const {
        name, email, subject, message,
    } = body;

    const defaultName    = name || 'Anonymous';
    const defaultSubject = getDefaultSubject(name, subject);

    const transporter = nodemailer.createTransport(
        true
            ? getConfiguration()
            : getTestConfiguration()
    );

    return transporter.sendMail({
        to: `"Jeremy Hull" <${process.env.EMAIL_USERNAME}>`,
        bcc: `"Jeremy Hull" <${process.env.GMAIL_USERNAME}>`,
        replyTo: email,
        subject: getDefaultSubject(defaultName, defaultSubject),
        text: message,
    });
}

const { Joi, Segments } = Celebrate;

const validation = Celebrate.celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().default('Anonymous'),
        email: Joi.string().email().required(),
        subject: Joi.string().allow(''),
        message: Joi.string().required(),
    }),
});

function handleCelebrateMiddleware(request: NextApiRequest, response: NextApiResponse) {
    return runApiMiddleware(request, response, validation)
        .catch((error) => runApiMiddleware(error, request, response, Celebrate.errors()));
}

async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method !== 'POST') {
        return response.status(404).json({
            statusCode: 404,
            error: http.STATUS_CODES[404],
            message: 'Can not find handler for this method type',
        });
    }

    await handleCelebrateMiddleware(request, response);

    let payload = null;

    try {
        payload = await sendMessage(request.body);
    } catch (error) {
        console.error(error);

        return response.status(500).json({
            statusCode: 500,
            error: http.STATUS_CODES[500],
            message: (error as Error).message || 'An unknown error has occured on the server',
        });
    }

    return response.status(200).json({
        statusCode: 200,
        payload: payload,
    });
}

export default handler;
