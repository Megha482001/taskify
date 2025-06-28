import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo extends AddTodoPayload {
    id:string;
    completed: boolean;
}

interface AddTodoPayload {
    title:string,
    description:string,
    deadline:string,
}

export const initialState={todos:[{
    id: "1",
    title: "Sample Todo",
    description: "This is a sample todo item.",
    deadline: "2025-07-24",
    completed: false
}] as Todo[]};

let todoSlice =createSlice({
    name:"todo",
initialState,
reducers:{
        addTodo:(state,action:PayloadAction<AddTodoPayload>)=>{
            const newTodo:Todo = {
                id: Date.now().toString(),
                completed: false,
                ...action.payload
            };
            state.todos.push(newTodo);
        },
        removeTodo:(state,action:PayloadAction<{id:string}>)=>{
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        },
        editTodo:(state,action:PayloadAction<{id:string} & AddTodoPayload>)=>{
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.todos[index] = { ...state.todos[index], ...action.payload };
            }
        },
        toggleCompleted:(state,action:PayloadAction<{id:string}>)=>{
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.todos[index].completed = !state.todos[index].completed;
            }
        }
    }
})

export const { addTodo,removeTodo,editTodo,toggleCompleted } = todoSlice.actions;
export default todoSlice.reducer;