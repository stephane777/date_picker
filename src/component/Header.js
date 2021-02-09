import React from "react";
import sprite from "../assets/img/sprite.svg";

const Header = () => {
	return (
		<header className="header">
			<svg className="header__icon">
				<use href={`${sprite}#icon-calendar`}></use>
			</svg>
			<h1>Date Picker</h1>
		</header>
	);
};

export default Header;
