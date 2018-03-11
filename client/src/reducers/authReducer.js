export default function (state = {}, action) {
  console.log(state);
  console.log(action);

  switch (action.type) {
    default: return state;
  }
}