import Week from './components/Week';
import { AppBar, Button, FormControl, TextField, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles()(() =>
({
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
  addTaskForm: {
    width: '50%',
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'row',

  },
  addBtn: {
    position: 'absolute',
    right: '0px',
    height: '-webkit-fill-available',
    width: '100px',
    background: 'teal'
  },
  appTitle: {
    flexGrow: 1
  }

})
);

const mainTasksName = ['45 Minute Outdoor Workout', '45 Minute Indoor Workout', 'Drink 3 liters of water', 'Read 10 pages of a book', 'Follow a diet'];
const initialWeekData = mainTasksName.map((name, index) => ({ name, id: index + 1, days: [false, false, false, false, false, false, false], }))


const users = ['Salma', 'Ibraheem'];

const App = () => {
  const [user, setUser] = useState('salma');
  const [weeksData, setWeeksData] = useState([]);
  const [task, setTask] = useState('')
  const { classes } = useStyles();


  useEffect(() => {
    const dataLS = localStorage.getItem(user);
    if (dataLS) {
      setWeeksData(JSON.parse(dataLS));
    } else {
      setWeeksData(Array.from({ length: 11 }, () => initialWeekData))
    }
  }, [user]);

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
    localStorage.setItem(users[user], JSON.stringify(newData));
  };

  const handleAddTask = () => {
    if (!task.trim()) return;

    const newTask = {
      id: weeksData[0].length + 1,
      name: task,
      days: [false, false, false, false, false, false, false],
    };

    const newData = weeksData.map(week => [...week, newTask]);

    setWeeksData(newData);
    localStorage.setItem(users[user], JSON.stringify(newData));
    setTask('');
  };
  return (
    <div >
      <div >
        <AppBar position="static">
          <Toolbar className={classes.navbar}>
            <Typography variant="h6" className={classes.appTitle}>
              Habit Tracker
            </Typography>
            {users.map((user) => (
              <Button
                key={user}
                color="inherit"
                onClick={() => setUser(user)}
              >
                {user}
              </Button>
            ))}
          </Toolbar>
        </AppBar>
      </div>

      <header className={classes.appHeader}>
        <FormControl className={classes.addTaskForm}>
          <TextField
            fullWidth
            label="New Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddTask} className={classes.addBtn}>
            <AddIcon />
          </Button>
        </FormControl>
        {weeksData.map((data, index) => (
          <div key={index} className={classes.weekContainer}>
            <div className={classes.weekWrapper}>
              <Typography variant="h5" className={classes.weekTile}>
                Week {index + 1}
              </Typography>
            </div>
            <Week
              data={data}
              onCheckDay={(taskId, dayIndex) => handleCheckTask(index, taskId, dayIndex)}
            />
          </div>
        ))
        }
      </header >
    </div >
  );
}

export default App;
