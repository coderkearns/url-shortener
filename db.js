// An extremely fast, memory efficient, synchronous, persistent key-value store for node.js
const fs = require('fs');

class DB {
    constructor(file = "./db.json") {
        this.file = file;
        this.create();
    }

    create() {
        // Create the file if it doesn't exist
        if (!fs.existsSync(this.file)) {
            fs.writeFileSync(this.file, "{}");
        }
    }

    read() {
        return this.parse(fs.readFileSync(this.file));
    }

    write(data) {
        fs.writeFileSync(this.file, this.stringify(data));
    }

    stringify(data) {
        // Stringifies data with absolutely no whitespace
        return JSON.stringify(data).replaceAll(" ", "").replaceAll("\t", "")
    }

    parse(data) {
        return JSON.parse(data);
    }

    get(key) {
        return this.read()[key];
    }

    set(key, value) {
        const data = this.read();
        data[key] = value;
        this.write(data);
    }

    delete(key) {
        const data = this.read();
        delete data[key];
        this.write(data);
    }

    clear() {
        this.write({});
    }

    keys() {
        return Object.keys(this.read());
    }

    values() {
        return Object.values(this.read());
    }

    entries() {
        return Object.entries(this.read());
    }

    object() {
        return this.read();
    }
}

module.exports = DB;