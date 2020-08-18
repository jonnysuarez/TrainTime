var firebaseConfig = {
        apiKey: "AIzaSyCp8x_13idLW6T1z6LzJkKCdPUQwAyDIn4",
        authDomain: "jsuarez.firebaseapp.com",
        databaseURL: "https://jsuarez.firebaseio.com",
        projectId: "jsuarez",
        storageBucket: "jsuarez.appspot.com",
        messagingSenderId: "109935557261",
        appId: "1:109935557261:web:a970d98b8a21ab34d740c4",
        measurementId: "G-M3796FY3R6"
      };
firebase.initializeApp(firebaseConfig);

//Assign the database to a variable
var database = firebase.database();

var trainName = "";
var trainDestination = "";
var firstTrain = "";
var trainFrequency = 0;

//display a current time clock
function currentTime() {
  var current = moment().format('LT');
  $("#clock").html(current);
  setTimeout(currentTime, 1000);
};
currentTime()

//When submit button is clicked 
$("#submit-button").on("click", function(event) {
  event.preventDefault();

  trainName = $("#Input1").val().trim();
  trainDestination = $("#Input2").val().trim();
  firstTrain = $("#Input3").val().trim();
  trainFrequency = $("#Input4").val().trim()

  database.ref("/trains").push({
    trainName: trainName,
    trainDestination: trainDestination,
    firstTrain: firstTrain,
    trainFrequency: trainFrequency
  });

  $("#Input1").val("");
  $("#Input2").val("");
  $("#Input3").val("");
  $("#Input4").val("");

});

//need to add input data to table
database.ref("/trains").on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val().trainName);
  console.log(childSnapshot.val().trainDestination);
  console.log(childSnapshot.val().firstTrain);
  console.log(childSnapshot.val().trainFrequency);
  
  trainName = childSnapshot.val().trainName;
  trainDestination = childSnapshot.val().trainDestination;
  firstTrain = childSnapshot.val().firstTrain;
  trainFrequency = childSnapshot.val().trainFrequency;
  //Do math to add current time and arrival times.
  var firstTimeConverted = moment(firstTrain, "HH:mm")
  console.log(firstTimeConverted) 
  var currentTime = moment();
  console.log("Current Time: " + moment(currentTime).format("HH:mm"));
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("Difference in Time: " + diffTime);
  var timeRemainder = diffTime % trainFrequency;
  console.log(timeRemainder);
  var minutesTillTrain = trainFrequency - timeRemainder;
  console.log("Minutes to Train " + minutesTillTrain);
  var nextTrainArrive = moment().add(minutesTillTrain, "minutes");
  console.log("Arrival Time:" + moment(nextTrainArrive).format("hh:mm"));

  // .append() to the table row to add a new row with trainName
  $("#trainRows").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + moment(nextTrainArrive).format("hh:mm") + "</td><td>" + minutesTillTrain + "</td></tr>");

});

setInterval(function() {
  window.location.reload();
}, 60000);