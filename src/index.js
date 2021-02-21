import React from "react";
import ReactDOM from "react-dom";
import "./sass/main.scss";
import DatePicker from "./component/DatePicker";
import Header from "./component/Header";
import Footer from "./component/Footer";

const App = () => {
	
	const [isFocused, setFocused] = React.useState(false);

	return (
		<div className="App">
			<Header />
			<DatePicker 
				onFocusChange={({focused}) => setFocused(focused)} 
				focused={isFocused} 
			/>
			<Footer />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
