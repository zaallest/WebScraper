// Webscraper
//Importing necessary functions
const fs = require("fs");
const path = require("path");

const { json } = require("stream/consumers");
const GetURLs = require("./components/GetURLs");
const ScrapeSite = require("./components/ScrapeSites");
const ChatGPT4oRes = require("./components/ChatGPT4o");
const { check_ASN, validate_ASN } = require("./utils/checkASN");
const { writeDatabase } = require("./components/Read_Write_DB");

// Main function to run the program
async function main(ASNs) {
  // List of attacker ASNs to scrape
  const attackers_list = [];
  const asn_data = [];

  // Check if ASNs is an array or a CSV file path
  if (Array.isArray(ASNs) && ASNs.length > 0) {
    // If ASNs is an array, use it directly
    for (const asn of ASNs) {
      //console.log("ASN:", asn);
      //ASN Validation
      const is_valid = validate_ASN(asn);
      if (is_valid) {
        //Check if ASN exists in database
        const asn_found = check_ASN(asn);
        if (asn_found) {
          asn_data.push(asn_found);
        } else {
          // Push each ASN to the attackers_list
          attackers_list.push(asn);
        }
      } else {
        asn_data.push({ at: asn, error: "Invalid ASN" });
      }
    }
  }
  // If ASNs is a single number, convert it to an array
  else if (typeof ASNs === "number") {
    //ASN Validation
    const is_valid = validate_ASN(ASNs);

    if (is_valid) {
      //Check if ASN exists in database
      const asn_found = check_ASN(ASNs);
      if (asn_found) {
        asn_data.push(asn_found);
      } else {
        // Push each ASN to the attackers_list
        attackers_list.push(ASNs);
      }
    } else {
      asn_data.push({ at: ASNs, error: "Invalid ASN" });
    }
  }
  // If ASNs is a string, check if it's a CSV file path
  else if (path.resolve(ASNs).toLowerCase().endsWith(".csv")) {
    const absolutePath = path.resolve(ASNs);

    // Read the CSV file and populate attackers_list
    const csvData = fs.readFileSync(absolutePath, "utf-8");
    const lines = csvData.split("\n");
    for (const line of lines) {
      const asn = line.trim();
      if (asn) {
        //ASN Validation
        const is_valid = validate_ASN(asn);
        if (is_valid) {
          //Check if ASN exists in database
          const asn_found = check_ASN(asn);
          if (asn_found) {
            asn_data.push(asn_found);
          } else {
            // Push each ASN to the attackers_list
            attackers_list.push(asn);
          }
        } else {
          asn_data.push({ at: asn, error: "Invalid ASN" });
        }
      }
    }
  } else {
    asn_data.push({ at: ASNs, error: "Invalid ASN" });
  }

  // Get URLs for the provided attacker ASNs
  if (attackers_list.length !== 0) {
    const attackers_URLs = await GetURLs(attackers_list);
    //console.log("✅ URLs fetched!!\n" + JSON.stringify(attackers_URLs, null, 2));
    // Scrape each URL to get site data
    const site_data = await ScrapeSite(attackers_URLs);

    //console.log(site_data);
    //Analyze each site's text data using ChatGPT4o
    for (const site of site_data) {
      const data =
        "Analyse the following website data and provide a summary: " +
        site.site_data.trim();
      const summary = await ChatGPT4oRes(data);
      //const cleaned_summary = JSON.stringify(summary);
      //Get data from the AI response and pass it to the dataset
      for(const dd of JSON.parse(summary)){
        site.country = dd.country;
        site.company = dd.company;
        site.services = dd.services;

        }
      
    }

    //Push data the database..
    writeDatabase(site_data);

    // Append the new site data to asn_data
    asn_data.push(...site_data);
  } else {
    console.log("✅ All ASNs already found in the database!!: ");
    
  }

  // Save results to a JSON file
  //fs.writeFileSync("results.json", JSON.stringify(site_data, null, 2));
  fs.writeFileSync("results.json", JSON.stringify(asn_data, null, 2));

  console.log("✅ Results saved to results.json!!");

  //Print Message
  console.log("✅ ChatGPT4o!");
  //console.log(JSON.stringify(attackers_list, null, 2));
  //console.log("✅ Process completed! \n" + JSON.stringify(asn_data, null, 2));
}
const attackers_list = [
  50313, 55410, 140012, 328832, 3772, 20912, 6849, 142271, 61302, 60539, 132203,
  57304, 37100, 12713, 263152, 270627, 206271, 4809, 29390, 60707, 8953, 53427,
  3223, 53184, 37468, 6461, 6939, 137409, 396998, 52873, 9002, 32097, 13786,
  209533, 16265, 56630,
];
const at_lst = [32097, 13786,6461, 6939, 137409, 396998, 52873, 6939, 6461];
//main(attackers_list);
//main(at_lst);
main(137409);
//main(396998);//Error encounterer when scraping site data
// main("attackers.asn.csv");
