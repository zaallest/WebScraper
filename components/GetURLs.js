//Importing necessary libraries
const axios = require("axios");
const cheerio = require("cheerio");
const extractURL = require("../utils/extractURL");

//This function use the list of attackers provided to fetch URLs associated with attackers...
const GetURLs = async (attacker) => {
  // Base URL
  const url = "https://bgp.he.net/AS";
  let attackers_URLs = [];

  if (attacker.length > 1) {
    //Multiple ASNs provided as input
    for (const asn of attacker) {
      try {
        const { data } = await axios.get(url + "" + asn);
        const $ = cheerio.load(data);

        //Get all visible text on the page
        const pageText = $("body").text().toLowerCase();
        const extracted_url = extractURL(pageText, asn);

        attackers_URLs.push({ at: asn, url: extracted_url });
      } catch (error) {
        console.log("Error fetching URL for ASN " + asn + ": " + error);
      }
    }
  } else {
    //Single ASN provided as input
    try {
      const { data } = await axios.get(url + "" + attacker[0]);
      const $ = cheerio.load(data);

      //Get all visible text on the page
      const pageText = $("body").text().toLowerCase();

      const extracted_url = extractURL(pageText, attacker[0]);

      attackers_URLs.push({ at: attacker[0], url: extracted_url });
    } catch (error) {
      console.log("Error fetching URL for ASN " + attacker[0] + ": " + error);
    }
  }

  return attackers_URLs;
};

module.exports = GetURLs;
