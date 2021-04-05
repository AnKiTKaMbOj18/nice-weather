import React from 'react';
import CurrentWeather from './CurrentWeather';
import { makeStyles, withTheme } from '@material-ui/core/styles';

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
  const {container} = useStyles();
  return(
    <>
      <div className={container}>
        <CurrentWeather />
      </div>
    </>
  )
}
