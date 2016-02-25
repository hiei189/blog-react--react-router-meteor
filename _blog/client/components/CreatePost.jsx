
//ReactCSSTransitionGroup =  React.addons.CSSTransitionGroup;
const {Link} = ReactRouter;
CreatePost = React.createClass({
	mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            currentUser: Meteor.user()
        };
    },

    getInitialState() {
        return {
          hidden: false,
          mounted: false
        };
    },
    componentDidMount: function() {
    	this.setState({ mounted: true });
  	},

	handleNewPost(event){

		var newTitle = React.findDOMNode(this.refs.newTitle).value.trim();
		var newPost = React.findDOMNode(this.refs.newPost).value;
		var htmlNewPost = parseMarkdown(newPost);
		var newTags = React.findDOMNode(this.refs.newTags).value.replace(/ /g,'').split(',');
		console.log(newTags);
		Meteor.call("addPost",newTitle,htmlNewPost,newTags);

		React.findDOMNode(this.refs.newTitle).value = "";
		React.findDOMNode(this.refs.newPost).value = "";
		React.findDOMNode(this.refs.newTags).value = "";

	},

	render (){
		return (
			<form role="form">
				<div className="row">
					<div className="form-group">
						<label className="col-xs-12">Titulo:
							<input type="text" ref="newTitle" className="form-control" placeholder = "Ingresa un título"/>
						</label>
					</div>
				</div>
			  	<div className="row">
			  		<div className="form-group">
						<label className="col-xs-12">Post:
							<textarea type="text" ref="newPost" className="form-control" rows = "7" placeholder = "Ingresa el post"/>
						</label>
					</div>
				</div>
				<div className="row">
			  		<div className="form-group">
						<label className="col-xs-12">Tags:
							<input type="text" ref="newTags" className="form-control" placeholder = "Ingresa tags separado por comas"/>
						</label>
					</div>
				</div>
			  	<Link to ="/" onClick={this.handleNewPost}><button type="submit" className="btn btn-default">Crear!</button></Link>
			</form>
			);
	},
});
