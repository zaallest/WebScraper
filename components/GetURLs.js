//Importing necessary libraries
const axios = require("axios");
const cheerio = require("cheerio");

//This function use the list of attackers provided to fetch URLs associated with attackers...
const GetURLs = async (attacker) => {
  // Base URL
  const url = ["https://bgp.he.net/AS"];
  const attackers_URLs = [];
  try {
    for (const at of attacker) {
      // const result = await scrapeSite(url, itemsToSearch);
      //allResults.push(result);

      const { data } = await axios.get(url + "" + at);
      const $ = cheerio.load(data);

      //Get all visible text on the page
      const pageText = $("body").text().toLowerCase();

      //Get first and last index of the URL
      const f_index = pageText.indexOf("https://www.");
      const l_index = pageText.lastIndexOf(".br");
      const l_index2 = pageText.indexOf("/");

      //check if there is an attacker URL
      if (f_index > 0 && l_index > 0) {
        //Get the URL correspond to the code..
        const URL = pageText.substring(f_index, l_index + 3);

        //Puch url to the list
        attackers_URLs.push({ at: at, url: URL });
      } else if (f_index > 0 && l_index2 > 0) {
        const URL = pageText.substring(f_index, l_index2 + 40).trim();

        //Puch url to the list
        attackers_URLs.push({ at: at, url: URL });
      }
    }
  } catch (error) {
    console.log("An error occured please check you internet and try anain... ");
  }

  return attackers_URLs;
};

module.exports = GetURLs;
