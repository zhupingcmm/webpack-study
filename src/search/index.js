import React from "react";
import ReactDOM from "react-dom";
import Details from "./details";
import {Provider} from "react-redux";
import { store } from "./redux-study";


function App(props){

    console.log("store::",store.getState())
    return(
        <Provider store={store}>
            <Details/>
        </Provider>
    )
}


ReactDOM.render(
    <App/>,
    document.getElementById("search")
)

