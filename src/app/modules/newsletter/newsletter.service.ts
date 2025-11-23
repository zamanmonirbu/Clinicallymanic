import sendMailer from "../../helper/sendMailer";
import Newsletter, { INewsletter } from "./newsletter.model";


class NewsletterService {
    async subscribe(email: string): Promise<INewsletter> {
        const existing = await Newsletter.findOne({ email });
        if (existing) {
            throw new Error("Email already subscribed");
        }

        // Save to DB
        const newSubscriber = await Newsletter.create({ email });

        // Send confirmation email
        const subject = "Subscription Successful!";
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to the Waitlist!</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      margin: 0;
      padding: 0;
      min-height: 100vh;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
    }
    .header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      padding: 50px 20px;
      text-align: center;
      color: white;
    }
    .header h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .header p {
      margin: 16px 0 0;
      font-size: 18px;
      opacity: 0.9;
    }
    .content {
      padding: 40px 40px 50px;
      text-align: center;
    }
    .content p {
      font-size: 17px;
      color: #374151;
      line-height: 1.7;
      margin: 0 0 32px;
    }
    .button {
      display: inline-block;
      padding: 16px 36px;
      background: #0ea5e9; /* Sky blue - fresh and energetic */
      color: white;
      font-size: 17px;
      font-weight: 600;
      text-decoration: none;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(14, 165, 233, 0.3);
      transition: all 0.3s ease;
    }
    .button:hover {
      background: #0284c7;
      transform: translateY(-3px);
      box-shadow: 0 12px 28px rgba(14, 165, 233, 0.4);
    }
    .check-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 30px;
      background: #ecfdf5;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      color: #10b981;
    }
    .footer {
      background: #f8fafc;
      padding: 30px;
      text-align: center;
      font-size: 14px;
      color: #94a3b8;
      border-top: 1px solid #e2e8f0;
    }
    .footer a {
      color: #3b82f6;
      text-decoration: none;
    }
    @media (max-width: 480px) {
      .container { margin: 20px; border-radius: 12px; }
      .header { padding: 40px 20px; }
      .header h1 { font-size: 28px; }
      .content { padding: 30px 25px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome Aboard!</h1>
      <p>You're officially on the pre-launch list</p>
    </div>
    
    <div class="content">
      
      <p><strong>You're on the List!</strong></p>
      <p style="margin-top: 16px;">
        Thank you for joining the Clinicallymanic waitlist.<br>
        We’ll notify you the moment we go live — get ready for something special.
      </p>
      
      <a href="https://clinicallymanic.com" class="button">Visit Website</a>
    </div>
    
    <div class="footer">
      <p>© 2025 Clinicallymanic. All rights reserved.</p>
      <p>
        Made with passion for better mental health tools.<br>
        <a href="https://clinicallymanic.com">clinicallymanic.com</a>
      </p>
    </div>
  </div>
</body>
</html>
`;

        await sendMailer(email, subject, html);

        return newSubscriber;
    }

    async getAll(): Promise<INewsletter[]> {
        return await Newsletter.find().sort({ createdAt: -1 });
    }

    async deleteById(id: string): Promise<void> {
        await Newsletter.findByIdAndDelete(id);
    }
}

export default new NewsletterService();
