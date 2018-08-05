export default function(state = false, action) {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return !state;
    case 'OPEN_SIDEBAR':
      return true;
    case 'CLOSE_SIDEBAR':
      return false;
    default:
      return state;
  }
}
