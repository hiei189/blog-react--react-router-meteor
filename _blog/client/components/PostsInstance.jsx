ReactCSSTransitionGroup =  React.addons.CSSTransitionGroup;
PostsInstance = React.createClass({
	mixins: [ReactMeteorData],
	getDefaultProps() {
	    return {
	      	showUser: Meteor.userId()
	    };
	},

	getMeteorData() {
	    return {
	      	currentUser: Meteor.user(),
	      	posts: Posts.find({owner: this.props.showUser}, {sort: {createdAt: -1}}).fetch()
	    };
	},

	renderposts(){

		return this.data.posts.map((post) => {
		const currentUserId = this.data.currentUser && this.data.currentUser._id;
		const showPostButtons = post.owner === currentUserId;
	    return <SinglePost
			key={post._id}
			post={post}
			new = {post.new}
			showPostButtons = {showPostButtons}/>;

	    });
	},

	render(){
		return(
			<ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
				{this.renderposts()}
			</ReactCSSTransitionGroup>
			);
	}
});
