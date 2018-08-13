import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

let ErrorMessage = (props) => {
	console.log(props);
	return (
		props.errorMessage ?
			<div className="error-wrapper">
				<span className={props.type == "SET_ERROR_MESSAGE"?"error":"info"}>
				{props.errorMessage.split('\n').map((item, key) => {
					return <span key={key}>{item}<br/></span>
				})}
				</span>
			</div>
			:<div></div>
	);
};

ErrorMessage.propTypes = {
	errorMessage: PropTypes.string
};

const mapStateToProps = (state) => ({
	type: state.type,
	errorMessage: state.errorMessage
});

ErrorMessage = connect(mapStateToProps)(ErrorMessage);

export default ErrorMessage;