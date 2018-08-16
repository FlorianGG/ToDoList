import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from 'react-native-elements';

import ButtonAddTask from './components/button-add-task/button-add-task';
import Header from './components/header/header';
import MenuTask from './components/menu-task/menu-task';
import TaskList from './components/task-list/task-list';

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

  //arrow function used for bind this

  displayMenuTask = taskContent => {
    console.log('onPress', taskContent)
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header content="Ma todo" />
        <ScrollView>
          <TaskList
            onPressCallback={this.displayMenuTask}
            taskList={this.state.taskList}
          />
        </ScrollView>
        <MenuTask />
        <ButtonAddTask />
      </View>
    )
  }
}
