var api = "http://localhost:8082/api/trainee/";


function traineeFields(){
  console.log(document.getElementById("apiUrl").value);
  var voornaam = document.getElementById("voornaam").value;
  var achternaam = document.getElementById("achternaam").value;
  var username = document.getElementById("username").value;
  var wachtwoord = document.getElementById("wachtwoord").value;
  var loon = document.getElementById("loon").value;
  var type = document.getElementById("type").value;
  var trainee = {}
    trainee.voornaam = voornaam;
    trainee.achternaam = achternaam;
    trainee.username = username; 
    trainee.wachtwoord = wachtwoord;
    trainee.loon = loon;
    trainee.type = type;
    trainee.uren = new Array(); 
    return trainee;
}

function UserVersturen(){
					
  trainee = traineeFields();
	  postData(JSON.stringify(trainee));
}
//POST
function postData(data){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 202) {
      console.log(this.responseText);
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("POST", api, true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(data);
}

//GET
function getData(){
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
  		console.log(this.responseText);
    	var trainee = JSON.parse(this.responseText);	
      console.log(trainee.length);
    	        

  		var table = document.createElement("table");
      addHtmlElement(
        table,
        traineeTableHeader());

      var tbody = addHtmlElement(table, document.createElement("tbody"));
      for(var i = 0; i< trainee.length; i++){
        addHtmlElement(tbody, traineeTableRow(trainee[i]));
      }

      document.getElementById("traineelijst").appendChild(table);
     			
      }
    };
      xhttp.open("GET", api, true);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();	
}
//DELETE
function NumberDelete(){
  var numb = document.getElementById("number").value;
  DeleteTrainee(numb);
}

function DeleteTrainee(numb) {
  console.log(numb);
  console.log(api);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("DELETE", api+numb, true);
  xhttp.send();
}

//PUT
function NumberWijzigen(){
  var numbW = document.getElementById("numberW").value;
  console.log(numbW);
  getById(numbW);
  return numbW;
}

//GET by id
function getById(id){
  var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    // console.log(this.responseText);
    var trainee = JSON.parse(this.responseText);  

    voegTraineeToe("traineeIndividu", trainee);
    
            }
    };
     xhttp.open("GET", api+id, true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(); 
}

function wijzigTrainee(){

  var numbW = huidigeTrainee.id;
  console.log(huidigeTrainee.id);
  huidigeTrainee.voornaam = document.getElementById("voornaam" + numbW).value;
  huidigeTrainee.achternaam = document.getElementById("achternaam" + numbW).value;
  huidigeTrainee.username = document.getElementById("username" + numbW).value;
  huidigeTrainee.wachtwoord = document.getElementById("wachtwoord" + numbW).value;
  huidigeTrainee.loon = document.getElementById("loon" + numbW).value;
  huidigeTrainee.type = document.getElementById("type" + numbW).value;
  huidigeTrainee.uren = document.getElementById("uren" + numbW).value;
  console.log(huidigeTrainee);
  var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("traineeIndividu");
      console.log("traineeIndividu");
    }
  };
  xhttp.open("PUT", api+numbW, true); // let op dat je achter users zet welk element je wil hebben hier

    xhttp.setRequestHeader("Content-type", "application/json"); // moet bij PUT er altijd bij staan, bij GET hoeft het niet

    xhttp.send(JSON.stringify(huidigeTrainee));  // kan niet als object worden meegestuurd, moet als string, vandaar stringify


}

var huidigeTrainee ;
function voegTraineeToe(element, trainee){
  huidigeTrainee = trainee;
  var tID = trainee.id;
  var e = document.getElementById(element);
  var t = document.createElement("input");
  t.value = trainee.voornaam;
  t.id = "voornaam"+tID;
  e.appendChild(t);
  t = document.createElement("input");
  t.value = trainee.achternaam;
  t.id = "achternaam"+tID;
  e.appendChild(t);
  t = document.createElement("input");
  t.value = trainee.username;
  t.id = "username"+tID;
  e.appendChild(t);
  t = document.createElement("input");
  t.value = trainee.wachtwoord;
  t.id = "wachtwoord"+tID;
  e.appendChild(t);
  t = document.createElement("input");
  t.value = trainee.loon;
  t.id = "loon"+tID;
  e.appendChild(t);
  t = document.createElement("input");
  t.value = trainee.type;
  t.id = "type"+tID;
  e.appendChild(t);
  t = document.createElement("input");

}



function addHtmlElement(parent, child) {
  parent.appendChild(child);
  return child;
}

function addHtmlElementContent(parent, child, tekst) {
   parent.appendChild(child);
   child.innerHTML = tekst;
   return child;
}
function traineeTableHeader() {
   var tableHeader = document.createElement("thead");
   var tr = addHtmlElement(tableHeader, document.createElement("tr"));
   addHtmlElementContent(tr, document.createElement("th"), "id");
   addHtmlElementContent(tr, document.createElement("th"), "Voornaam");
   addHtmlElementContent(tr, document.createElement("th"), "Achternaam");
   addHtmlElementContent(tr, document.createElement("th"), "Username");
   addHtmlElementContent(tr, document.createElement("th"), "Wachtwoord");
   addHtmlElementContent(tr, document.createElement("th"), "Loon");
   addHtmlElementContent(tr, document.createElement("th"), "Uren");
   return tableHeader;
}

function traineeTableRow(trainee) {
   var tr = document.createElement("tr");
   addHtmlElementContent(tr, document.createElement("td"), trainee.id);
   addHtmlElementContent(tr, document.createElement("td"), trainee.voornaam);
   addHtmlElementContent(tr, document.createElement("td"), trainee.achternaam);
   addHtmlElementContent(tr, document.createElement("td"), trainee.username);
   addHtmlElementContent(tr, document.createElement("td"), trainee.wachtwoord);
   addHtmlElementContent(tr, document.createElement("td"), trainee.loon);
   addHtmlElementContent(tr, document.createElement("th"), trainee.uren);
   return tr;
}

function addHtmlElement(parent, child) {
   parent.appendChild(child);
   return child;
}

function addHtmlElementContent(parent, child, tekst) {
   parent.appendChild(child);
   child.innerHTML = tekst;
   return child;
}





    // traineeFields().id;
    // console.log(traineeFields().id);
    // for(var i = 0; i<trainee.length; i++){
    //             var ELM = document.getElementById("traineeIndividu");
    //             ELM.innerHTML += trainee[i].voornaam;
    //             ELM.innerHTML += "<br>";
    //           }