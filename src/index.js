import { createStore } from "redux";


const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// Action만 별도로 선언해서 관리한다.
const addToDo = (text) => {
    return { type: ADD_TODO, text };
}

const deleteToDo = (id) => {
    return { type: DELETE_TODO, id };
}

const reducer = (state = [], action) => {
    console.log(action);
    switch (action.type) {
        case ADD_TODO:
            // 기존의 array와 새로운 객체를 합쳐서 새로운 data object를 반환한다.
            return [{ text: action.text, id: Date.now() }, ...state];
        case DELETE_TODO:
            return state.filter(toDo => toDo.id !== parseInt(action.id));
        default:
            return state;
    }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const dispatchAddToDo = (text) => {
    // reducer와 소통하기 위한 dispatch.
    store.dispatch(addToDo(text));
}

const dispatchDeleteToDo = (e) => {
    const id = parseInt(e.target.parentNode.id);
    store.dispatch(deleteToDo(id));
}

const paintToDos = () => {
    const toDos = store.getState();
    ul.innerHTML = "";
    toDos.forEach(toDo => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.innerText = "Delete";
        btn.addEventListener("click", dispatchDeleteToDo);
        li.id = toDo.id;
        li.innerText = toDo.text;
        li.appendChild(btn);
        ul.appendChild(li);
    })
}

store.subscribe(paintToDos);

const onSubmit = e => {
    e.preventDefault();
    const toDo = input.value;
    input.value = "";
    dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);