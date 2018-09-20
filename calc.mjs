
import {evaluate} from "./eval.mjs";

function eval_clicked(ev) {
    let disp = document.getElementById("display");
    disp.textContent = evaluate(disp.textContent);
}

function key_clicked(ev) {
    let disp = document.getElementById("display");
    let tgt = ev.target;
    disp.textContent += tgt.textContent;
}

function bs_clicked(ev) {
    let disp = document.getElementById("display");
    disp.textContent = disp.textContent.slice(0, -1);
}

function clear_clicked(ev) {
    let disp = document.getElementById("display");
    disp.textContent = "";
}

document.addEventListener("DOMContentLoaded", (ev) => {
    let calc_ul = document.getElementById("calc");
    for (let child of calc_ul.getElementsByClassName("key")) {
        child.addEventListener("click", key_clicked);
    }
    document.getElementById("bs").addEventListener("click", bs_clicked);
    document.getElementById("clear").addEventListener("click", clear_clicked);
    document.getElementById("eval").addEventListener("click", eval_clicked);
});
