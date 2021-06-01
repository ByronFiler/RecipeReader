(function() {
    class Site {

        constructor() {
            if (new.target === Site) {
                throw new TypeError("Cannot construct site instance, class is abstract.")
            }
        }

        parse(HTML) {}

        getDomain() {}

    }

    class JoshuaWeissman extends Site{

        domain = "joshuaweissman.com"

        constructor() {
            super();
        }

        getDomain() {
            return this.domain;
        }

        parse(HTML) {
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

    }

    class EthanChlebowski extends Site {

        domain = "ethanchlebowski.com";

        constructor() {
            super();
        }

        getDomain() {
            return this.domain;
        }

        parse(HTML) {
            let processedString = [];

            HTML
                .split("<div class=\"ccm-section\">")
                .slice(1)
                .forEach(section => {


                    processedString.push("<br><strong>" + (section.split("<class=\"ccm-section-title\">")[0].split("</div>")[0].split(">")[1]) + "</strong><br>")

                    // console.log("section title: " + section.split("<class=\"ccm-section-title\">")[0].split("</div>")[0].split(">")[1])

                    section.split("<li>").splice(1).forEach(ingredient => {

                        ingredient = ingredient.split("</li>")[0];

                        if (ingredient.includes("<span>")) {
                            processedString.push(ingredient.split("<span>")[1].split("</span>")[0] + "<br>")
                            // console.log("ingredient: " + ingredient.split("<span>")[1].split("</span>")[0]);
                        } else {
                            processedString.push("<i>" + ingredient + "</i><br>")
                            // console.log("instructor: " + ingredient);
                        }
                    });

            });

            console.log(processedString);

            return processedString.reverse();
        }

    }

    const domains = [
        new JoshuaWeissman(), new EthanChlebowski()
    ];

    console.log("")

    for (let i = 0; i < document.scripts.length; i++) {

        domains.forEach(domain => {
            if (document.scripts.item(i).text.includes(domain.getDomain()) && document.scripts.item(i).text.startsWith("{")) {
                JSON.parse(document.scripts.item(i).text)
                    .description
                    .split("\n")
                    .forEach(line => {
                        if (line.includes(domain.getDomain())) {
                            let url = line.match(/\bhttps?:\/\/\S+/gi)[0];

                            fetch(url, {
                                // headers: {
                                //     "Access-Control-Allow-Origin": "*"
                                // }
                            }).then(
                                function (response) {
                                    if (response.status === 200) {

                                        let processedString = response.text().then(domain.parse);

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
        });
    }

})();




