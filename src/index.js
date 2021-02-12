import React from "react";
import ReactDOM from "react-dom";
import "./sass/main.scss";
import Month from "./component/Month";
import Header from "./component/Header";
import Footer from "./component/Footer";

const App = () => {
	const [focused, setFocused] = React.useState(false);

	const handleFocusOut = (e) => {
		e.preventDefault();
		e.stopPropagation();

		const className = e.target.classList[0];

		if (
			className &&
			className.slice(0, 4) !== "grid" &&
			className.slice(0, 10) !== "datePicker"
		) {
			setFocused(false);
		}
	};
	return (
		<div onClick={handleFocusOut} className="App">
			<Header />
			<Month focused={focused} setFocused={setFocused} />
			<Footer />
		</div>
	);
};
ReactDOM.render(<App />, document.getElementById("root"));
