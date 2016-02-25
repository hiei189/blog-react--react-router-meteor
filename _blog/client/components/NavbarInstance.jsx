const {Link} = ReactRouter;
NavbarInstance = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData() {

	    return {
	      	currentUser: Meteor.user()
	    };

  	},

  	toggleSidebar(){

		Session.set('toggleSidebar',!Session.get('toggleSidebar'));
  	},

	render(){

		this.style = {
            background: this.props.background
        };
        var naviconstyle ={
        	float: 'left',
        	lineHeight : '50px'
        };

		return(
			<div className = "navbar">
				<nav className="navbar-inner navbar-inverse navbar-fixed-top" style={this.style}>
					<div className="container-fluid">
						<a href="#" onClick = {this.toggleSidebar}><i className="fa-navicon fa" style={naviconstyle}></i></a>
						<div className="navbar-header">
							<a className="navbar-brand" href="#">
								{this.data.currentUser ?
								"José Chávez ": "José Chávez"}
							</a>
						</div>
					</div>
				</nav>
			</div>
		);
	}
});
