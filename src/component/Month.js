import React from "react";
import Grid from "./Grid";

const Month = () => {
	const [date, setDate] = React.useState({
		day: "",
		month: "",
		year: "",
	});
	const [focused, setFocused] = React.useState(false);
	const dateRef = React.createRef("");

	// 1 min = 1000ms * 60 = 60,000
	// 1h    = 60,000 * 60 = 3,600,000
	// 1d    = 3,600,000 * 24 = 86,400,000
	// 1y	 = 86,400,000 + ( 3,600,000 if bisextile)

	const maxDayInMonth = (month) => {
		return month <= 11
			? [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31](month)
			: "null";
	};

	const itCurrentYearBisextile = () => {
		return (
			(currentYear % 4 === 0 && currentYear % 100 !== 0) ||
			currentYear % 400 === 0
		);
	};
	const make2Digit = (num) => {
		return num.toString().length === 1 ? "0".concat(num) : num;
	};
	React.useEffect(() => {
		const currentDate = new Date(Date.now());
		const currentDay = make2Digit(currentDate.getUTCDate());
		const currentMonth = make2Digit(currentDate.getMonth() + 1); // getFullYear is 0 based.
		const currentYear = make2Digit(currentDate.getFullYear());

		dateRef.current.value = `${currentDay}/${currentMonth}/${currentYear}`;
		setDate({ day: currentDay, month: currentMonth, year: currentYear });
	}, []);

	return (
		<div className="Month">
			<main className="main">
				<section className="datePicker_section">
					<div className="datePicker">
						<label htmlFor="date" className="datePicker__label">
							date
						</label>

						<input
							type="text"
							className="datePicker__input"
							id="date"
							ref={dateRef}
							onFocus={() => setFocused(true)}
							onBlur={() => setFocused(false)}
						/>
						{focused && <Grid />}
					</div>
				</section>
			</main>
		</div>
	);
};
export default Month;
