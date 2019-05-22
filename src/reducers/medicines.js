export default (state = [], action) => {
	switch (action.type) {
		case "ADD_MEDICINES":
			return action.payload;
		default:
			return state;
	}
};
