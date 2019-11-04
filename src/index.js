import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import {connect, Provider} from "react-redux";
import store from "./store";
import Form from "./components/Form";

window.store = store;

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <h1>Hello, create a customer</h1>
                <Form/>
            </div>
        </Provider>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
