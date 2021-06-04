class FoodWishes extends Site {

    #domain = "foodwishes.blogspot.com";

    constructor() {
        super();
    }

    getDomain() {
        return this.#domain;
    }

    // Food Wishes has no method blocks purely ingredients
    // Exclusively contained with in one block
    parse(HTML) {
        HTML = HTML
            .split("<span style=\"font-size: small;\">")
            .map(element => element.split("</span>")[0]);

        HTML = HTML.splice(
            HTML.indexOf(HTML.find(element => element.startsWith("Ingredients"))) +1
        );

        HTML = HTML.splice(
            0,
            HTML.indexOf(HTML.find(element => element.startsWith("<br")))
        );

        let recipe = new IngredientBlock();

        HTML.forEach(item => recipe.add(item));

        return [recipe];
    }

}