import { Divider, Paper, Typography } from '@material-ui/core';
import React from 'react';
import WeatherIcon from '@material-ui/icons/AcUnit';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import FlareIcon from '@material-ui/icons/Flare';
import SpeedIcon from '@material-ui/icons/Speed';

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

export default function CurrentWeather({ weatherData }){
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
      weekDay = "Friday";
      break;
    case 6:
      weekDay = "Saturday";
      break;
    case 0:
      weekDay = "Sunday";
      break;
    default:
      weekDay="";
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
          <div style={{display:"flex", alignItems: "center",justifyContent: "center"}}>
            <WbIncandescentIcon style={{fontSize: "32"}} />
            <div>
              <Typography style={{marginLeft: "12px"}}>Humidity</Typography>
              <Typography style={{marginLeft: "12px"}}>{weatherData && weatherData.main.humidity}%</Typography>
            </div>
          </div>
        </div>
        <div style={{width: "50%"}}>
          <div style={{display:"flex", alignItems: "center",justifyContent: "center"}}>
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
          <div style={{display:"flex", alignItems: "center",justifyContent: "center"}}>
            <FlareIcon style={{fontSize: "32"}} />
            <div>
              <Typography style={{marginLeft: "12px"}}>Pressure</Typography>
              <Typography style={{marginLeft: "12px"}}>{weatherData && weatherData.main.pressure}</Typography>
            </div>
          </div>
        </div>
        <div style={{width: "50%"}}>
          <div style={{display:"flex", alignItems: "center",justifyContent: "center"}}>
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
