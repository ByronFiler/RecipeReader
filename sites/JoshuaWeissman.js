/**
 * Joshua Weissman
 * Relatively simple and consistent website
 * >=1 Method Blocks
 * >=1 Instruction Blocks
 *
 * Links
 * Channel: https://www.youtube.com/channel/UChBEbMKI1eCcejTtmI32UEw
 * Site:    https://www.joshuaweissman.com/
 *
 * Example
 * Video:   https://www.youtube.com/watch?v=4FUf2qcIpIU
 * Recipe:  https://www.joshuaweissman.com/post/kfc-hot-chicken-tenders-but-better
 */
class JoshuaWeissman extends Site{

    #domain = "joshuaweissman.com"

    constructor() {
        super();
    }

    getDomain() {
        return this.#domain;
    }

    parse(HTML) {

        // Instruction and Method Data Blocks
        let blocks = [];

        HTML.split("<strong>")
            .forEach(section => {

                if (section.split("</strong>")[0].endsWith(":")) {
                    // Determines if its using a bullet point list or numbered, bullet point is ingredients, numerical list is steps
                    let data = section.split("<ul").length > section.split("<ol").length ?
                        new IngredientBlock() : new MethodBlock();

                    data.setTitle(section.split("</strong>")[0]);
                    section.split("<p class=").forEach(line => {
                        if (!line.split("</p>")[0].split(">")[1].includes("<"))
                            data.add(line.split("</p>")[0].split(">")[1]);
                    });
                    blocks.push(data);
                }

            });

        return blocks.reverse();
    }

}