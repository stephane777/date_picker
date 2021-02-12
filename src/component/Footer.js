import React from "react";
import sprite from "../assets/img/sprite.svg";

const Footer = () => {
	return (
		<footer className="footer">
			<a href="https://github.com/stephane777" className="footer__link">
				<svg className="footer__icon-github">
					<use href={`${sprite}#icon-github`} className="grid__icon-use"></use>
				</svg>
			</a>
			<p className="footer__paragraph">Created by Stephane Candelas.</p>
		</footer>
	);
};
export default Footer;
