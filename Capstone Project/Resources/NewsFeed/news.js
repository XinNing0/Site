var timerId;
var counter = 0;
var links = [];
var titles = [];
var descriptions = [];
var on = true;
$(document).ready(function() {
   readJSON();

   // show the first set of links
   refreshIFrame();

   // set a timer to refresh the links every three seconds
   startRefresh();

 });

function readJSON(){
   $.ajax({
      type: "GET",
      url: "Resources/NewsFeed/results.json",
      dataType: "json",
      async: false,
      success: function(responseData, status){
      var count = 0;
      $.each(responseData.channel.item, function(i, item) {
         links[count] = item.link[0];
         titles[count] = item.title;
         descriptions[count] = item.description;
      
         count++;
      }
      );
    }, error: function(msg) {
            // there was a problem
      alert("There was a problem: " + msg.status + " " + msg.statusText);
    }
    });

}

function refreshIFrame(){

   // build the html for the next 5 articles
   var output = "";
   for (let i = 0; i < 5; i++) {
      output += "<article id= art" + counter + "><h3><a href=" + links[counter] + ">" + titles[counter];
      output += "</a></h3><p>" + descriptions[counter] +"</p></article>";
      counter++;

      if (counter >= links.length) {
         counter = 0;
      }
   }

   $("#Frame2").html(output); 

}

function stopRefresh() {
   window.clearInterval(timerId);
}

function startRefresh(){
   timerId = window.setInterval('refreshIFrame()', 3000); 	
}

function refresh(){
   if(on == true){
      stopRefresh();
      $(".btn").html("start ticker");
      on = false;
   }else{
      refreshIFrame();
      startRefresh();
      $(".btn").html("stop ticker");
      on = true;
   }
}