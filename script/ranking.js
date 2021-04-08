// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDoSLQD8EAjOkvy2PtKO-g9WP0OR3HJFUc",
    authDomain: "space-invaders-a8aa8.firebaseapp.com",
    projectId: "space-invaders-a8aa8",
    storageBucket: "space-invaders-a8aa8.appspot.com",
    messagingSenderId: "743069903148",
    appId: "1:743069903148:web:156f012546631489d5a489"
});

// Gera a tabela de ranking
generate_table();

function generate_table() {
    // get the reference for the body
    var body = document.getElementsByTagName("body")[0];
  
    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
  
    var userMatrix = [];
    var scoreMatrix = [];
    let index = 0;
    firebase.firestore().collection("ranking").orderBy("score", "desc")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                userMatrix[index] = doc.data().user;
                scoreMatrix[index] = doc.data().score;
                index++;
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
    }).then(createTable);

    function createTable(){
      // creating all cells
      let max = userMatrix.length;
      if(userMatrix.length > 20) max = 20;
      for (var i = 0; i < max; i++) {
        // creates a table row
        var row = document.createElement("tr");
    
        for (var j = 0; j < 2; j++) {
          // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row
          var cell = document.createElement("td");
          var cellText;
          if(j==0) {
            cellText = document.createTextNode(userMatrix[i]);
          }else {
            cellText = document.createTextNode(scoreMatrix[i]);
          }
          cell.setAttribute("style", "padding: 6px; text-size: 20px; font-family: Press Start");
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
    
        // add the row to the end of the table body
        tblBody.appendChild(row);
      }
    
      // put the <tbody> in the <table>
      tbl.appendChild(tblBody);
      // appends <table> into <body>
      body.appendChild(tbl);
      // sets the border attribute of tbl to 2;
      tbl.setAttribute("border", "2");
      tbl.setAttribute("style", "position:absolute; top:105%;left:50%; transform: translate(-50%, -5%);border-color: white;color: white;" );
    }
  }