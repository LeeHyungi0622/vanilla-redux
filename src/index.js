import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

// Action
const ADD = "ADD";
const MINUS = "MINUS";

// function that modify the data.
// 상태 데이터를 수정해주는 함수 = reducer.
// 오직 하나의 함수만 상태 데이터를 변경할 수 있다.
const countReducer = (count = 0, action) => {
    switch (action.type) {
        case ADD:
            return count + 1
        case MINUS:
            return count - 1
        default:
            return count;
    }
};

// reducer의 역할은 data를 바꿔주는 역할을 한다.
const countStore = createStore(countReducer);

// Subscribe
const onChange = () => {
    console.log(countStore.getState());
    number.innerText = countStore.getState();
};

countStore.subscribe(onChange);


// dispatch를 이용해서 createStore의 인자로 넣어준 countReducer로 메세지를 보낸다.
// countReducer(currentState=0, {type: "Hello"})로 정의해준다.

const handleAdd = () => {
    countStore.dispatch({ type: ADD });
}

const handleMinus = () => {
    countStore.dispatch({ type: MINUS });
}

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);

// store에는 dispatch, subscribe, getState, replaceReducer
// 네 가지 function을 가지고 있다. 
// console.log(countStore.getState());