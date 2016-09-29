# History deleter modiified

## What it does
2016/sep/30
I added a onHistoryUpdated listener in the background js and a injectHTML js(meant to add a download video button on the youtube video playing web page) 
but now onHistoryUpdated listener just print to console once it detects the history list is updated
and the injectHTML.js will print to console if the matched youtube URL is detected
this is created from my mac, Programs/firefox/addon/webExt/history-deleter

This extension includes a page action with a popup specified as "history.html". The page action will not appear on about:... pages.

The popup shows a list of 5 history entries for the current domain. It provides a clear button to delete all entries for that domain.

## What it shows

How to use the history API.
