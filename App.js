import lodash from 'lodash';
import React from 'react';
import { AsyncStorage, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import ButtonAddTask from './components/button-add-task/button-add-task';
import Header from './components/header/header';
import MenuTask from './components/menu-task/menu-task';
import TaskList from './components/task-list/task-list';
import TextPrompt from './components/text-prompt/text-prompt';
import { TASK } from './model/model';
import { style } from './styles/style';

const storageKey = 'taskList'

export default class App extends React.Component {
  state = {
    taskList: [],
    isMenuTaskVisible: false,
    currentTask: {},
    isAddPromptVisible: false,
    isRenamePromptVisible: false,
    idGenerator: 0,
  }

  componentDidMount() {
    AsyncStorage.getItem(storageKey).then(storedTaskList => {
      if (storedTaskList) {
        this.setState({ taskList: JSON.parse(storedTaskList) }, () => {
          const newKey = this.state.taskList.length - 1
          if (this.state.taskList[newKey]) {
            this.setState({
              idGenerator: this.state.taskList[newKey].id + 1,
            })
          }
        })
      }
    })
  }

  //arrow function used for bind this
  toggleMenuTaskVisibility = task => {
    let currentTask = task
    if (this.state.isMenuTaskVisible) {
      currentTask = {}
    }
    this.setState({
      isMenuTaskVisible: !this.state.isMenuTaskVisible,
      currentTask,
    })
  }

  //arrow function used for bind this
  deleteCurrentTask = () => {
    const index = lodash.findIndex(this.state.taskList, {
      id: this.state.currentTask.id,
    })
    const taskList = this.state.taskList

    taskList.splice(index, 1)
    this.setState({ taskList: taskList, currentTask: {} }, () => {
      this.toggleMenuTaskVisibility()
      this.saveTaskList()
    })
  }

  //arrow function used for bind this
  toggleTaskStatus = () => {
    const updatedTask = this.state.currentTask
    updatedTask.status =
      this.state.currentTask.status === TASK.doneStatus
        ? TASK.toDoStatus
        : TASK.doneStatus
    const index = lodash.findIndex(this.state.taskList, {
      id: this.state.currentTask.id,
    })
    const updatedTaskList = this.state.taskList
    updatedTaskList[index] = updatedTask
    this.setState(
      {
        taskList: updatedTaskList,
        isMenuTaskVisible: false,
        currentTask: {},
      },
      () => {
        this.saveTaskList()
      }
    )
  }
  //arrow function used for bind this
  hideAddTask = () => {
    this.setState({ isAddPromptVisible: false })
  }

  //arrow function used for bind this
  onAddTask = value => {
    const task = {
      id: this.state.idGenerator,
      content: value,
      status: TASK.toDoStatus,
    }
    this.setState(
      {
        taskList: [...this.state.taskList, task],
        idGenerator: this.state.idGenerator + 1,
      },
      () => {
        this.hideAddTask()
        this.saveTaskList()
      }
    )
  }

  //arrow function used for bind this
  displayAddPrompt = () => {
    this.setState({ isAddPromptVisible: true })
  }

  //arrow function used for bind this
  displayRenameTask = task => {
    this.setState({ currentTask: task, isRenamePromptVisible: true })
  }

  //arrow function used for bind this
  hideRenamePrompt = () => {
    this.setState({ currentTask: {}, isRenamePromptVisible: false })
  }

  //arrow function used for bind this
  onRenamePrompt = value => {
    const index = lodash.findIndex(this.state.taskList, {
      id: this.state.currentTask.id,
    })
    const taskList = this.state.taskList
    taskList[index].content = value
    this.setState({ taskList }, () => {
      this.hideRenamePrompt()
      this.saveTaskList()
    })
  }

  saveTaskList = () => {
    AsyncStorage.setItem(storageKey, JSON.stringify(this.state.taskList))
  }

  render() {
    const { taskList } = this.state
    return (
      <View style={{ flex: 1 }}>
        <Header content="Ma todo" />
        <ScrollView>
          {taskList.length > 0 ? (
            <TaskList
              onPressCallback={this.toggleMenuTaskVisibility}
              onLongPressCallback={this.displayRenameTask}
              taskList={this.state.taskList}
            />
          ) : (
            <View style={style.noTask}>
              <Text>Cliquer sur le bouton + pour créer une tâche</Text>
            </View>
          )}
        </ScrollView>
        <MenuTask
          isVisible={this.state.isMenuTaskVisible}
          onDisapearCallback={this.toggleMenuTaskVisibility}
          onDeleteCallback={this.deleteCurrentTask}
          onChangeStatusCallback={this.toggleTaskStatus}
        />
        <TextPrompt
          title="Ajoutez une nouvelle tâche"
          placeholder="Ex : Acheter du lait"
          defaultValue=""
          isVisible={this.state.isAddPromptVisible}
          onCancelCallback={this.hideAddTask}
          onSubmitCallback={this.onAddTask}
        />
        <TextPrompt
          title="Renommer la tâche"
          placeholder=""
          defaultValue={this.state.currentTask.content}
          isVisible={this.state.isRenamePromptVisible}
          onCancelCallback={this.hideRenamePrompt}
          onSubmitCallback={this.onRenamePrompt}
        />
        <ButtonAddTask onPressCallback={this.displayAddPrompt} />
      </View>
    )
  }
}
