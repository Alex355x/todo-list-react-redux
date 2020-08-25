import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Task from './Task';
import CreateTaskInput from './CreateTaskInput';
import * as tasksActions from '../tasks.actions';
import { sortedTasksListSelector } from '../tasks.selectors';

class TasksList extends Component  {
 
  componentDidMount() {
    this.props.getTaskList();
  }
  
  render () {
  
  return (
    <div className="todo-list">
      <CreateTaskInput onCreate={this.props.createTask} />
      <ul className="list">
        {this.props.tasks.map(task => (
          <Task 
            key={task.id} 
            {...task} 
            onChange={this.props.updateTask}
            onDelete={this.props.deleteTask}
          />
        ))}
      </ul>
    </div>   
  );
  }
};

TasksList.propTypes = {
  getTaskList: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape()),
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  createTask: PropTypes.func.isRequired,
}

const mapDispatch = {
  getTaskList: tasksActions.getTaskList,
  updateTask: tasksActions.updateTask,
  deleteTask: tasksActions.deleteTask,
  createTask: tasksActions.createTask,
}

const mapState = state => {
  return {
    tasks: sortedTasksListSelector(state),
  }
}

export default connect(mapState, mapDispatch)(TasksList);