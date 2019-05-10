function loadDoc(name) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    pageLoader(this.responseXML,name);
    }
  };
  xhttp.open("GET", "data.xml", true);
  xhttp.send();
}

var data;

function pageLoader(xml,name) {
	data = '<div class="layout-50 page-' + $((xml.getElementsByTagName(name)[0]).getElementsByTagName("id")[0]).text() + '">';
	
	nodeRunning($(xml.getElementsByTagName(name)[0]));

	data = data + '</div></div>';
	
	$(".cascade-page").append(
		data
	);
}

function nodeRunning(xml) {
	console.log(xml.childNodes);
	xml.find("node").each(function() {
		var nodeType = $(this).find("Type").text();
		
		if ($(this).find("Data").text() != "") {
			console.log(nodeType  + ", " + $(this).find("Data").text());
			data = data + '<' + nodeType + '>' + $(this).find("Data").text() + '</' + nodeType + '>';
		} else if($(this).find("subnode").childNodes > 0) {
			data = data + '<' + nodeType + '>';
			nodeRunning($(this));
			data = data + '</' + nodeType + '>'
		} else {
			data = data + '<' + nodeType + '/ >';
		}
	});
}