import { Divider, Paper, Typography } from '@material-ui/core';
import React, {useEffect,useState} from 'react';
import WeatherIcon from '@material-ui/icons/AcUnit';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import FlareIcon from '@material-ui/icons/Flare';
import SpeedIcon from '@material-ui/icons/Speed';
import ApiService from '../../utils/service'

// const data = {
//   "coord": {
//   "lon": 4.8897,
//   "lat": 52.374
//   },
//   "weather": [
//   {
//   "id": 803,
//   "main": "Clouds",
//   "description": "broken clouds",
//   "icon": "04n"
//   }
//   ],
//   "base": "stations",
//   "main": {
//   "temp": 276,
//   "feels_like": 270.11,
//   "temp_min": 275.37,
//   "temp_max": 276.48,
//   "pressure": 1012,
//   "humidity": 81
//   },
//   "visibility": 7000,
//   "wind": {
//   "speed": 9.26,
//   "deg": 290
//   },
//   "clouds": {
//   "all": 75
//   },
//   "dt": 1617649949,
//   "sys": {
//   "type": 1,
//   "id": 1524,
//   "country": "NL",
//   "sunrise": 1617599115,
//   "sunset": 1617646834
//   },
//   "timezone": 7200,
//   "id": 2759794,
//   "name": "Amsterdam",
//   "cod": 200
//   }

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paperClass: {
    minHeight: "300px",
    marginTop: "12px",
    marginBottom: "12px",
    background: "#3f51b5",
    borderRadius: "60px",
    padding: "0px 8px 0px 8px"
  },
  iconWeather: {
    display: "block",
    margin: "auto"
  },
  text: {
    color: theme.palette.text.primary
  }
}));

export default function CurrentWeather(){
  const [weatherData, setData] = useState(null)

  useEffect(()=>{
    async function fetchMyAPI() {
      let response = await ApiService({apiUrl: 'currentWeather', appendUrl: process.env.REACT_APP_API_KEY})
      // response = await response.json()
      setData(response.response.data);
    }
    fetchMyAPI();
  },[])
  console.log(weatherData);

  const { paperClass, iconWeather, text } = useStyles();
  const mainTemp = weatherData ? parseInt(weatherData.main.temp - 273.15):null;
  const feelsLike = weatherData ? parseInt(weatherData.main.feels_like - 273.15): null;
  // const date = weatherData ? new Date(weatherData.dt * 1000): null;
  const date = weatherData ? new Date(): null;
  let hours,minutes,seconds, weekDay;
if(date){  // Hours part from the timestamp
   hours = date.getHours();
// Minutes part from the timestamp
   minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
   seconds = "0" + date.getSeconds();
   const day = date.getDay();
  switch(day) {
    case 1:
     weekDay = "Monday";
     break;
    case 2:
      weekDay = "Tuesday";
      break;
    case 3:
      weekDay = "Wednesday";
      break;
    case 4:
      weekDay = "Thursday";
      break;
    case 5:
      weekDay = "Thursday";
      break;
     default:
      weekDay="..."
  }}

  return(
    <>
    <Typography variant="h6" color="textPrimary" align="center">
      {
      weatherData ?
        <>
          <span style={{fontWeight: '600'}}>{weatherData.name},</span>
          <span>{" "+weatherData.sys.country}</span>
        </>
        :
        null
      }
    </Typography>
    <Paper className={paperClass} >
      <IconButton className={iconWeather}>
       <WeatherIcon style={{fontSize: "50px"}} />
       {/* <img src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weatherIcon" /> */}
      </IconButton>
      <Typography className={text} variant="h6" style={{textAlign: "center"}}>{`${weekDay}, ${hours}:${minutes&&minutes.substr(-2)}:${seconds&&seconds.substr(-2)}`}</Typography>
      <Typography
        className={text}
        variant="h6"
        style={{
          textAlign: "center",
          fontWeight: '600',
          fontSize: '36px'
        }}
      >
        {mainTemp}&deg;
      </Typography>
      <Divider />
      <div style={{display: "flex", alignItems: "center", margin: "16px"}}>
        <div style={{width: "50%"}}>
          <div style={{display:"flex", alignItems: "center"}}>
            <WbIncandescentIcon style={{fontSize: "32"}} />
            <div>
              <Typography style={{marginLeft: "12px"}}>Humidity</Typography>
              <Typography style={{marginLeft: "12px"}}>{weatherData && weatherData.main.humidity}%</Typography>
            </div>
          </div>
        </div>
        <div style={{width: "50%"}}>
          <div style={{display:"flex", alignItems: "center"}}>
            <EmojiNatureIcon style={{fontSize: "32"}} />
            <div>
              <Typography style={{marginLeft: "12px"}}>Feels Like</Typography>
              <Typography style={{marginLeft: "12px"}}>{feelsLike}&deg;</Typography>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div style={{display: "flex", alignItems: "center", margin: "16px", paddingBottom: "24px"}}>
        <div style={{width: "50%"}}>
          <div style={{display:"flex", alignItems: "center"}}>
            <FlareIcon style={{fontSize: "32"}} />
            <div>
              <Typography style={{marginLeft: "12px"}}>Pressure</Typography>
              <Typography style={{marginLeft: "12px"}}>{weatherData && weatherData.main.pressure}</Typography>
            </div>
          </div>
        </div>
        <div style={{width: "50%"}}>
          <div style={{display:"flex", alignItems: "center"}}>
            <SpeedIcon style={{fontSize: "32"}} />
            <div>
              <Typography style={{marginLeft: "12px"}}>Wind Speed</Typography>
              <Typography style={{marginLeft: "12px"}}>{weatherData && weatherData.wind.speed}</Typography>
            </div>
          </div>
        </div>
      </div>
    </Paper>
    </>
  )
}
