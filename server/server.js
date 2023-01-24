import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
dotenv.config();

// Create an instance of the OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Create an instance of express
const app = express();

// Add middleware
app.use(express.json());
app.use(cors());

// Create a route
app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello World',
  });
});

// Make a request to the OpenAI API
app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    res.status(200).send({
      message: response.data.choices[0].text,
    });
  } catch (error) {
    res.status(500).send(error || 'Something went wrong');
    console.log(error);
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
