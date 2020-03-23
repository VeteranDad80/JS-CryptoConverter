//JS CryptoConverter
//main.js

import { blockString, stretch_text, clear_text } from "/utilities.js";
import { encryptCaesar } from "/caesar.js";
import { alphaNumeric } from "/alphaNumeric.js";
import { atbash } from "/atbash.js";

//Initializing DOM variables
export const text_input = document.getElementById("text_input");
export const result_div = document.getElementById("text_result");
const block_option = document.getElementById("block_option");
const caps_option = document.getElementById("caps_option");
export const cipher_value = document.getElementById("cipher_selector");
export const shift_selector = document.getElementById("shift_selector");
export const keyword_selector = document.getElementById("keyword_selector");

//Event Listeners
text_input.addEventListener("input", () => { result_div.innerText = encryptMessage() });
block_option.addEventListener("click", () => { result_div.innerText = encryptMessage(), stretch_text() });
caps_option.addEventListener("click", () => { result_div.innerText = encryptMessage() });
document.getElementById("clear_button").addEventListener("click", () => { clear_text() });
cipher_value.addEventListener("change", () => { result_div.innerText = encryptMessage() });
keyword_selector.addEventListener("change", () => { result_div.innerText = encryptMessage() })

function encryptMessage() {
    var string = text_input.value;

    shift_selector.classList.add("unselectable");
    result_div.style = "word-spacing: normal";
    block_option.checked ? string = blockString(string) : string;
    caps_option.checked ? string = string.toUpperCase() : string;
    
    switch (cipher_value.value) {
        case "alphaNumeric":
            string = alphaNumeric(string);
            result_div.style = "word-spacing: 5px";
            break;
        case "atbash":
            string = atbash(string);
            break;
        case "caesar":
            string = encryptCaesar(string);
            //shift_selector.style = "display: normal";
            shift_selector.classList.remove("unselectable");
            break;
        case "morse_code":
            result_div.innerText = "This is not a current option.";
            break;
        case "reverse":
            string = string.split("").reverse().join("");
            break;
        case "rot13":
            string = encryptCaesar(string, 13);
            break;

        default:
            string = string;
            break;
    }
    return string;
}
