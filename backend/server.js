const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");

const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });

const openai = new OpenAIApi(
  new Configuration({ apiKey: "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" })
);

app.post("/", upload.single("resume"), async (req, res) => {
  const fileText = fs.readFileSync(req.file.path, "utf8"); // You should extract text properly using pdf-parse or similar
  const prompt = `
You're an expert resume reviewer. Give a score out of 10 and feedback on this resume:
${fileText}
Return JSON: { "score": X, "summary": "...", "suggestions": ["..."] }
`;

  const gptRes = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  const json = JSON.parse(gptRes.data.choices[0].message.content);
  res.json(json);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
