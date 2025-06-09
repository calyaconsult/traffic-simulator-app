// This relative path './' works because app.js and traffic-generator.js are in the same folder.
const generateTrafficData = require('./traffic-generator.js');

console.log("Welcome to my main application!");
console.log("I need to get the latest traffic data...");

const latestTraffic = generateTrafficData();

if (latestTraffic) {
  console.log("Data generation successful!");
  console.log(`Yesterday's date: ${latestTraffic.date}`);
  console.log(`Number of visitors: ${latestTraffic.kpis.visitors}`);
  if (latestTraffic.kpis.bounceRate > 85) {
    console.warn("ALERT: Bounce rate is very high!");
  }
} else {
  console.error("Failed to generate traffic data.");
}

console.log("Main application has finished its task.");
