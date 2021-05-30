chrome.browserAction.onClicked.addListener(function (tab) {

    console.log(tab.url.startsWith("https://www.youtube.com/watch?v="));

    if (tab.url.startsWith("https://www.youtube.com/watch?v=")) {
        chrome.tabs.executeScript(tab.id, {
            file: 'reader.js'
        });
    }
});

