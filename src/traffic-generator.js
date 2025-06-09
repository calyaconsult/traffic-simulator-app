const fs = require('fs');
const path = require('path');

// Helper functions (no changes here)
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getYesterdayDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
};

const generateNewKpis = (previousKpis) => {
  return {
    visitors: getRandomInt(previousKpis.visitors * 0.9, previousKpis.visitors * 1.1),
    pageviews: getRandomInt(previousKpis.pageviews * 0.85, previousKpis.pageviews * 1.15),
    bounceRate: parseFloat((Math.random() * (previousKpis.bounceRate * 1.2 - previousKpis.bounceRate * 0.8) + previousKpis.bounceRate * 0.8).toFixed(2)),
    avgSessionDuration: getRandomInt(previousKpis.avgSessionDuration * 0.9, previousKpis.avgSessionDuration * 1.1),
  };
};


const generateTrafficData = () => {
  const dataFilePath = path.join(__dirname, '../traffic_data.json');
  let trafficData = [];
  const seedData = { visitors: 1000, pageviews: 2500, bounceRate: 60.5, avgSessionDuration: 180 };

  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath);
      if (fileData.length > 0) trafficData = JSON.parse(fileData);
    }
  } catch (err) {
    console.error('Error reading data file:', err);
    return null;
  }

  const yesterday = getYesterdayDate();

  // ** THE FIX IS HERE **
  // Check if an entry for yesterday's date already exists.
  const existingEntry = trafficData.find(entry => entry.date === yesterday);
  if (existingEntry) {
    // If it exists, just return it without generating anything new.
    return existingEntry;
  }

  // If no entry for yesterday exists, proceed to generate it.
  const lastEntry = trafficData.length > 0 ? trafficData[trafficData.length - 1] : { kpis: seedData };
  
  // A small safety check to ensure lastEntry.kpis exists before generating new KPIs
  if (!lastEntry.kpis) {
      console.error("The last data entry is corrupted and is missing KPI data.", lastEntry);
      return null;
  }

  const newKpis = generateNewKpis(lastEntry.kpis);
  const newData = { date: yesterday, kpis: newKpis };

  trafficData.push(newData);

  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(trafficData, null, 2));
    return newData;
  } catch (err) {
    console.error('Error writing data file:', err);
    return null;
  }
};

module.exports = generateTrafficData;

// Standalone execution block (no changes here)
if (require.main === module) {
  console.log("Running in standalone mode...");
  const newTraffic = generateTrafficData();
  if (newTraffic) {
    console.log("Successfully generated and saved/retrieved new traffic data:");
    console.log(JSON.stringify(newTraffic, null, 2));
  }
}
