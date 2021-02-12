import React from "react";
import Grid from "./Grid";
import {
	utcTime_to_date,
	maxDayInMonth,
	isCurrentYearBisextile,
} from "../utils";

const Month = ({ focused, setFocused }) => {
	const [time, setTime] = React.useState("");

	const [error, setError] = React.useState("");
	const dateRef = React.createRef("");

	React.useEffect(() => {
		if (time) {
			const { year, month, day } = utcTime_to_date(new Date(time).getTime());

			dateRef.current.value = `${day}/${month}/${year}`;
		}
		if (!time) setTime(new Date().getTime());
	}, [time]);

	const handleKeyPress = (event) => {
		const {
			charCode,
			target: { value },
		} = event;
		if (charCode === 13) {
			const { valid, date } = isValidFormat(value);

			if (valid) {
				setTime(new Date(date).getTime());
			}
		}
	};

	const isValidFormat = (date) => {
		try {
			let dd, mm, yyyy;
			const regex1 = /\//g;
			const regex2 = /\-/g;
			const matchFormat1 = date.match(regex1)
				? date.match(regex1).length === 2
				: false;
			const matchFormat2 = date.match(regex2)
				? date.match(regex2).length === 2
				: false;
			const isValidFormatWithSeparator =
				/\d{2}(\/|-)\d{2}(\/|-)\d{4}/g.test(date) &&
				(matchFormat1 || matchFormat2);
			const isValidFormatNoSeparator = /\d{8}/.test(date);
			// console.log(`isValidFomatNoSeparator: ${isValidFormatNoSeparator}`);
			if (isValidFormatWithSeparator) {
				[dd, mm, yyyy] = date.split(/\/|\-/);
				checkDate(+dd, +mm, +yyyy);
			}
			if (isValidFormatNoSeparator) {
				dd = date.slice(0, 2);
				mm = date.slice(2, 4);
				yyyy = date.slice(4, 8);
				checkDate(+dd, +mm, +yyyy);
			}
			if (!isValidFormatNoSeparator && !isValidFormatWithSeparator) {
				throw "Format not valid expected 'DD/MM/YYYY' or 'DD-MM-YYYY' ";
			}
			setError("");
			return { valid: true, date: `${yyyy}/${mm}/${dd}` };
		} catch (e) {
			setError(e.toString());

			return { valid: false };
		}
	};
	const checkDate = (dd, mm, yyyy) => {
		if (mm === 0 || mm > 12) {
			throw `Format not valid ${dd}/${mm}/${yyyy} `;
		}
		const maxDay =
			maxDayInMonth(mm - 1) + (isCurrentYearBisextile(yyyy) ? 1 : 0);

		if (dd === 0 || dd > maxDay) {
			throw `Format not valid: ${dd}/${mm}/${yyyy}`;
		}
	};
	return (
		<div className="Month">
			<main className="main">
				<section className="datePicker_section">
					<div className="datePicker">
						<label htmlFor="date" className="datePicker__label">
							Date
						</label>
						{error && <span className="datePicker__error">{error}</span>}
						<input
							type="text"
							className="datePicker__input"
							placeholder="DD/MM/YYYY"
							id="date"
							ref={dateRef}
							onFocus={() => setFocused(true)}
							// onBlur={() => setFocused(false)}
							onKeyPress={handleKeyPress}
							onChange={() => setError("")}
						/>

						{!error && focused && <Grid setTime={setTime} time={time} />}
					</div>
				</section>
			</main>
		</div>
	);
};
export default Month;
