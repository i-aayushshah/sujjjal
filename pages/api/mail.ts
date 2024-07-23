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
        const { name, email, message }: { name: string; email: string; message: string } = req.body;
        const mailOptions = {
            from: "hackman2024business@gmail.com",
            to: email,
            subject: `${name.toUpperCase()} sent you a message from Portfolio`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `Name: ${name}<br>Email: ${email}<br>Message: ${message}`,
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
