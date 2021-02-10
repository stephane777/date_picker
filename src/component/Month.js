import React from "react";
import Grid from "./Grid";

const Month = () => {
	const [date, setDate] = React.useState({
		day: "",
		month: "",
		year: "",
	});
	const [time, setTime] = React.useState(0);
	const [focused, setFocused] = React.useState(false);
	const dateRef = React.createRef("");

	React.useEffect(() => {
		const currentTime = new Date(Date.now());
		const currentDay = make2Digit(currentTime.getUTCDate());
		const currentMonth = make2Digit(currentTime.getMonth() + 1); // getFullYear is 0 based.
		const currentYear = make2Digit(currentTime.getFullYear());

		// dateRef.current.value = `${currentDay}/${currentMonth}/${currentYear}`;
		dateRef.current.value = "2021/04/05";
		// setDate({ day: currentDay, month: currentMonth, year: currentYear });
		setDate({ day: "05", month: "04", year: "2021" });
		// setTime(currentTime.getTime());
		setTime(new Date("2021/04/05").getTime());
	}, []);
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
	const make1Digit = (num) => {
		return num[0] === "0" ? num[1] : num;
	};

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
						{focused && <Grid time={time} date={date} />}
						{/* <Grid /> */}
					</div>
				</section>
			</main>
		</div>
	);
};
export default Month;
