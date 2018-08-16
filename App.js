import React from 'react'
import { View, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import Header from './components/header/header'
import TaskList from './components/task-list/task-list'
import ButtonAddTask from './components/button-add-task/button-add-task'

const taskList = [
  {
    id: 0,
    content: 'Aller voir Sébastien',
    status: 'En cours',
  },
  {
    id: 1,
    content: 'Se brosser les dents',
    status: 'En cours',
  },
  {
    id: 2,
    content: 'Faire du ménage',
    status: 'Terminé',
  },
]

export default class App extends React.Component {
  state = {
    taskList: taskList,
  }

  //arrow function used for bind this
  onPressButton = () => {
    this.setState({ myText: 'salut' })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header content="Ma todo" />
        <ScrollView>
          <TaskList taskList={this.state.taskList} />
        </ScrollView>
        <ButtonAddTask />
      </View>
    )
  }
}
