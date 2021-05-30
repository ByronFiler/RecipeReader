(function() {

    console.log("here");

    for (let i = 0; i < document.scripts.length; i++) {
        if (document.scripts.item(i).text.includes("joshuaweissman.com") && document.scripts.item(i).text.startsWith("{")) {
            JSON.parse(document.scripts.item(i).text)
                .description
                .split("\n")
                .forEach(line => {
                    if (line.includes("joshuaweissman.com")) {
                        let url = line.match(/\bhttps?:\/\/\S+/gi)[0];

                        fetch(url, {
                            headers: {
                                "Access-Control-Allow-Origin": "*"
                            }
                        }).then(
                                function(response) {
                                    if (response.status === 200) {


                                        let processedString = response.text().then(joshuaweissmanParser);
                                        let description = document.getElementsByClassName("content style-scope ytd-video-secondary-info-renderer").item(0);

                                        processedString.then(strings => {
                                            description.insertAdjacentHTML("afterbegin", "<br>");
                                            strings.forEach(line => {
                                                let insertion = document.createElement("p");
                                                insertion.innerHTML = line;
                                                description.insertAdjacentHTML("afterbegin", line);
                                            });
                                            description.removeChild(description.childNodes[0]);
                                        });

                                    } else {
                                        console.log("request failed");
                                    }
                                }
                            );
                    }
            });
        }
    }

})();

function joshuaweissmanParser(HTML) {

    let processedString = [];

    HTML.split("<strong>")
        .forEach(section => {

            if (section.split("</strong>")[0].endsWith(":")) {
                processedString.push( "<br><strong>" + section.split("</strong>")[0] + "</strong><br>")

                section.split("<p class=").forEach(line => {
                    if (!line.split("</p>")[0].split(">")[1].includes("<")) {
                        processedString.push(line.split("</p>")[0].split(">")[1] + "<br>");
                    }
                })

            }

        });

    return processedString.reverse();




}


