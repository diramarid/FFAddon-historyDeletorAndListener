console.log("the beginning of background.js");

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (!tab.url.match(/^about:/)) {
    chrome.pageAction.show(tab.id);
  }
});

//beginning of test history change listener
/*
var filter = {
  url:
  [
    {hostContains: "youtube"}
  ]
}
*/
 function sendMessageToTab(tabs) {
     if (tabs.length > 0) {
         chrome.tabs.sendMessage(
             tabs[0].id,
             {greeting: "hi from background script"},
                 handleResponse
         );
     }
 }
function logOnHistoryStateUpdated(details) {
  console.log("onHistoryStateUpdated: " + details.url);
  console.log("Transition type: " + details.transitionType);
  console.log("Transition qualifiers: " + details.transitionQualifiers);
    /*background.js cannot access webpage content
    console.log("target element length: " + document.getElementById("watch-header").length);
    */
    //call injectHTML.js to work
    sendMessagegeToTab(tabs);  
}

//chrome.webNavigation.onHistoryStateUpdated.addListener(logOnHistoryStateUpdated, filter);
chrome.webNavigation.onHistoryStateUpdated.addListener(logOnHistoryStateUpdated);

//end of test history change listener

console.log("the end of background.js");