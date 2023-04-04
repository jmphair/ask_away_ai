const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(express.json());

const port = process.env.PORT || 8000;

// POST request endpoint
app.post("/ask", async (req, res) => {
  // getting prompt question from request
  const prompt = req.body.prompt;

  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }

    // trigger OpenAI completion
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 1000,
      temperature: 0,
    });

    // retrieve the completion text from response
    const completion = response.data.choices[0].text;

    // return the result
    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}!!`));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

