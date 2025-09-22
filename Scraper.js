// Webscraper
//Importing necessary functions
const fs = require("fs");
const { json } = require("stream/consumers"); 

const GetURLs = require("./components/GetURLs");
const ScrapeSite = require("./components/ScrapeSites");
const DeepseekAPI = require("./components/DeepseekAPI");
// Main function to run the program
async function main() {
  const attackers_list = [268267, 267548, 50313, 55410, 140012];
  const attackers_URLs = await GetURLs(attackers_list);
console.log(attackers_URLs);
  const site_data = await ScrapeSite(attackers_URLs);
  //console.log(JSON.parse(site_data));



  // Save results to a JSON file
  fs.writeFileSync("results.json", JSON.stringify(site_data, null, 2));

  console.log("✅ Results saved to results.json");


}

main();
