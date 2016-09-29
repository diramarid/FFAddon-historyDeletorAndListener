console.log("beginning of injectHTML.js");

targetTagLength = document.getElementById("watch-header").innerHTML;
console.log("length:" + targetTagLength);

//need to setup a listener to wait for background.js to notify us 
//the URL has changed, so we can start the injection
//do we have to reply back?

console.log("end of injectHTML.js");