import React from "react";
import { Api } from "../../utils/Api";
import { connect } from "react-redux";
import { addUserFields } from "../../actions";
import "./index.css";

const DisplayOptions = ({ disabled, exportFile, history, saveData }) => (
	<div className="displayOptions">
		<a
			className="button is-white pink"
			disabled={disabled}
			onClick={() => {
				saveData();
				history.push("/search");
			}}
		>
			Save
		</a>
		<a
			className="button is-white pink"
			disabled={disabled}
			onClick={exportFile}
		>
			Export
		</a>
		<a className="button is-white pink" disabled={disabled}>
			Reset
		</a>
	</div>
);

class History extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			history: [],
			selected: [],
			disabled: true
		};
	}
	getHistory = () => {
		Api.get("/history").then(res => this.setState({ history: res.data }));
	};
	selectedBox = e => {
		this.setState(
			{
				selected: [...this.state.selected, e.target.name]
			},
			() => {
				if (this.state.selected.length > 0) {
					this.setState({
						disabled: false
					});
				}
			}
		);
	};
	exportFile = () => {
		this.props.addUserFields(1, this.state.selected).then(() => {
			const element = document.createElement("a");
			let data = "name place disease dob \r\n";
			this.state.selected.forEach(item => {
				data +=
					this.state.history[item - 1].name +
					" " +
					this.state.history[item - 1].place +
					" " +
					this.state.history[item - 1].disease +
					" " +
					this.state.history[item - 1].dob +
					"\r\n";
			});
			const file = new Blob([data], { type: "text/plain" });
			element.href = URL.createObjectURL(file);
			element.download = "record.txt";
			document.body.appendChild(element);
			element.click();
		});
	};
	saveData = () => {
		const data = this.state.selected.map(id => this.state.history[id - 1]);
		this.props.saveData(data);
	};
	renderHistory = () => {
		if (this.state.history) {
			return this.state.history.map(item => (
				<div className="history--results--wrapper" key={item.sno}>
					<div>
						<label className="checkbox">
							<input
								type="checkbox"
								onChange={this.selectedBox}
								name={item.sno}
							/>
						</label>
					</div>
					<div>{item.sno}</div>
					<div>{item.name}</div>
					<div>{item.place}</div>
					<div>{item.disease}</div>
					<div>{item.dob}</div>
				</div>
			));
		}
		return "Loading";
	};
	render() {
		const { show } = this.state;
		return (
			<div className="history">
				<div
					className="card history_card--outline"
					onClick={() =>
						this.setState({ show: !show }, () => this.getHistory())
					}
				>
					<div className="card-content">
						<div className="content header-3 pink">
							<i className="fas fa-arrow-circle-down pink" />
							&nbsp;&nbsp;&nbsp;&nbsp;History
						</div>
					</div>
				</div>
				{show && (
					<div>
						<DisplayOptions
							disabled={this.state.disabled}
							exportFile={this.exportFile}
							history={this.props.history}
							saveData={this.saveData}
						/>
						<div className="history--results--wrapper bg-cornsilk">
							<div />
							<div>Sno</div>
							<div>Name</div>
							<div>Place</div>
							<div>Disease</div>
							<div>Dob</div>
						</div>
						{this.renderHistory()}
					</div>
				)}
			</div>
		);
	}
}
export default connect(
	null,
	dispatch => ({
		addUserFields(id, fields) {
			return dispatch(addUserFields(id, fields));
		},
		saveData(data) {
			return dispatch({ type: "ADD_MEDICINES", payload: data });
		}
	})
)(History);
