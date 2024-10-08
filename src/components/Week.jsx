import { Checkbox, Typography } from '@mui/material';
import {
  teal,
  cyan,
  lightBlue,
  indigo,
  pink,
  lime,
} from '@mui/material/colors';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => {
  return {
    listContainer: {
      padding: 0,
    },
    taskRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    taskDayCheckbox: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
  };
});
const Week = ({ data, onCheckDay }) => {
  const colors = [teal, cyan, lightBlue, indigo, pink, lime];
  const { classes } = useStyles();

  return (
    <div>
      <ul className={classes.listContainer}>
        {data.map((task, taskIndex) => (
          <li key={task.id} className={classes.taskRow}>
            <Typography
              sx={{
                color: colors[taskIndex % colors.length][500],
              }}
            >
              {task.name}
            </Typography>
            <ul className={classes.taskDayCheckbox}>
              {task.days.map((day, index) => (
                <li key={index}>
                  <Checkbox
                    type="checkbox"
                    checked={day}
                    onChange={() => onCheckDay(task.id, index)}
                    sx={{
                      color: colors[taskIndex % colors.length][400],
                      '&.Mui-checked': {
                        color: colors[taskIndex % colors.length][400],
                      },
                    }}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Week;
