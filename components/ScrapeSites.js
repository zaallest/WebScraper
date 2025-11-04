//Importing necessary libraries
const axios = require("axios");
const cheerio = require("cheerio");

//This function use the list of attackers provided to fetch URLs associated with attackers...
const ScrapeSite = async (attackers_URLs) => {
  const site_data = [];

  //Featch each URL site data..
  for (const at of attackers_URLs) {

    try {
      // Fetch the HTML content of the URL
      const { data } = await axios.get(at.url);

      const $ = cheerio.load(data);

      // Extract and clean the text content from the page. Convert to lowercase and remove extra whitespace.
      const pageText = $("body")
        .text()
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

        // Store the result in an object
      const result = { at: at.at, url: at.url, site_data: pageText };
      // Push the result to the site_data array
      site_data.push(result);
    } catch (err) {
      // In case of an error (e.g., network issue, invalid URL), log the error and continue
      // site_data.push({
      //   at: attackers_URLs[i].at,
      //   url: attackers_URLs[i].url,
      //   error: err.message,
      // });
      //console.log({ asn:at.url, error: err.message });
    }
  }
  // Return the array of site data
  return site_data;
};

// Export the ScrapeSite function
module.exports = ScrapeSite;
