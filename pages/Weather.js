import React, { useState } from "react";
import styles from "../styles/Home.module.css";

const Weather = () => {
	const [zip, setZip] = useState("");
	const [weather, setWeather] = useState({});
	const [location, setLocation] = useState({});

	async function requestWeather() {
		const URL = `http://api.weatherapi.com/v1/current.json?key=82f71c94d9b74040997182230212805&q=${zip}&aqi=yes`;
		const res = await fetch(URL);
		const json = await res.json();
		setWeather(json.current);
		setLocation(json.location);
		console.log(json);
	}

	const handleOnSubmit = (e) => {
		requestWeather();
		e.preventDefault();
	};

	return (
		<div className={styles.main}>
			<h1>Find the temperature in any zipcode:</h1>
			<form onSubmit={handleOnSubmit}>
				<input
					onChange={(e) => setZip(e.target.value)}
					type="text"
					placeholder="Enter your zip code"
				/>
				<input type="submit" value="submit" />
				{console.log(weather.temp_f)}
				{weather.temp_f === undefined ? null : (
					<p>
						It is {weather.temp_f}°F in {location.name} right now!
					</p>
				)}
			</form>
		</div>
	);
};

export default Weather;
