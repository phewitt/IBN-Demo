var admin = require("firebase-admin");
var serviceAccount = require("../secretConfigs/firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ibn-demo.firebaseio.com"
});

let db = admin.firestore();

function getCurrentDateTime() {
  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  const year = today.getFullYear();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();

  if (day < 10) day = `0${day}`;
  if (month < 10) month = `0${month}`;
  if (hour < 10) hour = `0${hour}`;
  if (minute < 10) minute = `0${minute}`;
  if (second < 10) second = `0${second}`;

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

module.exports.save = async exchangeDataArray => {
  const datetime = getCurrentDateTime();
  for (data of exchangeDataArray) {
    data["datetime"] = datetime;
    await db.collection("exchangePrices").add(data);
  }
};

module.exports.getCoinHistory = async coinType => {
  let data = [];
  let colRef = db
    .collection("exchangePrices")
    .where("name", "==", coinType.toLowerCase())
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data());
      //  console.log(doc.id, " => ", doc.data());
      });
      console.log(data);
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });

    await colRef;
    return data;
};
