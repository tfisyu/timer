import React, { useState, useEffect } from 'react';

const Sprint = () => {
	const [inputTime, setInputTime] = useState('');
	const [count, setCount] = useState(0);
	const [countdownStarted, setCountdownStarted] = useState(false);
	const [timeRemaining, setTimeRemaining] = useState(0);

	useEffect(() => {
		if (countdownStarted && inputTime) {
			const countdownInterval = setInterval(() => {
				let now = new Date();
				let [hours, minutes] = inputTime.split(':').map(Number);
				let eventTime = new Date(
					now.getFullYear(),
					now.getMonth(),
					now.getDate(),
					hours,
					minutes,
					0,
					0
				);

				if (eventTime.getTime() < now.getTime()) {
					eventTime.setDate(eventTime.getDate() + 1);
				}

				let remainingTime = eventTime.getTime() - now.getTime();

				/* 				if (remainingTime <= 0) {
					remainingTime = 0;
					clearInterval(countdownInterval);
					alert('aaaaaaaeeeeeeeeeee');
				} */
				setTimeRemaining(remainingTime);
			}, 1000);

			return () => clearInterval(countdownInterval);
		}
	}, [countdownStarted, inputTime, timeRemaining]);

	const handleSetCountdown = () => {
		setCountdownStarted(true);
	};

	const handleStopCountdown = () => {
		setCountdownStarted(false);
		setTimeRemaining(0);
	};

	const handleResetCountdown = () => {
		setCountdownStarted(false);
		setInputTime('');
		setTimeRemaining(0);
	};

	const formatTime = (time) => {
		const seconds = Math.floor((time / 1000) % 60);
		const minutes = Math.floor((time / (1000 * 60)) % 60);
		const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

		return (
			<div className='countdown-display'>
				<div className='countdown-value'>
					{hours.toString().padStart(2, '0')} <span>horas</span>
				</div>
				<div className='countdown-value'>
					{minutes.toString().padStart(2, '0')} <span>minutos</span>
				</div>
				<div className='countdown-value'>
					{seconds.toString().padStart(2, '0')} <span>segundos</span>
				</div>
				<div>
					<h2>vagas que faltam: {count}</h2>
					<button onClick={(e) => setCount((e) => e - 1)}>-</button>
				</div>
			</div>
		);
	};

	return (
		<div className='countdown-timer-container'>
			{!countdownStarted ? (
				<form className='countdown-form'>
					<input
						name='time-picker'
						type='time'
						value={inputTime}
						onChange={(e) => setInputTime(e.target.value)}
						onClick={(e) => (e.target.type = 'time')}
					/>
					<input
						type='text'
						name='vagas-picker'
						onChange={(e) => setCount(e.target.value)}
					/>
					<button onClick={handleSetCountdown}>começar</button>
				</form>
			) : (
				<>
					{formatTime(timeRemaining)}
					<div className='control-buttons'>
						<button onClick={handleStopCountdown}>parar</button>
						<button onClick={handleResetCountdown}>reset</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Sprint;
