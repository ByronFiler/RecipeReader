class Site {

    constructor() {
        if (new.target === Site) {
            throw new TypeError("Cannot construct site instance, class is abstract.")
        }
    }

    parse(HTML) {}

    getDomain() {}

}