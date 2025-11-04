//Importing necessary libraries
const axios = require("axios");
const fs = require("fs");
//const data = require("../DB/asn_data.json");
const { searchASNInDatabase } = require("../components/Read_Write_DB");

//This function checks whether the ASN provided has been used or not
const check_ASN = (asn) => {
  try {
    const data = searchASNInDatabase(asn);

    if (data !== null) {
      return data;
    }
  } catch (error) {
    // Add more validation logic as needed
    return error.message;
  }
};

//This function determins whether the ASN provided is valid or not
const validate_ASN = (asn) => {
  console.log("Validating ASN:", asn);
  if (asn < 1 || asn > 4294967295) {
    return false;
  } else {
    // Add more validation logic as needed
    return true;
  }
};

module.exports = { check_ASN, validate_ASN };
