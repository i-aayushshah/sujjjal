import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type Data = {
    message: string;
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "hackman2024business@gmail.com", // Your Gmail address
        pass: "xinwzkzkjncduewp", // Your Gmail password (or App password)
    },
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const { name, email, message, subject }: { name: string; email: string; message: string; subject: string } = req.body;

        const mailOptions = {
            from: '"Sujal Shah" <hackman2024business@gmail.com>',
            to: email,
            bcc: "sujalshah.0444@gmail.com, sshah2@fandm.edu", // Add multiple BCC addresses here
            subject: `Thank You for Reaching Out regarding: ${subject}`, // Include the subject in the email subject line
            html: `
                <div style="font-family: 'Georgia', serif; color: #333; line-height: 1.6; background-color: #f4f4f4; padding: 20px;">
                    <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 15px; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1); padding: 25px; border: 1px solid #e0e0e0;">
                        <header style="border-bottom: 3px solid #27ae60; padding-bottom: 10px; margin-bottom: 15px; text-align: center;">
                            <h1 style="font-size: 17px; color: #27ae60; margin: 0;">Thank You for Reaching Out!</h1>
                        </header>
                        <p style="font-size: 14px; color: #555; margin: 0 0 10px 0;">Dear <strong>${name}</strong>,</p>
                        <p style="font-size: 14px; color: #555; margin: 0 0 12px 0;">Thank you for getting in touch with me. I have received your message regarding "<strong>${subject}</strong>". I will review your message and get back to you shortly.</p>
                        <p style="font-size: 14px; font-weight: bold; color: #333; margin: 0 0 10px 0;">Here is a summary of your message:</p>
                        <ul style="font-size: 13px; color: #555; padding: 0; list-style-type: none; margin: 0;">
                            <li style="display: flex; align-items: center; justify-content: center; background: #eafaf1; padding: 10px; border-radius: 8px; margin-bottom: 10px; border: 1px solid #b0e57c; text-align: center;">
                                <strong style="color: #27ae60; margin-right: 10px;">Name:</strong> ${name}
                            </li>
                            <li style="display: flex; align-items: center; justify-content: center; background: #eafaf1; padding: 10px; border-radius: 8px; margin-bottom: 10px; border: 1px solid #b0e57c; text-align: center;">
                                <strong style="color: #27ae60; margin-right: 10px;">Email:</strong> ${email}
                            </li>
                            <li style="display: flex; align-items: center; justify-content: center; background: #eafaf1; padding: 10px; border-radius: 8px; margin-bottom: 10px; border: 1px solid #b0e57c; text-align: center;">
                                <strong style="color: #27ae60; margin-right: 10px;">Subject:</strong> ${subject}
                            </li>
                            <li style="display: flex; align-items: center; justify-content: center; background: #eafaf1; padding: 10px; border-radius: 8px; border: 1px solid #b0e57c; text-align: center;">
                                <strong style="color: #27ae60; margin-right: 10px;">Message:</strong> ${message}
                            </li>
                        </ul>
                        <footer style="padding-top: 10px; margin-top: 15px; text-align: left;">
                            <p style="font-size: 14px; color: #333; margin: 0;">Best regards,</p>
                            <p style="font-size: 14px; color: #333; margin: 0;"><b>Sujal Shah</b></p>
                        </footer>
                    </div>
                </div>
            `,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Your message was sent successfully.' });
        } catch (err) {
            res.status(500).json({ message: `There was an error sending your message. ${err}` });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
