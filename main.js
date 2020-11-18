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
  

   //fonction qui calcul la totalité des mangas
   loadJSON(function(somme){
       var mangaSomme = JSON.parse(somme).manga;       
       for(var j=0; j<mangaSomme.length; j++){
       total += mangaSomme[j].numberBook;
       }
       console.log(total);
    });


    

   function FindNext () {
    var str = document.getElementById ("findField").value;
    if (str == "") {
        alert ("Merci d'entrer le nom d'un Manga à rechercher!");
        return;
    }
    var supported = false;
    var found = false;    
    if (window.find) {        // Firefox, Google Chrome, Safari
        supported = true;
            // if some content is selected, the start position of the search 
            // will be the end position of the selection
        found = window.find (str);
    }
    else {
        if (document.selection && document.selection.createRange) { // Internet Explorer, Opera before version 10.5
            var textRange = document.selection.createRange ();
            if (textRange.findText) {   // Internet Explorer
                supported = true;
                    // if some content is selected, the start position of the search 
                    // will be the position after the start position of the selection
                if (textRange.text.length > 0) {
                    textRange.collapse (true);
                    textRange.move ("character", 1);
                }
                found = textRange.findText (str);
                if (found) {
                    textRange.select ();
                }
            }
        }
    }
    if (supported) {
        if (!found) {
            alert ("The following text was not found:\n" + str);
        }
    }
    else {
        alert ("Your browser does not support this example!");
    }
};

   