const tables = {
    "AND": [[1, 1]],
    "OR": [[1, 0], [0, 1], [1, 1]],
};

export let switches = [];
export let gates = [];

export class Switch {
    constructor(id) {
        this.out = 0;
        this.id = id;
        switches.push(this);
    }

    swap() {
        this.out = +!this.out;
    }
}

export class Gate {
    constructor(type, id, inputs) {
        this.in1 = inputs[0];
        this.in2 = inputs[1];
        this.type = type;
        this.table = tables[type];
        this.id = id;
        gates.push(this);
    }


    get out() {
        let ins = [this.in1.out, this.in2.out];
        for (let i of this.table) {
            if (JSON.stringify(ins) == JSON.stringify(i)) {
                return 1;
            }
        }
        return 0;
    }

}