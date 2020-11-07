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
                $('#reading').append('<ul><img src="./cover/'+manga.cover+'"> '+manga.title+' : '+manga.numberBook+'</ul>')
                break;
            case 'ended':
                $('#ended').append('<ul><img src="./cover/'+manga.cover+'">'+manga.title+' : '+manga.numberBook+ '</ul>')
                break;
            case 'no-buy':
                $('#no-buy').append('<ul><img src="./cover/'+manga.cover+'"> '+manga.title+' : '+manga.numberBook+'</ul>')
                break;
            default:
                break;
          }
      }
   });


  



   