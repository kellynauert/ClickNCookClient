import React, { useState, useEffect, useRef } from 'react';
import {
	Grid,
	CardContent,
	Button,
	Typography,
	CardActions,
} from '@material-ui/core';
import { TimerRounded, TimerOffRounded } from '@material-ui/icons/';

const StopWatchApp = (props) => {
	const startTimeRef = useRef(59);
	const [isRunning, setIsRunning] = useState(false);
	const [startTime, setStartTime] = useState();
	const [time, setTime] = useState(startTime);
	const zeroPad = (num, places) => String(num).padStart(places, '0');

	useEffect(() => {
		setStartTime(props.cookTime * 1000 * 60);
		if (!time || time < 0) {
			setTime(props.cookTime * 1000 * 60);
		}
	}, [props.cookTime]);

	useEffect(() => {
		if (isRunning) {
			const interval = setInterval(update, 1000);
			return () => {
				clearInterval(interval);
			};
		}
	});

	const update = () => {
		const delta = Date.now() - startTimeRef.current;
		setTime(time - delta);
		startTimeRef.current = Date.now();
	};

	const start = () => {
		setIsRunning(true);
		startTimeRef.current = Date.now();
	};

	const stop = () => {
		setIsRunning(false);
	};

	const reset = () => {
		setTime(props.cookTime * 1000 * 60);
		setIsRunning(false);
	};

	return (
		<CardContent>
			<Grid container alignItems='center' direction='column'>
				{' '}
				<Typography variant='h6' color='textSecondary'>
					Time Remaining
				</Typography>
				<CardActions>
					<Typography variant='h2' color='textPrimary'>
						{zeroPad(Math.floor(time / 1000 / 60 / 60), 2).toString()}:
						{zeroPad(Math.floor(time / 1000 / 60, 2) % 60, 2).toString()}:
						{zeroPad(Math.floor((time / 1000) % 60), 2).toString()}
					</Typography>
				</CardActions>
				<CardActions>
					{isRunning ? (
						<Button
							startIcon={<TimerOffRounded />}
							variant='contained'
							onClick={stop}
						>
							Pause
						</Button>
					) : (
						<Button
							startIcon={<TimerRounded />}
							color='secondary'
							variant='contained'
							onClick={start}
						>
							Start
						</Button>
					)}
					<Button onClick={reset}>Reset</Button>
				</CardActions>
			</Grid>
		</CardContent>
	);
};

export default StopWatchApp;
