export default (state = [], action) => {
	switch (action.type) {
		case "ADD_FOLDERS":
			return action.payload;
		default:
			return state;
	}
};
