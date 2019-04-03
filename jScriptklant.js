var api = "http://localhost:8082/api/uur/";

//GET
function getUren(){
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
  		console.log(this.responseText);
    	var uren = JSON.parse(this.responseText);	
      console.log(uren.length);
    	        

  		var table = document.createElement("table");
      addHtmlElement(
        table,
        traineeTableHeader());

      var tbody = addHtmlElement(table, document.createElement("tbody"));
      for(var i = 0; i< uren.length; i++){
        addHtmlElement(tbody, traineeTableRow(uren[i]));
      }

      document.getElementById("traineelijst").appendChild(table);
     			
      }
    };
      xhttp.open("GET", api, true);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();	
}

//tabelmaken

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

   addHtmlElementContent(tr, document.createElement("th"), "Soort uur");
   addHtmlElementContent(tr, document.createElement("th"), "Aantal");
   addHtmlElementContent(tr, document.createElement("th"), "Datum");
   addHtmlElementContent(tr, document.createElement("th"), "Akkoordstatus");
      addHtmlElementContent(tr, document.createElement("th"), "Accoderen");
   return tableHeader;
}

function traineeTableRow(uur) {
   var tr = document.createElement("tr");
   addHtmlElementContent(tr, document.createElement("td"), uur.waarde, uur.id);
   addHtmlElementContent(tr, document.createElement("td"), uur.aantal,uur.id);
   addHtmlElementContent(tr, document.createElement("td"), uur.factuurDatum.substring(0,10), uur.id);
   addHtmlElementContent(tr, document.createElement("td"), uur.accordStatus, uur.id);
   addButton(tr, document.createElement("td"), document.createElement("select"), document.createElement("OPTION"), document.createElement("OPTION"), uur.id);
   return tr;
}

function addHtmlElement(parent, child) {
   parent.appendChild(child);
   return child;
}

function addHtmlElementContent(parent, child, tekst, id) {
  parent.id = id
   parent.appendChild(child);
   child.innerHTML = tekst;
   return child;
}

function addButton(parent, child, select, option1, option2, id){
  parent.id = id;
  parent.appendChild(child);
  select.appendChild(option1);
  option1.innerHTML = "goedkeuren";
  select.appendChild(option2);
  option2.innerHTML = "afkeuren";
  child.appendChild(select);
   return child;
}

function akkoordVerzenden(){
var table = document.getElementById("traineelijst");
  var table = table.children[0];
  console.log(table);
  var body = table.children[1];
  console.log(body);
  var rows = body.children;
  console.log(rows);
  var aantal = rows.length;
  console.log(aantal);
  for(var i = 0; i<aantal; i++){
    var uur = {}

    var row = rows[i];
        uur.id = row.id;
    console.log(row);
    var cellA = row.children[4];
    console.log(cellA);
    var cellAInhoud = cellA.children[0];
    // console.log(cellAInhoud.value);
    if(cellAInhoud.value == "goedkeuren"){
      uur.accordStatus = 2;
      // console.log(uur.accordStatus);
    }
    if(cellAInhoud.value == "afkeuren"){
      uur.accordStatus = 3;
      // console.log(uur.accordStatus);
    }
    // console.log(rows[i].id)
    console.log(uur);
    PutUrenstatus(uur, rows[i].id);
  }

}

//PUT uren
function PutUrenstatus(uur, rij){
  var xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function () {
       if (this.readyState == 4) {
                    console.log(uur.accordStatus);
           if (this.status == 200) {

           } else {
             
           }
       }
   };

   xhttp.open("PUT", api+rij, true);
   xhttp.setRequestHeader("Content-type", "application/json");
   xhttp.send(JSON.stringify(uur));  
}
