// var IDRow = 0;
var IDCell = 1;
var selectID = 0;
var dateID = 0;
var aantalID = 0;
//Loes: onderstaande is het javascript datum opject
var date = new Date();
//Loes: de twee api's
var api = "http://localhost:8082/api/uur/";
var api2 = "http://localhost:8082/api/tijdsformulier";
// var tijdsform = getData();
var urenlijst = new Array();


//GET tijdsformulier
function getData(){
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
  		console.log(this.responseText);
    	var tijdsform = JSON.parse(this.responseText);	
      console.log(tijdsform.length);
     			return tijdsform;
      }
    };
      xhttp.open("GET", api2, true);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();	
}



// uren koppelen aan tijdsformulier functie
function tijdVersturen(){
var urenlijst = new Array();
	for(var i = 0; i<=aantalID; i++){
		console.log("aantalID" + (aantalID + i));	
  var row = document.getElementById("select"+i).parentNode.parentNode;
  
	console.log("element" + document.getElementById("select"+i));
  console.log(row.id);
  var uur = {}
 	uur.id = row.id;

 	 urenlijst.push(uur);
 }
  	console.log("tijdversturen" + urenlijst)
	var tijdsFormulier = {}
	console.log(urenlijst);
 		tijdsFormulier.uren = urenlijst;	
		tijdsFormulier.test = "text";
		console.log(tijdsFormulier.uren);
		console.log(JSON.stringify(tijdsFormulier.uren));
		console.log(JSON.stringify(tijdsFormulier));
	posttijd(JSON.stringify(tijdsFormulier));	
};


//POST tijdsformulier
function posttijd(tijd){
	console.log(tijd);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };
  xhttp.open("POST", api2, true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(tijd);
}


//Uren versturen functie
function UrenVersturen(){
	var urenlijst = new Array();
	var table = document.getElementById("urenTabel");
	console.log(table);
	// var aantal = table.children[2];
	var tablebody = table.children[2];
	console.log(tablebody);
	var aantal = tablebody.children.length;

console.log("Start loop" + aantal);

   for(var i = 0; i<aantal; i++){
 	var uur = {}
   	var tablerow = tablebody.children[i];
   	uur.id = tablerow.id;
	var c = tablerow.children;
	
	
	//soort uren veld
	var ch = c[1];
	console.log(ch);
	var chi = ch.children[0];
	var chiVal = chi.value;
	//datumveld
	var ch0 = c[0];
	console.log("ch0" + ch0);
	var chi0 = ch0.children[0];
	console.log("chi0" + chi0);
	console.log(chi0.value);
	//aantal urenveld
	var ch2 = c[2];
	var chi2 = ch2.children[0];
	console.log(chi2.value);

 	uur.waarde = chiVal;
	uur.aantal = chi2.value; 
	var d = new Date(chi0.value);
	uur.factuurDatum = d;

  	urenlijst.push(uur);

  	//POST alleen als het id van uren 0 is, ofwel, alleen als de uren nieuw zijn toegevoegd. alle id's die hoger zijn dan 0 staan al in de database.
	 	if(tablerow.id == 0){
	 		console.log(tablerow.id);
			PostData(JSON.stringify(uur),tablerow);	
		 };
	//PUT alleen als het id van uren geen 0 is (ofwel, hij staat al in de database) en als de waarde daadwerkelijk anders is geworden.
		if(tablerow.id !=0){
			console.log(tablerow);
			console.log(tablerow.id);
			console.log("chi0.val = " + chi0.value );
			console.log("chival = " + chiVal );
			console.log("chi2.val = " + chi2.value );
		 	if(chi0.value != uur.factuurDatum){
		 		console.log("niet gelijk datum");
		 		wijzigUur(uur);
		 	}
		 	if(chiVal != uur.waarde){
		 		console.log("niet gelijk uurwaarde");
		 		wijzigUur(uur);
		 	}
		 	if(chi2.value != uur.aantal){
		 		console.log("niet gelijk aantal");
		 		wijzigUur(uur);
		 	}
		};	
		
	}
}


// function UrenBlokkeren(){
// 	var table = document.getElementById("urenTabel");
// 	console.log(table);
// 	// var aantal = table.children[2];
// 	var tablebody = table.children[2];
// 	console.log(tablebody);
// 	var aantal = tablebody.children.length;

// console.log("Start loop" + aantal);

//    for(var i = 0; i<aantal; i++){
//  	var uur = {}
//    	var tablerow = tablebody.children[i];
//    	uur.id = tablerow.id;
// 	var c = tablerow.children;
// 		// console.log("chi " + ch);
// 		// console.log("chi0 " + chi0);
// 		// console.log("chi2 " + chi2);
// 	//soort uren veld
// 	var ch = c[1];
// 	var chi = ch.children[0];

// 	chi.readOnly =true;
// 	//datumveld
// 	var ch0 = c[0];

// 	var chi0 = ch0.children[0];

// 	chi0.readOnly =true;

// 	//aantal urenveld
// 	var ch2 = c[2];
// 	var chi2 = ch2.children[0];

// 	chi2.readOnly =true;

// 	var d = new Date(chi0.value);
// };

// }


//PUT uren
function wijzigUur(uur) {
   var xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function () {
       if (this.readyState == 4) {
           if (this.status == 200) {
               // alert("Uur is gewijzigd");
           } else {
               alert(this.statusText)
           }
       }
   };
   
   xhttp.open("PUT", api+uur.id, true);
   xhttp.setRequestHeader("Content-type", "application/json");
   xhttp.send(JSON.stringify(uur));  
}

//POST uren
function PostData(data, rij){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { 
    	console.log("hallo" + this.responseText + this.status);
    	var uren = JSON.parse(this.responseText);
    	rij.id = uren.id;
    	console.log(rij.id);
    	
        }
  };
  xhttp.open("POST", api, true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(data);
}

//Dropdown menu opbouwen
function drop(selectID){
	var select = document.getElementById("select"+selectID),
	arr = ["Overuren 100%", "Overuren 125%", "Verlof Uren", "Ziekte Uren"];
	for(var i = 0; i<arr.length; i++){
		var option = document.createElement("OPTION"),
		txt = document.createTextNode(arr[i]);
		option.appendChild(txt);
		select.insertBefore(option,select.lastChild);
	}
}

//GET uren
function getUren(){
 	 	var xhttp = new XMLHttpRequest();
    	xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
  		console.log(this.responseText);
    	var uren = JSON.parse(this.responseText);	
      	for(var i = 0; i<uren.length; i++){
      		 GETRowUrenTabel(uren[i]);
      	}
     			return uren;
      }
    };
      xhttp.open("GET", api, true);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();	
};

//GET functie met opbouwen rijen urentabel
function GETRowUrenTabel(uur){
	var table = document.getElementById("urenTabel");
	var insertedRow = table.insertRow(3);
	insertedRow.id = uur.id;
	//datum
	var insertedCell = insertedRow.insertCell(0);
	var elm = document.createElement("input");
	elm.type = "date";
	console.log(uur.factuurDatum);
	elm.value = uur.factuurDatum.substring(0,10);
	insertedCell.appendChild(elm);
	//soort uren
	var insertedCell1 = insertedRow.insertCell(1);
	var elm1 = document.createElement("select");
	elm1.id = uur.id;
	var arr = ["Gewerkte Uren", "Overuren 100%", "Overuren 125%", "Verlof Uren", "Ziekte Uren"];
	for(var i = 0; i<arr.length; i++){
		var option = document.createElement("OPTION"),
		txt = document.createTextNode(arr[i]);
		option.appendChild(txt);
		option.value = arr[i];
		elm1.insertBefore(option,elm1.lastChild);
		if(arr[i] === uur.waarde){
			elm1.value = uur.waarde;
		}
	}
	console.log(elm1.value);
	insertedCell1.appendChild(elm1);
	//aantal uren
	var insertedCell2 = insertedRow.insertCell(2);
	var emp3 = document.createElement("input");
	emp3.type = "number";
	emp3.value = uur.aantal;
	insertedCell2.appendChild(emp3);
	console.log(insertedCell1);
}

//functie om rijen toe te voegen aan de tabel
function addRowUrenTabel(){
	
	table = document.getElementById("urenTabel");
	var insertedRow = table.insertRow(2);
	insertedRow.id = "0";
	// insertedRow.className = "urenRow";
	for(var i = 0; i<3; i++){
		var insertedCell = insertedRow.insertCell(i);
		insertedCell.id = IDCell++;
		//voor de eerste cel (cel 0(i=0)): voeg het datum inputveld toe
			if (i == 0) {
				dateID++;
				var temp1 = document.createElement("input");
				temp1.type = "date";
				temp1.id = "datum"+dateID; 
				
				insertedCell.appendChild(temp1);
			}
			//voor de eerste cel (cel 1(i=1)): voeg het dropdownmenu toe
			if (i == 1) {
				selectID++;
				var temp1 = document.createElement("select");
				temp1.id = "select"+selectID;
				var temp2 = document.createElement("OPTION");
				temp2.innerHTML = "Gewerkte Uren"
				temp1.appendChild(temp2);
				insertedCell.appendChild(temp1);
			}
			//voor de eerste cel (cel 2 (i=2)): voeg het aantal inputveld toe
			if (i == 2) {
				aantalID++;
				var temp1 = document.createElement("input");
				temp1.type = "number";
				temp1.min = 0;
				temp1.max = 24;
				temp1.value = 8;
				temp1.id = "aantal"+aantalID; 
				
				insertedCell.appendChild(temp1);
			}
			
	}
	drop(selectID);


function addRowDeclaratieTabel(){
	console.log("check in declaraties");
	table = document.getElementById("declaratieTabel");
	var insertedRow = table.insertRow(2);
	insertedRow.className = "declaratiesRow";
	for(var i = 0; i<4; i++){
		if(i ==3){
			var temp1 = document.createElement("input");
				temp1.type = "file";
				temp1.innerHTML = "Bijlage";
				

			var temp2 = document.createElement("button");
				temp2.className = "bijlageToevoegen";
			

			temp2.appendChild(temp1);
				
			insertedCell.appendChild(temp2);
		}
		else{
			var insertedCell = insertedRow.insertCell(i);
		}
	}
}
}








//sorteerfunctie nu niet belangrijk! mag je negeren
var TableIDvalue = "TabelOverzicht";
var TableLastSortedColumn = -1;
function SortTable() {
var sortColumn = parseInt(arguments[0]);
var type = arguments.length > 1 ? arguments[1] : 'T';
var dateformat = arguments.length > 2 ? arguments[2] : '';
var table = document.getElementById(TableIDvalue);
var tbody = table.getElementsByTagName("tbody")[0];
var rows = tbody.getElementsByTagName("tr");
var arrayOfRows = new Array();
type = type.toUpperCase();
dateformat = dateformat.toLowerCase();
for(var i=0, len=rows.length; i<len; i++) {
	arrayOfRows[i] = new Object;
	arrayOfRows[i].oldIndex = i;
	var celltext = rows[i].getElementsByTagName("td")[sortColumn].innerHTML.replace(/<[^>]*>/g,"");
	if( type=='D' ) { arrayOfRows[i].value = GetDateSortingKey(dateformat,celltext); }
	else {
		var re = type=="N" ? /[^\.\-\+\d]/g : /[^a-zA-Z0-9]/g;
		arrayOfRows[i].value = celltext.replace(re,"").substr(0,25).toLowerCase();
		}
	}
if (sortColumn == TableLastSortedColumn) { arrayOfRows.reverse(); }
else {
	TableLastSortedColumn = sortColumn;
	switch(type) {
		case "N" : arrayOfRows.sort(CompareRowOfNumbers); break;
		case "D" : arrayOfRows.sort(CompareRowOfNumbers); break;
		default  : arrayOfRows.sort(CompareRowOfText);
		}
	}
var newTableBody = document.createElement("tbody");
for(var i=0, len=arrayOfRows.length; i<len; i++) {
	newTableBody.appendChild(rows[arrayOfRows[i].oldIndex].cloneNode(true));
	}
table.replaceChild(newTableBody,tbody);
} // function SortTable()

function CompareRowOfText(a,b) {
var aval = a.value;
var bval = b.value;
return( aval == bval ? 0 : (aval > bval ? 1 : -1) );
} // function CompareRowOfText()

function CompareRowOfNumbers(a,b) {
var aval = /\d/.test(a.value) ? parseFloat(a.value) : 0;
var bval = /\d/.test(b.value) ? parseFloat(b.value) : 0;
return( aval == bval ? 0 : (aval > bval ? 1 : -1) );
} // function CompareRowOfNumbers()

function GetDateSortingKey(format,text) {
if( format.length < 1 ) { return ""; }
format = format.toLowerCase();
text = text.toLowerCase();
text = text.replace(/^[^a-z0-9]*/,"");
text = text.replace(/[^a-z0-9]*$/,"");
if( text.length < 1 ) { return ""; }
text = text.replace(/[^a-z0-9]+/g,",");
var date = text.split(",");
if( date.length < 3 ) { return ""; }
var d=0, m=0, y=0;
for( var i=0; i<3; i++ ) {
	var ts = format.substr(i,1);
	if( ts == "d" ) { d = date[i]; }
	else if( ts == "m" ) { m = date[i]; }
	else if( ts == "y" ) { y = date[i]; }
	}
d = d.replace(/^0/,"");
if( d < 10 ) { d = "0" + d; }
if( /[a-z]/.test(m) ) {
	m = m.substr(0,3);
	switch(m) {
		case "jan" : m = String(1); break;
		case "feb" : m = String(2); break;
		case "mar" : m = String(3); break;
		case "apr" : m = String(4); break;
		case "may" : m = String(5); break;
		case "jun" : m = String(6); break;
		case "jul" : m = String(7); break;
		case "aug" : m = String(8); break;
		case "sep" : m = String(9); break;
		case "oct" : m = String(10); break;
		case "nov" : m = String(11); break;
		case "dec" : m = String(12); break;
		default    : m = String(0);
		}
	}
m = m.replace(/^0/,"");
if( m < 10 ) { m = "0" + m; }
y = parseInt(y);
if( y < 100 ) { y = parseInt(y) + 2000; }
return "" + String(y) + "" + String(m) + "" + String(d) + "";
} // function GetDateSortingKey()


