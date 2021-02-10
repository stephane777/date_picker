import React from "react";
import { v4 as uuidv4 } from "uuid";
import sprite from "../assets/img/sprite.svg";

const Grid = ({ time, date }) => {
	React.useEffect(() => {
		console.log(`time: ${time}`);
		console.log(`Obj.keys: ${Object.keys(date)}`);
		console.log(`Obj.values: ${Object.values(date)}`);
		console.log(`weekday: ${new Date().getDay()}`);
	}, []);
	const week = () => {
		const dayList = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
		return dayList.map((day, i) => (
			<div key={uuidv4()} className={`grid__day${i} grid__week`} key={uuidv4()}>
				{day}
			</div>
		));
	};
	const month = (nbDays) => {
		const arrayLength = { length: nbDays };
		const monthArr = Array.from(arrayLength, (v, i) => i);
		return monthArr.map((day) => {
			return (
				<div key={uuidv4()} className="grid__day-num">
					{day + 1}
				</div>
			);
		});
	};
	// get all the day from the previous Month
	const prevMonth = (currentWeekDay) => {
		const firstDay = `${date.year}/${date.month}/01`;
		const timeFirstDay = new Date(firstDay).getTime();
		const prevMonthDays = Array.from(
			{ length: currentWeekDay - 1 },
			(v, i) => i
		);
		return prevMonthDays
			.map((day, i) => {
				const dayPrevMonth = timeFirstDay - 1000 * 60 * 60 * 24 * (i + 1);
				const weekdayPrevMonth = new Date(dayPrevMonth).getDate();
				return <div className="grid__day--prevMonth">{weekdayPrevMonth}</div>;
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
				{week()}
				<div className="grid__background"></div>
				{prevMonth(new Date(`${date.year}/${date.month}/01`).getDay())}
				{month(31)}
			</div>
		</div>
	);
};
export default Grid;
