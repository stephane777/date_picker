import React from "react";
import ReactDOM from "react-dom";
import "./sass/main.scss";
import Month from "./component/Month";
import Header from "./component/Header";

const App = () => {
	return (
		<div>
			<Header />
			<Month />
		</div>
	);
};
ReactDOM.render(<App />, document.getElementById("root"));
