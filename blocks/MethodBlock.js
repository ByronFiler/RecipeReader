class MethodBlock extends Block {

    #title;
    #ingredients = [];

    constructor() {
        super();
    }

    setTitle(title) {
        this.#title = title;
    }

    add(element) {
        this.#ingredients.push(element)
    }

    format() {
        let processed = [];

        processed.push("<strong>" + this.#title + "</strong>");
        processed.push("<ol>");
        this.#ingredients.forEach(ingredient => processed.push("<li><i>" +  ingredient + "</i></li>"));
        processed.push("</ol>");

        return processed.join("");
    }


}