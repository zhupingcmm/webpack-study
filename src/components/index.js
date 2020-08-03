import React from "react";
import ReactDOM from "react-dom"
import "./index.scss";
import Demo from "./demo.js"

function App (){
    return (
        <div className="search-box">
            <span> hello </span>
            <Demo/>
        </div>
    )
};

ReactDOM.render(
    <App/>,
    document.getElementById("root")
)

