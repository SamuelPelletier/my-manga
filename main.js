function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'manga.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 loadJSON(function(response) {
    // Parse JSON string into object
      var mangaJson = JSON.parse(response).manga;
      for(var i=0; i<mangaJson.length; i++){
          var manga = mangaJson[i];
          switch (manga.status) {
            case 'reading':
                $('#reading').append('<li><img src="./cover/'+manga.cover+'"> '+manga.title+' : '+manga.numberBook+'</li>')
                break;
            case 'ended':
                $('#ended').append('<li>'+manga.title+' : '+manga.numberBook+'<img src="./cover/'+manga.cover+'"> </li>')
                break;
            case 'no-buy':
                $('#no-buy').append('<li><img src="./cover/'+manga.cover+'"> '+manga.title+' : '+manga.numberBook+'</li>')
                break;
            default:
                break;
          }
      }
   });

   
   $(function(liste){
    var sheetUrl = JSON.parse(liste).mangaJson;


    $.getJSON(sheetUrl, function(data){
      var entry = data.feed.entry;
      var pseudo = 'darthcrow';
      var tableau = "<table>";
      var row = "";

      for (var i = 1; i < entry.length; i += 1){

        var title = entry[i]['title']['$t'];
        var ships = entry[i]['gsx$'+pseudo]['$t'];
        if(ships != "")
          {
          row += "<tr style='border: 1px solid black;'>";
          console.log(ships);
          title = "<td style='border: 1px solid black;'>" + title + "</td>";
          ships = "<td style='border: 1px solid black;'>" + ships + "</td>";
          row += title + ships +"</tr>";
          }
      };
        tableau += row + "</tableau>";
        document.write(tableau);
    });
  });



   