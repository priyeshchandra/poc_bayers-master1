import { Api } from "../utils/Api";

export function addUserFields(id, fields) {
	return async dispatch => {
		try {
			const res = await Api.patch(`/users/${id}`, { fields });
			return Promise.resolve(res.data);
		} catch (err) {
			return Promise.reject(err);
		}
	};
}

export function addUserFolders(id, folders) {
	return async dispatch => {
		try {
			const res = await Api.patch(`/users/${id}`, {
				folders: folders.map(folder => ({ ...folder, files: [] }))
			});
			dispatch({ type: "ADD_FOLDERS", payload: res.data });
		} catch (err) {
			return Promise.reject(err);
		}
	};
}
