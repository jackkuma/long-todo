import React, {Component} from 'react';
// 輸入 react-virtualized 的 List 組件
import { List } from "react-virtualized";
// 輸入 react-virtualized 的 css
import 'react-virtualized/styles.css'

// ----------
// 效能比較紀錄
// ----------

// jquery scripting 1765 rendering 131
// react scripting 835 rendering 132
// react pureComponent scripting 1304 rendering 95
// react key scripting 611 rendering 86
// react 40 todos scripting 85 rendering 6
// react-virtualized scripting 82 rendering 11


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 產生一個長度為 4000 的陣列
      todos: Array.from(Array(4000), (d, i) => ({ text: 'todo' + i}))
    }
  }

  // 新增待辦事項
  addNewTodo = () => {
    const newTodo = {
        text: 'todo  ' + this.state.todos.length
    };
    // 將新增的待辦事項放在陣列的最前面
    const todos = [newTodo, ...this.state.todos];
    this.setState({todos});
  }
  // 讓 react-virtualized render row 的 function
  rowRenderer = ({key, index, style}) => {
    return (
      <ListItem 
        key={key}
        style={style}
        todo={this.state.todos[index]}
      />
    )
  }
  render() {
    return (
      <div className="App">
        <div>
          Todo List
        </div>
        <button id='add-todo-btn' onClick={this.addNewTodo}>新增Todo</button>
        <div id='todo-list'>
          <ul>
            <List 
              // react-virtualized 參數設定
              width={200}
              height={500}
              rowHeight={20}
              rowCount={this.state.todos.length}
              rowRenderer={this.rowRenderer}
            />
          </ul>
        </div>
      </div>
    );
  }
}

class ListItem extends React.PureComponent {
  render () {
    return (
      <li
        style={this.props.style}
      >{this.props.todo.text}</li>
    )
  }
}

export default App;
