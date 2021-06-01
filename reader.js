const domains = [
    JoshuaWeissman, EthanChlebowski
];

(function() {

    for (let i = 0; i < document.scripts.length; i++) {
        if (document.scripts.item(i).text.includes("joshuaweissman.com") && document.scripts.item(i).text.startsWith("{")) {
            JSON.parse(document.scripts.item(i).text)
                .description
                .split("\n")
                .forEach(line => {
                    domains.forEach(domain => {
                        if (line.includes(domain[0].getDomain())) {
                            let url = line.match(/\bhttps?:\/\/\S+/gi)[0];

                            fetch(url, {
                                headers: {
                                    "Access-Control-Allow-Origin": "*"
                                }
                            }).then(
                                function(response) {
                                    if (response.status === 200) {

                                        let processedString = response.text().then(str => domains[1].parse(str));

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
                    })
            });
        }
    }

})();

class site {

    constructor() {
        if (new.target === site) {
            throw new TypeError("Cannot construct site instance, class is abstract.")
        }
    }

    parse(HTML) {}

    getDomain() {}

}

class JoshuaWeissman extends site {

    domain = "joshuaweissman.com"

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

class EthanChlebowski extends site {

    domain = "ethanchlebowski.com";

    getDomain() {
        return this.domain;
    }

    parse(HTML) {
        let processedString = [];

        HTML.split("<label>").forEach(label => {
            console.log(label.split("<span>")[0].split("</span>"));
        })

        return processedString.reverse();
    }

}




