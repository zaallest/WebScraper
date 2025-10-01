// Webscraper
//Importing necessary functions
const fs = require("fs");
const { json } = require("stream/consumers");

const GetURLs = require("./components/GetURLs");
const ScrapeSite = require("./components/ScrapeSites");
const ChatGPT4oRes = require("./components/ChatGPT4o");
// Main function to run the program
async function main() {
  const attackers_list = [267548, 50313, 55410, 140012];
  const attackers_URLs = await GetURLs(attackers_list);
  // console.log(attackers_URLs);
  const site_data = await ScrapeSite(attackers_URLs);
  // console.log(JSON.parse(site_data));

  // Example usage of ChatGPT4oRes
  for (const site of site_data) {
    const data = "Analyse the following website data and provide a summary: " + site.text;
    const summary = await ChatGPT4oRes(data);
    // console.log(summary);
    site.summary = summary;
    // console.log("Summary for site:", summary);
  }
  // Save results to a JSON file
  fs.writeFileSync("results.json", JSON.stringify(site_data, null, 2));

  console.log("✅ Results saved to results.json!!");

  //Print Message
  console.log("✅ ChatGPT4o!");

  // Initialize Puter
  // puter.ai.chat("What is the capital of France?",{ model: "gpt-5-nano" }).then((response) => {

  //   console.log("Puter says:", response);
  // });

}

main();
