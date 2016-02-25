Modal  = React.createClass({
	componentDidMount(){
		//$('#Modal-default').modal();
	},
	render(){
		return(
			<div className="modal fade" tabIndex="-1" role="dialog" id = "Modal-default">
				<div className="modal-dialog">
					<div className="modal-content">
					  <div className="modal-header">
					    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					    <h4 className="modal-title">{this.props.content.title}</h4>
					  </div>
					  <div className="modal-body">
					    <p>{this.props.content.text}</p>
					  </div>
					  <div className="modal-footer">
					    <button type="button" className="btn btn-default" data-dismiss="modal">{this.props.content.close}</button>
					    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick = {this.props.content.link}>{this.props.content.save}</button>
					  </div>
					</div>
				</div>
			</div>
			);
	}
});