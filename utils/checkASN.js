//Importing necessary libraries
const axios = require("axios");
const fs = require("fs");
const data = require("../DB/asn_data.json");

//This function checks whether the ASN provided has been used or not
const check_ASN = (asn) => {
  try {
    //console.log("ASN Data: ", data);
    for (let i = 0; i < data.length; i++) {
      if (data[i].at === asn) {
        return data[i];
        //console.log("ASN Found: ", data[i]);
        //return `ASN ${asn} has been used by ${data[i].name} since ${data[i].date}`;
      }
    }
    //ASN not found in the data
    return false;
  } catch (error) {
    // Add more validation logic as needed
    return error.message;
  }
};

//This function determins whether the ASN provided is valid or not
const verify_ASN = (asn) => {
  if (!asn) {
    return false;
  }

  // Add more validation logic as needed
  return true;
};

module.exports = { check_ASN, verify_ASN };
