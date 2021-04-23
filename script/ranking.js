class RankingApi {
  constructor() {
    // Initialize Cloud Firestore through Firebase
    firebase.initializeApp({
      apiKey: "AIzaSyDoSLQD8EAjOkvy2PtKO-g9WP0OR3HJFUc",
      authDomain: "space-invaders-a8aa8.firebaseapp.com",
      projectId: "space-invaders-a8aa8",
      storageBucket: "space-invaders-a8aa8.appspot.com",
      messagingSenderId: "743069903148",
      appId: "1:743069903148:web:156f012546631489d5a489"
    });
  }

  putScore(nick, score) {
    if (nick != "" || nick != null) {
      firebase.firestore().collection("ranking").add({
        user: nick,
        score: score
      })
        .then((docRef) => {
          console.log("Score enviado com ID: ", docRef.id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  getScores(userMatrix, scoreMatrix, func){
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
      }).then(func);
    }

    generate_table() {
      // get the reference for the body
      let body = document.getElementsByTagName("body")[0];
    
      // creates a <table> element and a <tbody> element
      let tbl = document.createElement("table");
      let tblBody = document.createElement("tbody");
    
      let userMatrix = [];
      let scoreMatrix = [];
    
      this.getScores(userMatrix, scoreMatrix, createTable);
    
      function createTable() {
        // creating all cells
        let max = userMatrix.length;
        if (userMatrix.length > 20) max = 20;
        for (let i = 0; i < max; i++) {
          // creates a table row
          let row = document.createElement("tr");
    
          for (let j = 0; j < 2; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            let cell = document.createElement("td");
            let cellText;
            if (j == 0) {
              cellText = document.createTextNode(userMatrix[i]);
            } else {
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
        tbl.setAttribute("style", "position:absolute; top:1000px;left:50%; transform: translate(-50%, -5%);border-color: white;color: white;");
      }
    }
}