import { PrismaClient } from "@prisma/client";
import nodemailer from 'nodemailer';



const createReferral = async (req, res) => {
    const { name, email, message } = req.body.details;

    const prisma = new PrismaClient();

    // Validate input
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Save referral to the database
        const referral = await prisma.Referral.create({
            data: { name, email, message }
        });

        sendReferralEmail(name, email, message)

        return res.status(201).json(referral);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const sendReferralEmail = async (name, email, message) => {
    // Set up nodemailer transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Referral Submission Successful',
        text: `Hello ${name},\n\nThank you for your referral!\n\nMessage: ${message}`
    };

    await transporter.sendMail(mailOptions);
};



export { createReferral };