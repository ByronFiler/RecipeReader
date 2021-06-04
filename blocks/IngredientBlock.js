class IngredientBlock extends Block {

    #title = undefined;
    #ingredients = [];

    constructor() {
        super();
    }

    setTitle(title) {
        this.#title = title;
    }

    add(element) {
        this.#ingredients.push(element);
    }

    format() {

        let processed = [];

        if (this.#title !== undefined) {
            processed.push("<strong>" + this.#title + "</strong>");
        }

        processed.push("<ul>");
        this.#ingredients.forEach(ingredient => processed.push("<li>" +  ingredient + "</li>"));
        processed.push("</ul>");

        return processed.join("");

    }

}