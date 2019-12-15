import React from 'react';
import axios from 'axios';

console.clear();

const Title = ({todoCount}) => {
  return (
    <div>
       <div>
          <h1>to-do ({todoCount})</h1>
       </div>
    </div>
  );
}

const TodoForm = ({addTodo}) => {
  let input;
  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        addTodo(input.value);
        input.value = '';
      }}>
      <input className="form-control col-md-12" ref={node => {
        input = node;
      }} />
      <br />
    </form>
  );
};

const Todo = ({todo, remove}) => {
  return (
    <li><a href="#" className="list-group-item">{todo.contents}</a>
    <span onClick={() => {remove(todo.id)}}>×</span>
    </li>
  );
}

const TodoList = ({todos, remove}) => {
  console.log("todolist", todos);
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove}/>)
  });
  return (<div className="list-group" style={{marginTop:'30px'}}>{todoNode}</div>);
}

// Contaner Component
// Todo Id
window.id = 0;
class TodoApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
    this.apiUrl = 'http://localhost:3000/api/todos/'
  }

  componentDidMount(){
    console.log("componentDidMount");
    axios.get(this.apiUrl)
      .then((res) => {
        this.setState({ data: res.data });
      });
  }

  addTodo(val){
    const todo = {contents: val}
    axios.post(this.apiUrl, todo)
       .then((res) => {
          this.state.data.push(res.data);
          this.setState({data: this.state.data});
       });
  }

  handleRemove(id){
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id) return todo;
    });

    axios.delete(this.apiUrl+'/'+id)
      .then((res) => {
        this.setState({data: remainder});
      })
  }
  handleUpdate(id) {
    const reminder = ""
  }

  // handleUpdate(id) {
  //   const reminder = this.state.data.filter((todo) => {
  //     if (todo.id !== id) return todo;
  //   })
  //   axios.put(this.apiUrl+'/'+id, todo.text)
  //   .then((res) => {
  //     this.setState({data: reminder})
  //   })
  // }

  render(){

    return (
      <div>
        <Title todoCount={this.state.data.length}/>
        <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList
          todos={this.state.data}
          remove={this.handleRemove.bind(this)}
          // update={this.handleUpdate.bind(this)}
        />
      </div>
    );
  }
}

export default TodoApp