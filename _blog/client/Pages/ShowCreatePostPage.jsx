ShowCreatePostPage = React.createClass({
	render(){
		return(
			<div className="row">
				<div className="col-xs-offset-2 col-xs-8 col-md-offset-2 col-md-8">
					<div className="page-header"><h1>Crear post<small></small></h1></div>
					<CreatePost />
				</div>
			</div>
			);
	}
});