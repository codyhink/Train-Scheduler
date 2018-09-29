$(document).ready(function () {

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDFghpqI4in1mkrmEqpAuO-Nk8XQywZoPk",
    authDomain: "train-scheduler-e484b.firebaseapp.com",
    databaseURL: "https://train-scheduler-e484b.firebaseio.com",
    projectId: "train-scheduler-e484b",
    storageBucket: "train-scheduler-e484b.appspot.com",
    messagingSenderId: "860573370355"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  

  
  $('#submit').on('click', function (event) {
      event.preventDefault();
      // Capture user input values
     var $name= $('#trainName').val().trim();
     var $destination= $('#destination').val().trim();
     var $initialTime= $('#initialTime').val().trim();
     var $frequency= $('#frequency').val().trim();

     //object to hold variables
     var newTrain = {
        name: $name,
        destination: $destination,
        ftTime: $initialTime,
        frequency: $frequency,
     }

     //push data up to firebase
     database.ref().push(newTrain);


     //clears out form
     $('.form-control').val('');

  });

  database.ref().on('child_added', function (snapshot) {

    convertTime = moment(snapshot.val().ftTime, 'HH:mm').subtract(1,'years');

    diffTime = moment().diff(moment(convertTime), 'minutes');

    remainTime = diffTime % snapshot.val().frequency;

    minAway = snapshot.val().frequency - remainTime;

    arriveTime = moment().add(minAway, 'minutes');

    var newRow = $('<tr>').append(
        $('<td>').text(snapshot.val().name),
        $('<td>').text(snapshot.val().destination),
        $('<td>').text(snapshot.val().frequency),
        $('<td>').text(arriveTime.format('hh:mm')),
        $('<td>').text(minAway),
        
    )

    $('#tdata').append(newRow)


  })

})