import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
    fontSize: "24px"
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export default function SingleLineGridList({todayForecast}) {
  const classes = useStyles();
  return (
    <div className={classes.root} style={{marginTop: "16px"}}>
      <GridList className={classes.gridList} cols={2.5}>
        {todayForecast&&todayForecast.map((data,i) => {
          let tempFeel = parseInt(data.main.feels_like -273.15);
          let tempDate= new Date(data.dt_txt);
          const hours = tempDate.getHours()+":00";
          tempDate= hours < 10 ? 0+""+hours : hours;
          return (
          <GridListTile key={i}>
            <img src={process.env.PUBLIC_URL+"weather1.png"} alt={"weatherImage"} />
            <GridListTileBar
              title={`${tempFeel}°`}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${data.title}`}>
                  {/* <StarBorderIcon className={classes.title} /> */}
                {tempDate}
                </IconButton>
              }
            />
          </GridListTile>
        )})}
      </GridList>
    </div>
  );
}
