const airtable = require("airtable");
exports.handler = function (context, event, callback) {
  const base = new airtable({
   apiKey: context.AIRTABLE_API_KEY,
 }).base(context.AIRTABLE_BASE_ID);
 const twiml = new Twilio.twiml.MessagingResponse();
 const category = event.Body.toLowerCase().trim();
 let randArr = [];
 let randRecord;
 return base("climate orgs")
 .select()
 .all()
 .then((records) => {
   records.forEach((record) => {
     //if (category == record.get("category")) { //inbMsg i is in
     if (category.includes(String(record.get("category")))) { 
       randArr.push(record);
      } //if
    }); //records.forEach
    if(randArr.length > 0) {
      let randNum = Math.random()*randArr.length;
      randRecord = randArr[Math.floor(randNum)];
      twiml.message(`A random ${category} org. is ${randRecord.get("org")}. \n\n${randRecord.get("overview")} More at ${randRecord.get("website")}. \n\nThese are the categories you can text📲 to discover non-profits about: energy⚡️, transportation🚴🏻‍♀️, water💧, food+agriculture🐷.`);
      callback(null, twiml);
    }
    twiml.message(`Send one of these categories : energy, environment, climate, transportation, water, food+agriculture.`);
    callback(null, twiml);
   });
};