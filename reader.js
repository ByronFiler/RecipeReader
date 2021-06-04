// Should really standardise the building of this with different classes and such to be built from

(function() {

    const domains = [
        new JoshuaWeissman(),
        new EthanChlebowski(),
        new AllRecipes(),
        new FoodWishes()
    ];

    for (let i = 0; i < document.scripts.length; i++) {

        domains.forEach(domain => {

            if (document.scripts.item(i).text.includes(domain.getDomain()) && document.scripts.item(i).text.startsWith("{")) {

                JSON.parse(document.scripts.item(i).text)
                    .description
                    .split("\n")
                    .forEach(line => {
                        if (line.includes(domain.getDomain())) {

                            console.log("Identified Domain: " + domain.getDomain());

                            let url = line.match(/\bhttps?:\/\/\S+/gi)[0];

                            // Certain URL references may contain a HTTP link while only allowing HTTPS, hence this must be corrected
                            if (!url.includes("https")) {
                                url = "https:" + url.split(":")[1]
                            }

                            fetch(url, {
                                // headers: {
                                //     "Access-Control-Allow-Origin": "*"
                                // }
                            }).then(
                                function (response) {
                                    if (response.status === 200) {

                                        let processedString = response.text().then(domain.parse);

                                        let description = document.getElementsByClassName("content style-scope ytd-video-secondary-info-renderer").item(0);

                                        processedString.then(blocks => {

                                            description.insertAdjacentHTML("afterbegin", "<br>");

                                            blocks.forEach(block =>
                                                description.insertAdjacentHTML("afterbegin", block.format() + "<br>")
                                            );

                                            // description.removeChild(description.childNodes[0]);


                                        });

                                    } else {
                                        console.error("request failed");
                                    }
                                }
                            );


                        }

                    });
            }
        });
    }

})();




