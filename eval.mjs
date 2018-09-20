class Input {
    constructor(str) {
        this._iter = str[Symbol.iterator]();
        this._lookahead = this._iter.next();
    }
    eat() {
        this._lookahead = this._iter.next();
    }
    peek() {
        if (this._lookahead.done) return null;
        return this._lookahead.value;
    }
    get() {
        let rv = this.peek();
        this.eat();
        return rv;
    }
}

export function evaluate(expr) {
    return evalAddSub(new Input(expr));
}

function evalAddSub(inp) {
    let rv = evalMulDiv(inp);
    while (inp.peek() !== null && inp.peek() !== ')') {
        let c = inp.peek();
        inp.eat();
        switch (c) {
        case '+':
            rv += evalMulDiv(inp);
            break;
        case '-':
            rv -= evalMulDiv(inp);
            break;
        default:
            throw "expected '+', '-', or ')', got '" + c + "'";
        }
    }
    return rv;
}

function evalMulDiv(inp) {
    let rv = evalPrim(inp);
    while (inp.peek() !== null && inp.peek() !== ')'
           && inp.peek() !== '+' && inp.peek() !== '-') {
        let c = inp.peek();
        inp.eat();
        switch (c) {
        case '×':
            rv *= evalPrim(inp);
            break;
        case '/':
            rv /= evalPrim(inp);
            break;
        default:
            throw "expected '+', '-', '*', '/', or ')', got '" + c + "'";
        }
    }
    return rv;
}

function evalPrim(inp) {
    let c = inp.peek();
    let rv;
    switch (c) {
    case '(':
        inp.eat();
        rv = evalAddSub(inp);
        if (inp.peek() != ')') throw "expected ')', got '" + inp.peek() + "'";
        inp.eat();
        return rv;
    default:
        rv = "";
        while (inp.peek() !== null) {
            if (isNaN(parseInt(inp.peek(), 10))) break;
            rv += inp.get();
        }
        if (rv === "") throw "expected '(' or a number";
        return parseInt(rv, 10);
    }
}
