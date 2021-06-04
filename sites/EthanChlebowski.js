class EthanChlebowski extends Site {

    #domain = "ethanchlebowski.com";

    constructor() {
        super();
    }

    getDomain() {
        return this.#domain;
    }

    parse(HTML) {
        let processedString = [];

        HTML
            .split("<div class=\"ccm-section\">")
            .slice(1)
            .forEach(section => {
                processedString.push("<br><strong>" + (section.split("<class=\"ccm-section-title\">")[0].split("</div>")[0].split(">")[1]) + "</strong><br>")

                section
                    .split("<li>")
                    .splice(1)
                    .map(ingredient => ingredient.split("</li>")[0])
                    .forEach(ingredient => {
                        processedString.push(ingredient.includes("<span>") ?
                            ingredient.split("<span>")[1].split("</span>")[0] + "<br>"
                            : "<i>" + ingredient + "</i><br>");
                    });

            });
        
        return processedString.reverse();
    }

}