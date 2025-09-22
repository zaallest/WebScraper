//Import necessary modules
require("dotenv").config();
const OpenAIApi = require("openai");

// Function to interact with Deepseek API
const DeepseekAPI = async (data) => {
  // Initialize OpenAI API
  //Deepseek
  const openai_deepseek = new OpenAIApi({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: "https://api.deepseek.com/v1",
  });

  //Analyse data using Deepseek API
  try {
    const response = await openai_deepseek.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant.",
        },
        {
          role: "user",
          content: "Tell me a fun fact about space!",
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    console.log("Response:", response.choices[0].message.content);
  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      type: error.type,
      code: error.code,
    });
  }
};

// Export the DeepseekAPI function
module.exports = DeepseekAPI;
