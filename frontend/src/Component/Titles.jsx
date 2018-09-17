import React from "react";

class Titles extends React.Component {
	render() {
		return (
			<div className="icon">
				<p className="icon-id">{this.props.passVal}</p>
				{this.props.passVal.slice(0, -1) && <img className="weather-img" src={`/img/${this.props.passVal.slice(0, -1)}.svg`} />}
				<div></div>
			</div>
		);
	}
}

export default Titles;
