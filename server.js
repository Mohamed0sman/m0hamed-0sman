const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

// Middleware لتحليل البيانات المرسلة من الفورم
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route رئيسي لاستقبال البيانات
app.post("/send-message", (req, res) => {
  const { fullname, email, message } = req.body;

  // تأكيد البيانات في الكونسول
  console.log("Received Data:", { fullname, email, message });

  // إعداد البريد الإلكتروني باستخدام Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail", // استخدم Gmail كـ SMTP Server
    auth: {
      user: "your-email@gmail.com", // حط إيميلك هنا
      pass: "your-email-password", // الباسورد أو App-Specific Password
    },
  });

  const mailOptions = {
    from: email, // الإيميل اللي دخله المستخدم
    to: "your-email@gmail.com", // الإيميل اللي هتستقبل عليه البيانات
    subject: "New Message from Contact Form",
    text: `
      Full Name: ${fullname}
      Email: ${email}
      Message: ${message}
    `,
  };

  // إرسال الإيميل
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Failed to send message" });
    }
    res.status(200).json({ message: "Message sent successfully!" });
  });
});

// تشغيل السيرفر
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
