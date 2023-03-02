class Pet {
    constructor(list = []) {
        this.list = list;
    }

    get mascotas() {
        return this.count_same_name_pets();
    }


    count_same_name_pets() {

        var counts = {}
        for (var i = 0; i < this.list.length; i++) {
            if (counts[this.list[i][1]]) {
                counts[this.list[i][1]] += 1
            } else {
                counts[this.list[i][1]] = 1
            }
        }
        return counts;
    }
}