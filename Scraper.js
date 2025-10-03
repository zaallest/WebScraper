// Webscraper
//Importing necessary functions
const fs = require("fs");
const { json } = require("stream/consumers");
const GetURLs = require("./components/GetURLs");
const ScrapeSite = require("./components/ScrapeSites");
const ChatGPT4oRes = require("./components/ChatGPT4o");

// Main function to run the program
async function main(ASNs) {
  // List of attacker ASNs to scrape
  const attackers_list = [];
  // Check if ASNs is an array and populate attackers_list accordingly
  if (ASNs && ASNs.length > 0) {
    // If ASNs is an array, use it directly
    for (const asn of ASNs) {
      // Push each ASN to the attackers_list
      attackers_list.push(asn);
    }
  } else {
    // If ASNs is not provided or empty, use the single ASNs value
    attackers_list.push(ASNs);
  }
  // Get URLs for the provided attacker ASNs
  const attackers_URLs = await GetURLs(attackers_list);

  // Scrape each URL to get site data
  const site_data = await ScrapeSite(attackers_URLs);

  // Analyze each site's text data using ChatGPT4o
  for (const site of site_data) {
    const data =
      "Analyse the following website data and provide a summary: " + site.text;
    const summary = await ChatGPT4oRes(data);

    // Append the summary to the site data
    site.summary = summary;
    console.log("Summary for site:", summary);
  }
  // Save results to a JSON file
  fs.writeFileSync("results.json", JSON.stringify(site_data, null, 2));

  console.log("✅ Results saved to results.json!!");

  //Print Message
  console.log("✅ ChatGPT4o!");
}
const attackers_list = [267548, 50313, 55410, 140012];

main(50313);
