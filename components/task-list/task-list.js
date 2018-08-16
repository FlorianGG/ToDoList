import React from 'react'
import { List, ListItem, Badge } from 'react-native-elements'
import { TASK } from '../../model/model'
import { APP_COLORS } from '../../styles/color'
import { style } from './style'

const TaskList = ({ taskList }) => (
  <List>
    {taskList.map(task => (
      <ListItem
        key={task.id}
        title={task.content}
      />
    ))}
  </List>
)

export default TaskList
