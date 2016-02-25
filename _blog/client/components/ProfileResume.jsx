ProfileResume = React.createClass({
	
	mixins: [ReactMeteorData],

	getMeteorData(){
		
		var handle = Meteor.subscribe("getUsersById",this.props.showUser);
		console.log( this.props.showUser);
		return{
			subsHandle: handle.ready(),
			currentUser: Meteor.users.findOne({_id: this.props.showUser})
		};
	},

	render(){
		var style_container = {
			position: 'fixed'
		};
		var user = this.props.showUser;
		if(this.data.subsHandle){
			if(this.data.currentUser.profile){
				return (
					<div className="panel"  style = {style_container}>
							<div className="panel-heading"><h1 className="panel-title">{this.data.currentUser.profile.name} <small>{this.data.currentUser.profile.age}</small></h1></div>
							<div className="panel-body">
								<p>
									{this.data.currentUser.profile.description}
								</p>
							</div>
						
					</div>
					)
			}
		}
		else{
			return false;
		}
	}
});