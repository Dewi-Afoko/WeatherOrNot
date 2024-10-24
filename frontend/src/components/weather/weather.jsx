import './weather.css';
import { Oval } from 'react-loader-spinner';
import  { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { WeatherIdeas } from './weatherIdeas';
import { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';



function GfGWeatherApp() {
	const [input, setInput] = useState('');
	const [weather, setWeather] = useState({
		loading: false,
		data: {},
		error: false,
	});

	const toDateFunction = () => {
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		const WeekDays = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];
		const currentDate = new Date();
		const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]
			}`;
		return date;
	};

	const search = async (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			setInput('');
			setWeather({ ...weather, loading: true });
			const url = 'https://api.openweathermap.org/data/2.5/weather';
			const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
			await axios
				.get(url, {
					params: {
						q: input,
						units: 'metric',
						appid: api_key,
					},
				})
				.then((res) => {
					console.log('res', res);
					setWeather({ data: res.data, loading: false, error: false });
				})
				.catch((error) => {
					setWeather({ ...weather, data: {}, error: true });
					setInput('');
					console.log('error', error);
				});
		}
	};
    if (weather.data) {
        // Using optional chaining to safely access the weather description
        const weatherDescription = weather.data.weather?.[0]?.description?.toUpperCase();
        if (weatherDescription) {
            console.log(weatherDescription);
        } else {
            console.log("Weather description is not available.");
        }
    }
	return (
		<>
		<Card className="p-4 shadow custom-card bg-light">
            <Card.Body>
                <Card.Title className="display-6">Want to workout outside?</Card.Title>
                <Card.Subtitle className="pb-2">
                    Check the weather where you live
                </Card.Subtitle>
				<Form.Group className="pt-2">
            <Form.Control
                type="text"
                placeholder="Enter City Name..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyPress={search}
				className=""
            />
        </Form.Group>
                {weather.loading && (
                    <>
                        <br />
                        <Oval type="Oval" color="black" height={100} width={100} />
                    </>
                )}
                {weather.error && (
                    <>
                        <br />
                        <span>
                            <FontAwesomeIcon icon={faFrown} />
                            <span style={{ fontSize: '20px' }}> City not found</span>
                        </span>
                    </>
                )}
                {weather && weather.data && weather.data.main && (
                    <div>
                        <Card.Title className="text-center pt-4 display-6">
                            {weather.data.name}, <span>{weather.data.sys.country}</span>
                        </Card.Title>
                        <Card.Text className="text-center">
                            <span>{toDateFunction()}</span>
                        </Card.Text>
                        <div className="text-center"> 
                            <img
                                src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                                alt={weather.data.weather[0].description}
                            />
                            {Math.round(weather.data.main.temp)}
                            <sup>°C</sup>
                        </div>
                        <Card.Text className="text-center">
                            Wind Speed: {weather.data.wind.speed}m/s
                        </Card.Text>
                        <Card.Text className="text-center text-bold">
                            <WeatherIdeas description={weather.data.weather[0].description.toUpperCase()} temp={Math.round(weather.data.main.temp)} />
                        </Card.Text>
                    </div>
                )}
            </Card.Body>
        </Card>
		</>
	);
}

export default GfGWeatherApp;
