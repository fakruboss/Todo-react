import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

class CurrentInfo extends React.Component {
    constructor(props) {
        super(props);
        this.formatDate = this.formatDate.bind(this);
    }

    formatDate() {
        let currentDate = new Date().toString();
        currentDate = currentDate.split(" ");
        return `${currentDate[0]} ${currentDate[2]} ${currentDate[1]}`;
    }

    render() {
        const CURRENT_DAY = "WELCOME";
        return (
            <div className="info-con">
                <div className="image-con" />
                <p className="current-day">{CURRENT_DAY}</p>
                <p className="current-date">{this.formatDate()}</p>
            </div>
        );
    }
}

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.toggleClass = this.toggleClass.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            active: true,
            taskInputValue: ""
        };
    }

    toggleClass() {
        if (this.state.taskInputValue === "") {
            return;
        }
        this.setState({
            active: !this.state.active
        });
    }

    handleChange(event) {
        this.setState({
            taskInputValue: event.target.value
        });
    }

    render() {
        const PLACEHOLDER_VALUE = "Enter your task";
        return (
            <li className="task">
                <span draggable="true" onClick={this.toggleClass}>
                    <FontAwesomeIcon
                        className="faIcons"
                        icon={this.state.active ? faCircle : faCheckCircle}
                    />
                </span>
                <input
                    placeholder={PLACEHOLDER_VALUE}
                    onFocus={e => (e.target.placeholder = "")}
                    onBlur={e => (e.target.placeholder = PLACEHOLDER_VALUE)}
                    type="text"
                    className={
                        this.state.active ? "task-input" : "task-input-strike"
                    }
                    onChange={this.handleChange}
                />
            </li>
        );
    }
}

class AddTask extends React.Component {
    render() {
        return (
            <div className="add-task" onClick={this.props.addNewTodo}>
                <span>
                    <FontAwesomeIcon className="faIcons" icon={faPlusCircle} />
                </span>
                <p>Add Task</p>
            </div>
        );
    }
}

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskCount: 1
        };
        this.addNewTodo = this.addNewTodo.bind(this);
    }

    addNewTodo() {
        this.setState({
            taskCount: this.state.taskCount + 1
        });
    }

    render() {
        const tasks = [];
        for (let count = 1; count <= this.state.taskCount; count++) {
            tasks.push(<TaskList key={count} />);
        }

        return (
            <div className="entire-page">
                <div className="main-con">
                    <CurrentInfo />
                    <div className="task-list">
                        <ul>{tasks}</ul>
                    </div>
                    <AddTask addNewTodo={this.addNewTodo} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Todo />, document.getElementById("root"));
