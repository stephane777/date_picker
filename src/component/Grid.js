import React from "react";
import { v4 as uuidv4 } from "uuid";
import sprite from "../assets/img/sprite.svg";
import { getTimeFromDate, getParam } from "../utils";

const Grid = ({ time, setTime }) => {
	// time : 1613000844061

	// PARAM properties :
	// year,
	// 	month,
	// 	day,
	// 	fullMonth: getMonth(month - 1),
	//  numberOfDayInMonth,
	// 	firstDay,
	// 	timeFirstDay,
	// 	weekDayFirstOfMonth,
	// 	prevMonthDays,
	//  lastDay,
	// 	timeLastDay,
	// 	weekDayLastOfMonth,
	// 	nextMonthDays,

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
		const { timeFirstDay, day: selectedDay } = param;

		return monthArr.map((day, i) => {
			const time = timeFirstDay + 1000 * 60 * 60 * 24 * i;

			return (
				<div
					key={uuidv4()}
					className={`grid__day-num ${
						selectedDay === day + 1 ? "grid__day-num--active" : ""
					}`}
					onClick={() => handleSelection(time)}
				>
					{day + 1}
				</div>
			);
		});
	};
	// get all the day from the previous Month
	const prevMonth = () => {
		const { prevMonthDays, timeFirstDay } = param;
		return prevMonthDays
			.map((day, i) => {
				const timeDayPrevMonth = timeFirstDay - 1000 * 60 * 60 * 24 * (i + 1);
				const weekdayPrevMonth = new Date(timeDayPrevMonth).getDate();
				return (
					<div
						key={uuidv4()}
						className="grid__day--prevMonth"
						onClick={() => handleSelection(timeDayPrevMonth)}
					>
						{weekdayPrevMonth}
					</div>
				);
			})
			.reverse();
	};
	const nextMonth = () => {
		const { nextMonthDays, timeLastDay } = param;
		if (!nextMonthDays) return;
		return nextMonthDays.map((day, i) => {
			const timeDayNextMonth = timeLastDay + 1000 * 60 * 60 * 24 * (i + 1);
			return (
				<div
					key={uuidv4()}
					className="grid__day--nextMonth"
					onClick={() => handleSelection(timeDayNextMonth)}
				>
					{i + 1}
				</div>
			);
		});
	};
	const handleGoToPreviousMonth = () => {
		const { month, year } = param;

		// if month = 01 or 12 year will be incremented or decremented
		const previousMonth = month === 1 ? 12 : month - 1;
		const previousYear = month === 1 ? year - 1 : year;
		const time = getTimeFromDate("01", previousMonth, previousYear);
		setTime(time);
	};
	const handleGoToNextMonth = () => {
		const { month, year } = param;

		// if month = 01 or 12 year will be incremented or decremented
		const nextMonth = month === 12 ? 1 : month + 1;
		const nextYear = month === 12 ? year + 1 : year;
		const time = getTimeFromDate("01", nextMonth, nextYear);
		setTime(time);
	};
	return (
		<div className="datePicker__grid">
			<div className="datePicker__arrow"></div>
			<div className="grid">
				<svg className="grid__icon-prevMonth" onClick={handleGoToPreviousMonth}>
					<use
						href={`${sprite}#icon-triangle-left`}
						className="grid__icon-use"
					></use>
				</svg>
				<svg className="grid__icon-nextMonth" onClick={handleGoToNextMonth}>
					<use
						href={`${sprite}#icon-triangle-right`}
						className="grid__icon-use"
					>
						{" "}
					</use>
				</svg>
				<div className="grid__month-yyyy">{`${param.fullMonth} ${param.year}`}</div>
				{weekHeader()}
				<div className="grid__background"></div>
				{param && param.weekDayFirstOfMonth >= 0 && prevMonth()}
				{dayInMonth(param.numberOfDayInMonth)}
				{nextMonth()}
			</div>
		</div>
	);
};
export default Grid;
