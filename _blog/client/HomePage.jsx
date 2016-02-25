HomePage = React.createClass({
	mixins: [ReactMeteorData],

	getInitialState(){
		return {
			themeColor: "none",
			themeTextColor: "none"
		}
	},

	getMeteorData() {
	    //GLOBAL VARIABLE
	    currentViewedPageId = this.props.params.userId? this.props.params.userId:(Meteor.userId()?Meteor.userId():false);
			
			Session.set('currentViewedPageId',currentViewedPageId);
	    theme = Personalization.findOne({owner: currentViewedPageId});

	    //THEME HAS THE GLOBAL THEME OF THE CURRENT PAGE
	    Meteor.subscribe("getTheme", currentViewedPageId);
	    if(theme){
	    	/*PubSub.publish('theme',theme.themeColor);*/
	    	return {
	        currentUser: Meteor.user(),
	        themeColor: theme.themeColor,
	        themeTextColor: theme.themeTextColor,
	        toggled: Session.get('toggleSidebar')
	    	};
    	}else{
    		return {
	        currentUser: Meteor.user(),
	        themeColor: this.data.themeColor,
	        themeTextColor: this.data.themeTextColor,
	        toggled: Session.get('toggleSidebar')
	    	}
    	}
  	},

  	getDefaultProps() {
	    return {
	      	showUser: Meteor.userId()
	    };
  	},
  	componentWillMount (){

		this.data.themeColor="none";
	  	this.data.themeTextColor="none";
	  	return;
  	},

	componentDidMount(){

		return;
	},

	componentDidUpdate(){
		$(".sidebar-nav li a").css('color',this.data.themeTextColor);
	},

  	componentWillUnmount: function() {
    // React removed me from the DOM, I have to unsubscribe from the pubsub using my token

    	return;
  	},

	render(){

		const classToggled = classNames({
			toggled:this.data.toggled
			});




		return (
			<div>
				{Meteor.userId()?(
				this.data.themeColor&&this.data.themeTextColor!=='none'?(
				<div>
					<NavbarInstance background = {this.data.themeColor}/>
					<div id="wrapper" className = {classToggled}>
						<Sidebar background = {this.data.themeColor} />
						{this.props.children}
					</div>


				</div>):null):<FirstTimeUserView />}
			</div>
			);
	}

});
