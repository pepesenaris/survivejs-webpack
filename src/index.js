import component from "./component";
import './main.css';
import 'purecss';

document.body.appendChild(component("div", {text: "Another text"}));

document.body.appendChild(component("input", { className: "golden"}));

document.body.appendChild(component("p", { className: "violet", text: "Some content here"}));

document.body.appendChild(component("button", { className: "pure-button", text: "Styles from external lib"}));

