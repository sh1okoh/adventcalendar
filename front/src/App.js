import React from 'react';
import axios from 'axios';


const Title = ({todoCount}) => {
  return (
    <div>
      {
          todoCount > 0 ? <h1>{todoCount}つのタスクがあります</h1> :
          <h1>タスクがありません</h1>
      }
    </div>
  );
}

const TodoForm = ({addTodo, isEdit}) => {
  let input;
  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        addTodo(input.value);
        input.value = '';
      }}>
        <br />
      {isEdit ? "aaa" : <input className="form-control col-md-12" ref={node => {
        input = node;
      }} />}
      <br />
      <br />
    </form>
  );
};

const Todo = ({todo, remove, changeForm, isEdit}) => {
  return (
    <li style={{listStyle: "none"}}>
      {
        isEdit ?
        <>
        <input className="form-control col-md-12" value={todo.contents} onChange={(event)=> console.log(event)}/>
        <button onClick={() => {}}>更新する</button>
        
        </>
        :
        <>
        <a href="#" className="list-group-item">{todo.contents}</a>
        <button onClick={() => {remove(todo.id)}}>削除</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        {/* <button onClick={() => {changeForm(todo.id)}}>編集する</button> */}
        </>
      }
    </li>
  );
}

const TodoList = ({todos, remove, changeForm, isEdit}) => {
  const todoNode = todos.map((todo) => {
    return (
        <Todo todo={todo} key={todo.id} remove={remove} changeForm={changeForm} isEdit={isEdit}/>
    )
  });
  return (<div className="list-group" style={{marginTop:'30px'}}>{todoNode}</div>);
}

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
    console.log("2");
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

    axios.delete(this.apiUrl+id)
      .then((res) => {
        this.setState({data: remainder});
      })
  }

  handleUpdate(id) {
    axios.put(this.apiUrl+id)
      .then((res) => {
        this.setState({data: res.data})
      })
  }

  handleOnChangeForm(id) {
    this.setState({...this.state, isEditForm: !this.isEditForm})
  }

  // handleUpdate(id) {
  //   axios.put(this.apiUrl+'/'+id, todo.text)
  //   .then((res) => {
  //     this.setState({data: reminder})
  //   })
  // }

  render(){
    console.log("1");
    return (
      <div>
        <Title todoCount={this.state.data.length}/>
        <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList
          todos={this.state.data}
          remove={this.handleRemove.bind(this)}
          changeForm={this.handleOnChangeForm.bind(this)}
          isEdit={this.state.isEditForm}
          // isChangeForm={this.handleOnChangeForm.bind(this)}
        />
      </div>
    );
  }
}

export default TodoApp