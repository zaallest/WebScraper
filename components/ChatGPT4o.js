// Import necessary modules
require("dotenv").config();

const OpenAI = require("openai");

// Make sure to select the "repo" and "read:packages" scopes.
const token = process.env.CHATGPT4o_API_KEY;

// Function to interact with ChatGPT4o model
const ChatGPT4oRes = async (data) => {
  // Initialize OpenAI client
  const client = new OpenAI({
    baseURL: "https://models.github.ai/inference",
    apiKey: token,
  });

  // Create a chat completion request
  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful webscraper data analyst, what is the name of the company and the services they provided.",
      },
      { role: "user", content: `${data}` },
    ],
    model: "openai/gpt-4o",
    temperature: 1,
    max_tokens: 16384,
    top_p: 1,
  });

  // Return the content of the first choice in the response
  return response.choices[0].message.content;
};

// Handle any errors that occur during the function execution
ChatGPT4oRes().catch((err) => {
  //return "The sample encountered an error:", err.message;
  console.error("The sample encountered an error:", err.message);
});

// Exporting the function for external use
module.exports = ChatGPT4oRes;
