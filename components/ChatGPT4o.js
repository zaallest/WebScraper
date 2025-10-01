/*
Run this model in Javascript

> npm install openai
*/
require("dotenv").config();

const OpenAI  = require("openai");

// To authenticate with the model you will need to generate a personal access token (PAT) in your GitHub settings. 
// Create your PAT token by following instructions here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
const token = process.env.CHATGPT4o_API_KEY;

const ChatGPT4oRes = async (data) => {

  const client = new OpenAI({
    baseURL: "https://models.github.ai/inference",
    apiKey: token
  });

  const response = await client.chat.completions.create({
    messages: [
      { role:"system", content: "You are a helpful webscraper data analyst, outline the name of the company and the services they provided." },
      { role:"user", content: `${data}` }
    ],
    model: "openai/gpt-4o",
    temperature: 1,
    max_tokens: 16384,
    top_p: 1
  });

  return response.choices[0].message.content;
//   console.log(response.choices[0].message.content);
}

ChatGPT4oRes().catch((err) => {
  return("The sample encountered an error:", err);
//   console.error("The sample encountered an error:", err);
});

// Exporting the function for external use
module.exports = ChatGPT4oRes;

