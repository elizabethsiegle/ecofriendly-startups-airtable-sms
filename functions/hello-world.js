const airtable = require("airtable");
exports.handler = function (context, event, callback) {
  const base = new airtable({
   apiKey: context.AIRTABLE_API_KEY,
 }).base(context.AIRTABLE_BASE_ID);
 const twiml = new Twilio.twiml.MessagingResponse();
 const category = event.Body.toLowerCase().trim();
 let randArr = [];
 let randRecord;
 return base("climate tech")
 .select()
 .all()
 .then((records) => {
   records.forEach((record) => {
     if (category == record.get("category")) { //inbMsg i is in 
       randArr.push(record);
      } //if
    }); //records.forEach
    if(randArr.length > 0) {
      twiml.message(randArr.length);
      let randNum = Math.random()*randArr.length;
      twiml.message(randNum);
      randRecord = randArr[Math.floor(Math.random()*randArr.length)];
      twiml.message(`A random startup tackling ${category} is ${randRecord.get("company")}: ${randRecord.get("overview")} More at ${randRecord.get("website")}. These are the categories you can send to discover startups working towards: energy, transportation, grid, materials+manufacturing, education, water, food+agriculture.`);
      callback(null, twiml);
    }
    twiml.message(`Send one of these categories : energy, transportation, grid, materials+manufacturing, education, water, food+agriculture.`);
    callback(null, twiml);
   });
};