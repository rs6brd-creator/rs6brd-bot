const express = require("express");
const path = require("path");

const app = express();

// مهم لمعالجة البيانات
app.use(express.json());

// لعرض الملفات (index.html)
app.use(express.static(__dirname));

// API لما تضغط الزر
app.post("/generate", (req, res) => {
  const text = req.body.text;

  console.log("Received:", text);

  res.json({
    message: "تم إنشاء الفيديو 🎬",
    text: text
  });
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
