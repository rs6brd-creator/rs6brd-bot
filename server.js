const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;

app.post("/generate", async (req, res) => {
  const text = req.body.text;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "أنت خبير في صناعة أفكار فيديوهات ترند وقوية" },
          { role: "user", content: text }
        ]
      })
    });

    const data = await response.json();

    res.json({
      message: "🔥 تم التوليد",
      result: data.choices[0].message.content
    });

  } catch (err) {
    res.json({ error: "خطأ في التوليد" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
