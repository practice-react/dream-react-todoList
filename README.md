## input checked

- checked 타입 input의 checked를 props로 받아오 제어하려고 하니까 onChange이벤트를 사용하라는 에러가 발생
- input 마다 onChage 이벤트를 사용해야 하는 문제 발생
- readOnly로 읽기전용으로 바꾸면 해결도지만 읽기전용은 사용자가 제어할 수 없다는 뜻을 가져서 좋지 않다고 생각
- 리액트에는 defaultChecked라는 속성이 추가됐다.
- defaultChecked는 폼을 state로 관리하지 않다면 사용하는 것을 권장한다고 한다.(상태로 제어하면 사용 불가능)
- input은 uncontrol-component이기 때문에 항상 상태를 가지고 있어야한다. 그러니까 onChange 핸들러가 존재해야 한다는 거다.
  (까먹지 말자.)

## 컴포넌트의 역할 분리

- 나는 이벤트 위임을 사용하려고 해서 하나의 핸들러가 두가지의 역할을 하게 조건문을 달았는데
- 리액트는 이벤트가 중복으로 등록이 되지 않아 쓸데없는 생각이였다.(이것은 좀더 공부해봐야한다.)
- 그리고 부모의 상태를 자식 컴포넌트에서 조작해야했다면
- 부모 컴포넌트에서 상태를 변경하는 모든 로직을 짜서 props로 전달했는데(역할의 구분을 제대로 하지 못함.) 예를 들어 props로 전달할 핸들러에는 상태를 변경하는 로직만 존재하고,
- 이벤트가 발생시 일어나는 로직은 자식 컴포넌트에서 한다.
- 예) 부모 컴포넌트에서 handleAdd(update) 함수를 전달
- 자식컴포넌트는 handleChange가 발생하면 전달받은 handleAdd에 변경된 값을 상태의 데이터 구조에 맞게 전달하고 호출한다.
- 이는 컴포넌트가 자신의 역할에 알맞는 작업만 하도록 한다.
- 그러면 trelloClone에서는 모든 상태를 변경시키는 로직을 부모 컴포넌트에서 했는데, 잘못된 건가?
- 생각을 해보니 이벤트를 100개를 사용해도 아무 문제가 없다면.
- 조건문으로 걸러낼 필요가 없네.
- 맞나? (이것도 알아보자 deep dive에 나오겠지.)

**_내가 사용한 방법_**

```js
  // 이벤트 위임을 사용하기 위해서 이런 로직이 만들어졌다.
  // ul태그에 이벤트를 바인딩한다고 생각함.
  // 그런데 사실 리액트는 모든 이벤트가 최상위 컴포넌트(root)에 등록이 된다.
  // 그리고 모든 로직을 AppTodo에 작성했는데,
  // 이러면 컴포넌트를 나눌 이유가 없다.
  // 이벤트를 발생시키는 것은 하위 컴포넌트인 TodoList인데 AppTodo에서 동작하는 것처럼 작성하고 props로 전달했다.

function AppTodo(){
  const [todos,setTodos] = useState([])

  const handleList = (e)=>{
      const list = e.target.closest('ul > li')
    if(e.target.closest('input[type="checkbox"]')){
      const changeIsChecked = todos.map(todo=> map.id === +list.dataset.id ? {...todo, isChecked: !todo.isChecked}: todo)

      setTodos(changeIsChecked)
    }
    if(e.target.closest('button')){
      const filterTodos = todos.filter(todo=> todo.id !== +list.dateset.id)

      setTodos(filterTodos)
    }

  }

  return (
    <TodoHeader />
    <TodoList />
    <TodoForm />
  )

}
```

**_수정된 코드_**

```js
// 관심사의 분리를 명확히 한 것 같다.
// 코드도 매우 깔끔해지고 컴포넌트의 재사용 측면에서도 더 좋아졌다.
// 이제 컴포넌트를 어떻게 나누고 상태관리를 해야되는지 느낌이 왔다.
function AppTodo(){
  const [todos,setTodos] = useState([])

  const handleUpdate = (update)=> setTodos(todos.map(todo=> todo.id === update.id ? update : todo ))

  const handleDelete = (delete)=> setTodos(todos.filter(todo=> todo.is !== delete.id))

  return (
    <TodoHeader />
    <ul>
      {todos.map(todo=>
        <TodoList
          todo={todo}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />)}
    </ul>
    <TodoForm />
  )
}

function TodoList({todo, onUpdate, onDelete}){
  const {text, status} = todo

  const handleChange = (e) => {
    const status = e.target.checked ? 'completed' : 'active'

    onUpdate({...todo, status})
  }

  const handleClick = (e) => onDelete(todo)

  return (
    <li>
      <input
      type="checkbox"
      checked={status === 'completed'}
      onChange={handleChange}
      />
      <span>{text}</span>
      <button type="button" onClick={handleClick}>X</button>
    </li>
  )
}
```

## useState의 초기값 호출

```js
function App () {

const [state, setState] = useState(initialValue())

// state의 초기값은 3이다.
// setState로 인해 state가 변경되면 리액트는 App컴포넌트를 다시 호출한다.
// 그러면 안의 모든 코드가 다시 실행되는데
// useState()도 다시 실행된다.
// 그러면 state가 다시 초기화 될까?
// useState는 내부적으로 state값이 존재하면 초기값을 할당하지 않는다.
// 그러나 useState(초기값) 전달받은 인자를 실행시키고 나서
// 이전의 값이 존재한다면 할당하지 않기 떄문에
// 만약 전달받은 인자가 함수라면 리랜더링이 일어날때마다 실행이 된다.
// 네트워크나 무거운 데이터를 받아오는 함수라면 최적화에 문제가 생기기 때문에
// useState(()=> initialValue()) 처럼 콜백함수로 감싸주어야한다.
// 축약표현으로 useState(initialValue) 해도 된다.

}
function initialValue = () =>{
  console.log('초기값')
  return 3
}
```
