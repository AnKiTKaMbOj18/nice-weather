import React, {useState,useEffect} from 'react';
import CurrentWeather from './CurrentWeather';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useCurrentPosition } from './useCurrentPosition';
import ApiService from '../../utils/service';
import NextDaysWeatherModal from './NextDaysWeatherModal';
import RestDayWeather from './RestDayWeather';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
    margin: theme.spacing(2),
  }
}));

export default function WeatherHome(){
  const [weatherData, setData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [position,error] = useCurrentPosition();

  useEffect(()=>{
    async function fetchMyAPI() {
      const appendUrl = `lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.REACT_APP_API_KEY}`
      let response = await ApiService({apiUrl: 'currentWeather', appendUrl});
      setData(response.response.data);
      const hourlyResponse = await ApiService({apiUrl: 'hourlyForecast', appendUrl});
      setHourlyForecast(hourlyResponse.response.data);
    }
    if(!error&& position&&position.coords) {
      fetchMyAPI();
    }
  },[error,position])

  const {container} = useStyles();

  let todayForecast;
  let isToday;
  if(hourlyForecast) {
    todayForecast = hourlyForecast.list.slice(0,8);
    const date = new Date(todayForecast[0].dt_txt);
    const currentDate = new Date().getDate();
    const itemDate = date.getDate();
    isToday = currentDate === itemDate;
  }

  return(
    <>
      <div className={container}>
        <CurrentWeather
          weatherData={weatherData}
          hourlyForecast={hourlyForecast}
          position={position}
          error={error}
        />
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <Typography color="textPrimary">{isToday ? "Today": "Tommorow"}</Typography>
        <NextDaysWeatherModal />
      </div>
      <RestDayWeather todayForecast={todayForecast} />
      </div>
    </>
  )
}
