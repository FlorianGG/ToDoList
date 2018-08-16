import React from 'react';
import { Badge, List, ListItem } from 'react-native-elements';

import { TASK } from '../../model/model';
import { APP_COLORS } from '../../styles/color';
import { style } from './style';

const TaskList = ({ taskList, onPressCallback }) => (
  <List>
    {taskList.map(task => (
      <ListItem
        key={task.id}
        title={task.content}
        onPress={() => onPressCallback(task.content)}
        badge={{
          element: (
            <Badge
              value={task.status}
              containerStyle={
                task.status == TASK.toDoStatus
                  ? { backgroundColor: APP_COLORS.accent }
                  : { backgroundColor: APP_COLORS.lightPrimaryColor }
              }
            />
          ),
        }}
      />
    ))}
  </List>
)

export default TaskList
