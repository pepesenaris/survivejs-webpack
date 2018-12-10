import component from "./component";
import 'purecss';
import './main.css';
import "react";
import "react-dom";


document.body.appendChild(component("div", {text: "Another text"}));

document.body.appendChild(component("input", { className: "golden"}));

document.body.appendChild(component("p", { className: "violet", text: "Some content here"}));

document.body.appendChild(component("button", { className: "pure-button", text: "Styles from external lib"}));

