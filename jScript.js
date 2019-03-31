var IDRow = 0;
var IDCell = 1;
var selectID = 0;
var dateID = 0;
var aantalID = 0;
var date = new Date();
var api = "http://localhost:8082/api/uur/";
var api2 = "http://localhost:8082/api/tijdsformulier";
// var tijdsform = getData();
const urenlijst = new Set();


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
function getUren(){
 	 	var xhttp = new XMLHttpRequest();
    	xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
  		console.log(this.responseText);
    	var uren = JSON.parse(this.responseText);	
      // console.log(tijdsform.length);
     			return uren;
      }
    };
      xhttp.open("GET", api, true);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send();	
};

function tijdFields(uur){
	console.log(urenlijst);

	

  var tijdsFormulier = {}
 	tijdsFormulier.uren = uur;	
	tijdsFormulier.test = "text";
	console.log(tijdsFormulier.uren);
	console.log(JSON.stringify(tijdsFormulier))
	
	return JSON.stringify(tijdsFormulier);

};	

function tijdVersturen(){
	var tijdsFormulier = tijdFields();
	posttijd(JSON.stringify(tijdsFormulier));	
}


//POST
function posttijd(tijd){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 202) {
      console.log(this.responseText);
    }
  };
  xhttp.open("POST", api2, true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(tijd);
}




function UrenVersturen(){

   // console.log(document.getElementById("apiUrl").value);
   for(var i = 0; i<=aantalID; i++){
  var waarde = document.getElementById("select"+i).value;
  var aantal = document.getElementById("aantal"+i).value;

  var datum = new Date(document.getElementById("datum"+i).value);
  var uur = {}
 	uur.waarde = waarde;
 	uur.aantal = aantal;
 	uur.factuurDatum = datum;
 	uur.omschrijving = "tekst";
 	urenlijst.add(uur);
	PostData(JSON.stringify(uur));	
	tijdFields(JSON.stringify(uur));
	};	
}

function PostData(data){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 202) {
    	console.log(this.responseText);
        }
  };
  xhttp.open("POST", api, true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(data);
}


function verzondenDeclaraties(){
	alert("Uw declaraties zijn verzonden");
}

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

function addRowUrenTabel(){
	
	table = document.getElementById("urenTabel");
	var insertedRow = table.insertRow(1);
	insertedRow.className = "urenRow";
	insertedRow.id = IDRow++;
	for(var i = 0; i<3; i++){
		var insertedCell = insertedRow.insertCell(i);
		insertedCell.id = IDCell++;
			if (i == 0) {
				dateID++;
				var temp1 = document.createElement("input");
				temp1.type = "date";
				temp1.id = "datum"+dateID; 
				
				insertedCell.appendChild(temp1);
			}
			if (i == 1) {
				selectID++;
				var temp1 = document.createElement("select");
				temp1.id = "select"+selectID;


				var temp2 = document.createElement("OPTION");
				temp2.innerHTML = "Gewerkte Uren"

				temp1.appendChild(temp2);
				insertedCell.appendChild(temp1);
			}
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


