// A useful way to extract the domain from a url.
function get_hostname(url) {
  var a = document.createElement('a');
  a.href = url;
  return a.hostname;
}

function no_history(hostname) {
  document.getElementById('history').innerHTML = `No history for ${hostname}.`;
}

// When the page is loaded find the current tab and then use that to query
// the history.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var url_current_tab = tabs[0].url;
    var title_current_tab = "\""+tabs[0].title+"\"";
    console.log("in history.js#tabs.query,the url:" + url_current_tab + "\nThe title: "+ title_current_tab);
    //inject tab title to the popup of pageAction
    title_text_node = document.createTextNode(title_current_tab);
    /*
    把影片名稱放到按鈕之外 document.getElementById("text_video_title").appendChild(title_text_node);
    */

    /*
    把影片名稱放到按鈕裡
    */
    document.getElementById("button_download_video_h2_text").appendChild(title_text_node);
    //end of inject tab title to the popup of pageAction

    var list = document.getElementById('history');
    var hostname = get_hostname(tabs[0].url);
    //browse.history.search(
    chrome.history.search(
    // Search for all history entries for the current windows domain.
    // Because this could be a lot of entries, lets limit it to 5.
    {text: hostname, maxResults: 5},
    function(results) {
        console.log("inside call back")
      // What to show if there are no results.
      if (results.length < 1) {
        no_history(hostname);
      } else {
        for (var k in results) {
          var history = results[k];
          var li = document.createElement('p');
          var url = document.createTextNode(history.url);
          li.appendChild(url);
          list.appendChild(li);
        }
      }
    }
  );
});

    

function clearAll(e) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log("clear All url:" + tabs[0].url);
    var hostname = get_hostname(tabs[0].url);
    if (!hostname) {
      // Don't try and delete history when there's no hostname.
      return;
    }

    chrome.history.search(
      {text: hostname},
      // Search will return us a list of histories for this domain.
      // Loop through them and delete them one by one.
      function(results) {
        for (k = 0; k < results.length; k++) {
          chrome.history.deleteUrl({url: results[k].url});
        }
        // Clear out the UI.
        no_history(hostname);
      }
    );
  });
  e.preventDefault();
}

    function videoResolutionDropDownListChanged(select){
        //get the select value: the resolution from the select
        console.log("drop down list changed");
        console.log("select target is:" + select.target);
        var myselect = document.getElementById("selectName3");
        console.log(myselect.options[myselect.selectedIndex].getAttribute("res"));
        /*
        var resolution=select.options[select.selectedIndex].getAttribute("res");
        //append the resolution text to the button text
        resolution_text_node = document.createTextNode(resolution);
        document.getElementById("button_download_video_h2_text").appendChild(title_text_node);
        */
        //var type=select.options[select.selectedIndex].getAttribute("type");
    }

//this function handle buttow clicked event of button_download_video
function handle_button_download_video(e){
  console.log(e.target.id + " is clicked");
    
}

//add onchange listener to drop down list selectName3
document.getElementById("selectName3").addEventListener("change",videoResolutionDropDownListChanged);

/*
function handle_button_show_other_video_sizes(){
  console.log("show more download options of the video button clicked");
  documnet.getElementById("")
}

//set listener to the show more download options of the video button
document.getElementById("button_show_other_video_sizes").addEventListener('click',handle_button_show_other_video_sizes);
*/
//remember to remove this listener if we remove its source element
//set listener to the download video button
document.getElementById("button_download_video").addEventListener('click',handle_button_download_video);

//set listener to the clear all history link
document.getElementById('clear').addEventListener('click', clearAll);
