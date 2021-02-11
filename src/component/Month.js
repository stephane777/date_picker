import React from "react";
import Grid from "./Grid";
import { utcTime_to_date } from "../utils";

const Month = () => {
	const [time, setTime] = React.useState("");
	const [focused, setFocused] = React.useState(false);
	const dateRef = React.createRef("");

	React.useEffect(() => {
		const { year, month, day } = utcTime_to_date(new Date(time).getTime());
		dateRef.current.value = `${day}/${month}/${year}`;
		if (!time) setTime(new Date().getTime());
	}, [time]);

	// utcTime = 1613001947814 => return 2021/02/10

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
						{/* {focused && <Grid time={time} />} */}
						<Grid setTime={setTime} time={time} />
					</div>
				</section>
			</main>
		</div>
	);
};
export default Month;
