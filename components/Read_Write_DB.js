// Read and write operations for the database

const fs = require("fs");   
const path = require("path");

// Function to read data from the database (JSON file)
const readDatabase = () => {
    const dbPath = "./DB/asn_data.json";
  try {
    const absolutePath = path.resolve(dbPath);
    const jsonData = fs.readFileSync(absolutePath, "utf-8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading database:", error);
    return null;
  }
};

// Function to write data to the database (JSON file)
const writeDatabase = (data) => {
    const dbPath = "./DB/asn_data.json";
  try {
  
    let db_data = fs.readFileSync(dbPath, "utf8");
    let json_data = JSON.parse(db_data);
    json_data.push(...data);

    fs.writeFileSync(dbPath, JSON.stringify(json_data, null, 2));
    console.log("Database updated successfully.");
    
  } catch (error) {
    console.error("Error writing to database:", error);
  }
};

const searchASNInDatabase = (asn) => {
    const data = readDatabase();
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].at === asn) {
          return data[i];
        }
      }
    }
    return null;
  };

module.exports = { readDatabase, writeDatabase, searchASNInDatabase };