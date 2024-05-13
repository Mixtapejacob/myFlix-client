const todos = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
              ...state,
              {
                 text: action.text,
                 completed: false
              }
           ] 
    }    
};
case TOGGLE_TODO:
    return state.map((todo, index) =>
        (index === action.index)
        ? {...todo, completed: !todo.completed}
        : todo
    )
    default:
    return state

    export default todos;  