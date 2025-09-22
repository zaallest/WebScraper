//Importing necessary libraries
const axios = require("axios");
const cheerio = require("cheerio");

//This function use the list of attackers provided to fetch URLs associated with attackers...
const ScrapeSite = async (attackers_URLs) => {
  const site_data = [];
  let i = -1;
  //Featch each URL site data..
  for (const at of attackers_URLs) {
    i++;
    try {
      const { data } = await axios.get(at.url);
      const $ = cheerio.load(data);

      // Get all visible text on the page
      const pageText = $("body").text().toLowerCase();
      const result = { at: at.at, url: at.url, text: pageText };
      site_data.push(result);
    } catch (err) {
      console.error(`Error scraping ${attackers_URLs[i].url}: ${err.message}`);
      // Optionally, you can push an error object to site_data if you want to keep track of failed URLs
      site_data.push({
        at: attackers_URLs[i].at,
        url: attackers_URLs[i].url,
        error: err.message,
      });
      //return { url, error: err.message };
    }
  }
  return site_data;
};

// Export the ScrapeSite function
module.exports = ScrapeSite;
