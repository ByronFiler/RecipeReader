/**
 * Ethan Chlebowski
 * Relatively simple and consistent website
 * >=1 Method Blocks
 * >=1 Instruction Blocks
 *
 * Links
 * Channel: https://www.youtube.com/channel/UCDq5v10l4wkV5-ZBIJJFbzQ
 * Site:    https://www.ethanchlebowski.com/
 *
 * Example
 * Video:   https://www.youtube.com/watch?v=KdbWEjWnXPA
 * Recipe:  https://www.ethanchlebowski.com/cooking-techniques-recipes/green-chile-chicken-enchiladas
 */
class EthanChlebowski extends Site {

    #domain = "ethanchlebowski.com";

    constructor() {
        super();
    }

    getDomain() {
        return this.#domain;
    }

    parse(HTML) {
        let blocks = [];

        HTML
            .split("<div class=\"ccm-section\">")
            .slice(1)
            .forEach(section => {

                let block = section.split("<ul").length > section.split("<ol").length ?
                    new IngredientBlock() : new MethodBlock();

                block.setTitle(section.split("<class=\"ccm-section-title\">")[0].split("</div>")[0].split(">")[1]);

                section
                    .split("<li>")
                    .splice(1)
                    .map(ingredient => ingredient.split("</li>")[0])
                    .forEach(ingredient => {
                        block.add(
                            ingredient.includes("<span>") ?
                                ingredient.split("<span>")[1].split("</span>")[0]
                                : ingredient
                        )
                    });

                blocks.push(block);

            });

        return blocks.reverse();
    }

}