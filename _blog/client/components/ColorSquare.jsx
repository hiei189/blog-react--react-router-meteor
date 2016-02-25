ColorSquare = React.createClass({

	handleClick(){
		this.props.CallBackParent(this.props.background);

	},
	componentDidMount(){
		
	},
	render(){
		//const className = this.props.color + " color-choice";
		this.style = {
			background : this.props.background
		};
		return (
			<div className="color-choice" onClick={this.handleClick} style = {this.style} ></div>
		);
			
	}
});