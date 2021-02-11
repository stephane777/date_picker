import React from "react";
import { v4 as uuidv4 } from "uuid";
import sprite from "../assets/img/sprite.svg";
import { utcTime_to_date, getParam } from "../utils";

const Grid = ({ time, setTime }) => {
	// time : 1613000844061

	// year,
	// month,
	// day,
	// firstDay,
	// timeFirstDay,
	// numberOfDayInMonth,
	// lastDay,
	// timeLastDay,
	// weekDayFirstOfMonth,
	// prevMonthDays,

	const [param, setParam] = React.useState("");

	React.useEffect(() => {
		setParam(getParam(time));
	}, [time]);

	const handleSelection = (time) => {
		setTime(time);
	};
	// function to render weekdays in the header
	const weekHeader = () => {
		const dayList = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
		return dayList.map((day, i) => (
			<div key={uuidv4()} className={`grid__day${i} grid__week`} key={uuidv4()}>
				{day}
			</div>
		));
	};
	// function to render all the day from 1 to 30/31
	const dayInMonth = (nbDays) => {
		const arrayLength = { length: nbDays };
		const monthArr = Array.from(arrayLength, (v, i) => i);
		const { timeFirstDay } = param;
		return monthArr.map((day, i) => {
			const time = timeFirstDay + 1000 * 60 * 60 * 24 * i;
			return (
				<div
					key={uuidv4()}
					className="grid__day-num"
					onClick={() => handleSelection(time)}
				>
					{day + 1}
				</div>
			);
		});
	};
	// get all the day from the previous Month
	const prevMonth = (currentWeekDay) => {
		const { prevMonthDays, timeFirstDay } = param;
		return prevMonthDays
			.map((day, i) => {
				const dayPrevMonth = timeFirstDay - 1000 * 60 * 60 * 24 * (i + 1);
				const weekdayPrevMonth = new Date(dayPrevMonth).getDate();
				return (
					<div key={uuidv4()} className="grid__day--prevMonth">
						{weekdayPrevMonth}
					</div>
				);
			})
			.reverse();
	};
	return (
		<div className="datePicker__grid">
			<div className="grid">
				<svg className="grid__prev-month">
					<use href={`${sprite}#icon-triangle-left`}></use>
				</svg>
				<svg className="grid__next-month">
					<use href={`${sprite}#icon-triangle-right`}></use>
				</svg>
				<div className="grid__month-yyyy">April 2021</div>
				{weekHeader()}
				<div className="grid__background"></div>
				{param &&
					param.weekDayFirstOfMonth > 0 &&
					prevMonth(param.weekDayFirstOfMonth)}
				{dayInMonth(param.numberOfDayInMonth)}
			</div>
		</div>
	);
};
export default Grid;
