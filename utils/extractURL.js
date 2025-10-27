//Initiate function to extrct the ASN curresponding URL..
const extractURL = (pageText, asn) => {
  //Get first and last index of the URL
  const f_index = pageText.indexOf("https://");
  const f_index2 = pageText.indexOf("http://");

  if (f_index) {
    const URL = pageText.substring(f_index, f_index + 35).trim();

    if (URL.indexOf("/" + asn) > -1) {
      if (f_index2 > -1) {
        const URL_ = pageText.substring(f_index2, f_index2 + 35).trim();
        return URL_;
      }
    } else {
      return URL;
    }
  } else {
    if (f_index2 > -1) {
      const URL = pageText.substring(f_index2, f_index2 + 35).trim();
      return URL;
    }
  }
};

//Export function
module.exports = extractURL;
