const classScripts = [
    'blocks/Block.js',
    'blocks/IngredientBlock.js',
    'blocks/MethodBlock.js',

    'sites/Site.js',
    'sites/JoshuaWeissman.js',
    'sites/EthanChlebowski.js',
    'sites/AllRecipes.js',
    'sites/FoodWishes.js'
];

chrome.browserAction.onClicked.addListener(function (tab) {

    if (tab.url.startsWith("https://www.youtube.com/watch?v=")) {

        classScripts.forEach(script => {
            console.log("executing: " + script);
            chrome.tabs.executeScript(tab.id, {
                file: script
            });
        })

        chrome.tabs.executeScript(tab.id, {
            file: 'reader.js'
        });
    }
});


