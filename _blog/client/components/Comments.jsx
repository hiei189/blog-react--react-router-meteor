
CommentsComponent = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		
		return {
            currentUser: Meteor.user()
        };
	},

	getInitialState() {
    	return {text: ''};
  	},

	handleComment(e){		
		e.preventDefault();
		Meteor.call('addComment',this.props.postid,this.state.text);			
	},

	handleTextChange(e){
		this.setState({text: e.target.value});
	},
	
	render(){
		return(
			<div className="row">
				<div className="col-xs-offset-2 col-xs-10">
					<form onSubmit= {this.handleComment} noValidate className="commentform">
						<div className="form-group">
							<input onChange={this.handleTextChange}  value={this.state.text} type="text" className="commentInput form-control" placeholder="ingresa un comentario"/>
						</div>
					</form>
				</div>
				<CommentsInstance postid = {this.props.postid}/>
			</div>
			);
	}

});

CommentsInstance = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){	
		Meteor.subscribe("getCommentsByPostId", this.props.postid);
		this.data.comments = {};
		return {
            currentUser: Meteor.user(),
			comments: Comments.find({postowner: this.props.postid}, {sort: {createdAt: -1}}).fetch()
        };
	},

	renderComments(){
		
		if(typeof this.data.comments !== "undefined"){		
			return this.data.comments.map((comment) => {
				return <SingleComment
					comment={comment} key = {comment._id}
					/>;
		    });
		}
	},

	render(){
		return(
			<div className="row">
				<div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xs-offset-2">
					{this.renderComments()}
				</div>
				<hr/>
			</div>
			);
	}
});

SingleComment = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		//Meteor.subscribe("getCommentsByPostId", this.props.comment.owner);
		this.data.owner = {};
		Meteor.subscribe("getUsersById",  this.props.comment.owner);

		if (typeof Meteor.users.findOne({_id: this.props.comment.owner}) !== "undefined") {
			return {
            currentUser: Meteor.user(),
            owner: Meteor.users.findOne({_id: this.props.comment.owner}).profile.name
        	}
        } else{
        	
        	return {
            currentUser: Meteor.user()
        	}
        }
		
	},

	render(){
		
		if(typeof this.data.owner !== "undefined"){
		return(
			<div className="row">
				<div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
					<strong>{this.data.owner + ": "}</strong>{this.props.comment.comment}
				</div>
				<hr/>
			</div>
			);
	} else return false;
	}
});