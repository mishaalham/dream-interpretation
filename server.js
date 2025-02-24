require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'https://aladdinksa.github.io',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions));



app.use(express.json());
const path = require('path');

// تحديد المسار الثابت
app.use(express.static(path.join(__dirname, 'public')));

// نقطة النهاية للصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
 // baseURL: 'https://api.aimlapi.com/v1',
  baseURL: 'https://api.openai.com/v1',
});

app.post('/api/interpret', async (req, res) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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', // استبدل YOUR_API_KEY بمفتاح API الخاص بك
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



/*
app.post('/interpret', async (req, res) => {
  const { dream } = req.body;

  if (!dream) {
    return res.status(400).json({ error: 'يرجى إدخال حلمك أولاً.' });
  }

  try {
    const response = await openai.chat.completions.create({
     // model: 'mistralai/Mistral-7B-Instruct-v0.2',
      model: 'gpt-4o-mini',

      messages: [
        { role: 'system', content: 'أنت مفسر أحلام. قم بتفسير هذا الحلم حسب تفسير ابن سيرين .' },
        { role: 'user', content: dream },
      ],
      temperature: 0.7,
      max_tokens: 256,
    });

    const interpretation = response.choices[0].message.content.trim();
    res.json({ interpretation });
  } catch (error) {
    console.error('حدث خطأ:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء تفسير الحلم.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`الخادم يعمل على http://localhost:${PORT}`);
});*/
