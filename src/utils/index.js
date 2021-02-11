// 1 min = 1000ms * 60 = 60,000
// 1h    = 60,000 * 60 = 3,600,000
// 1d    = 3,600,000 * 24 = 86,400,000
// 1y	 = 86,400,000 + ( 3,600,000 if bisextile)

// take a numeric time from 1970 and return an object with year, month and day as key value-pair
export const utcTime_to_date = (utcTime) => {
	const time = new Date(utcTime);
	const day = make2Digit(time.getUTCDate());
	const month = make2Digit(time.getMonth() + 1); // getFullYear is 0 based.
	const year = make2Digit(time.getFullYear());
	return {
		year,
		month,
		day,
	};
};

// convert day from one digit to a 2 char string
const make2Digit = (num) => {
	return num.toString().length === 1 ? "0".concat(num) : num;
};

const make1Digit = (num) => {
	return num[0] === "0" ? +num[1] : +num;
};

const maxDayInMonth = (month) => {
	return month <= 11
		? [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
		: null;
};

const isCurrentYearBisextile = (year) => {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const getParam = (time) => {
	const { year, month, day } = utcTime_to_date(time);

	// test is current year is bisextile and current month is February then return 1 day else 0;
	const handleBisextile =
		isCurrentYearBisextile(year) && month === "02" ? 1 : 0;
	const firstDay = `${year}/${month}/01`;
	const timeFirstDay = new Date(firstDay).getTime();
	const numberOfDayInMonth = maxDayInMonth(make1Digit(month) - 1);
	const lastDay = `${year}/${month}/${
		maxDayInMonth(make1Digit(month) - 1) + handleBisextile
	}`;
	const timeLastDay = new Date(lastDay).getTime();

	// weekDayFirstOfMonth is needed to place the 1 day of the month at the right place
	const weekDayFirstOfMonth = new Date(`${year}/${month}/01`).getUTCDay();

	// an array with as much element we have from Monday till weekDayFirstOfMonth
	// this array is needed to loop through it and get all the previous day from the 1st of month till fist Monday last month.
	const prevMonthDays = Array.from(
		{ length: weekDayFirstOfMonth - 1 },
		(v, i) => i
	);
	return {
		year,
		month,
		day,
		firstDay,
		timeFirstDay,
		numberOfDayInMonth,
		lastDay,
		timeLastDay,
		weekDayFirstOfMonth,
		prevMonthDays,
	};
};
