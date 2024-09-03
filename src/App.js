import Week from './components/Week';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';


const useStyles = makeStyles()(() => {
  return {

    appHeader: {
      minHight: '100vh',
      display: 'flex',
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'center',
    },
    navbar: {
      backgroundColor: 'teal',
    },
    weekContainer: {
      position: 'relative',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '1rem'

    },
    weekWrapper: {
      borderLeft: '4px solid black',
      margin: "1rem ",
      transform: 'scale(-1)',
      alignSelf: 'stretch',
      position: 'relative'

    },
    weekTile: {
      writingMode: 'vertical-lr'
    },

  }
});

const initialWeekData = [
  {
    id: 1,
    name: '45 Minute Outdoor Workout',
    days: [false, false, false, false, false, false, false],
  },
  {
    id: 2,
    name: '45 Minute Indoor Workout',
    days: [false, false, false, false, false, false, false],
  },
  {
    id: 3,
    name: 'Drink 3 liters of water',
    days: [false, false, false, false, false, false, false],
  },
  {
    id: 4,
    name: 'Read 10 pages of a book',
    days: [false, false, false, false, false, false, false],
  },
  {
    id: 5,
    name: 'Take a progress picture',
    days: [false, false, false, false, false, false, false],
  },
  {
    id: 6,
    name: 'Follow a diet',
    days: [false, false, false, false, false, false, false],
  },
];

const users = ['Salma', 'Ibraheem'];

function App() {
  const [value, setValue] = useState(0);
  const [weeksData, setWeeksData] = useState(Array.from({ length: 11 }, () => initialWeekData));
  const { classes } = useStyles();


  useEffect(() => {
    const dataLS = localStorage.getItem(users[value]);
    if (dataLS) {
      setWeeksData(JSON.parse(dataLS));
    } else {
      setWeeksData(Array.from({ length: 11 }, () => initialWeekData))
    }
  }, [value]);

  const handleCheckTask = (weekIndex, taskId, dayIndex) => {
    const newData = weeksData.map((week, index) => {
      if (index === weekIndex) {
        return week.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              days: task.days.map((day, i) => (i === dayIndex ? !day : day)),
            };
          }
          return task;
        });
      }
      return week;
    });

    setWeeksData(newData);
    localStorage.setItem(users[value], JSON.stringify(newData));
  };
  return (
    <div >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className={classes.navbar}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              75 Hard Challenge
            </Typography>
            {users.map((user, index) => (
              <Button
                key={user}
                color="inherit"
                onClick={() => setValue(index)}
              >
                {user}
              </Button>
            ))}
          </Toolbar>
        </AppBar>
      </Box>

      <header className={classes.aapHeader}>
        {weeksData.map((data, index) => (
          <div key={index} className={classes.weekContainer}>
            <div className={classes.weekWrapper}>
              <Typography variant="h5" component="h4" className={classes.weekTile}>
                Week {index + 1}
              </Typography>
            </div>
            <Week
              weekIndex={index}
              data={data}
              onCheckDay={handleCheckTask}
            />
          </div>
        ))
        }
      </header >
    </div >
  );
}

export default App;
