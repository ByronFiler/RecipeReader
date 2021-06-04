class Block {

    constructor() {
        if (new.target === Block) {
            throw new TypeError("Cannot construct block instance, class is abstract.")
        }
    }

    setTitle(title) {}
    add(element) {}
    format() {}

}