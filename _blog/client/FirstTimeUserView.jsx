FirstTimeUserView = React.createClass({


getInitialState(){
	return{
		newAccount:false
	}
},


handleLoginPassword(){
	Meteor.loginWithPassword(this.refs.usernameLogin.value, this.refs.passwordLogin.value, function(value){
		Session.set('loggedWith',"password");
	} );
},

handleLoginFacebook(){
	Meteor.loginWithFacebook(function(err){
		Session.set('loggedWith',"facebook");
		Meteor.call('updateWithFacebook');
		//alert("logged with facebook");
		//Meteor.call('updateProfile',Meteor.userId(),usernameProfile,ageProfile,descriptionProfile);
	});

},

handleNewAccount(){

	var isEmailValid = function(address) {
	  return /^[A-Z0-9'.1234z_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(address);
	};


	options = {
		email: React.findDOMNode(this.refs.emailSignup).value,
		password: React.findDOMNode(this.refs.passwordSignup).value
	};

	Accounts.createUser(options,function(error){
		if(error){
			console.log(error);
		}
		else{
			Session.set('loggedWith',"password");
		}
	});

},

toggleNewAccount(){
	this.setState({
		newAccount: !this.state.newAccount
	})
},

render(){
	Session.set('toggleSidebar',true);
	return(

		<div className="top-content">
            <div className="inner-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3 form-box">
							{this.state.newAccount?(
								<div>
		                        	<div className="form-top">
		                        		<div className="form-top-left">
		                        			<h3>Create a new account</h3>
		                            		<p>Complete the fields to create an account</p>
		                        		</div>
		                        		<div className="form-top-right">
		                        			<i className="fa fa-lock"></i>
		                        		</div>
		                            </div>
		                            <div className="form-bottom">
					                    <form role="form" action="" method="post" className="signup-form">
					                    	<div className="form-group">
					                    		<label className="sr-only" for="form-username">emailSignup</label>
					                        	<input type="text" ref="emailSignup" id="signup-email" name="emailSignup" className="form-control" placeholder ="Insert your email"/>
					                        </div>
					                        <div className="form-group">
					                        	<label className="sr-only" for="form-password">Password</label>
					                        		<input type="password" ref = "passwordSignup" id="signup-password" name="password" className="form-control" placeholder="insert your password"/>
					                        </div>
					                        <div className="form-group">
					                        	<label className="sr-only" for="form-password">Passwordagain</label>
					                        		<input type="password" ref = "passwordSignuprep" id="signup-password-rep" name="password-rep" className="form-control" placeholder="insert your password again"/>
					                        </div>

					                        <a href="#" id="btn-login" className="btn btn-primary btn-lg btn-block" onClick = {this.handleNewAccount}>Signup!</a>
					                    </form>

				                    </div>
				                    <a href="#" className="" onClick = {this.toggleNewAccount} >Old? Sign in!</a>

				                </div>
								):(
				                <div>
									<div className="form-top">
		                        		<div className="form-top-left">
		                        			<h3>Login!</h3>
		                            		<p>Enter your username and password to log on:</p>
		                        		</div>
		                        		<div className="form-top-right">
		                        			<i className="fa fa-lock"></i>
		                        		</div>
		                            </div>
		                            <div className="form-bottom">
					                    <form role="form" action="" method="post" className="login-form">
					                    	<div className="form-group">
					                    		<label className="sr-only" for="form-username">Username</label>
					                        	<input type="text" ref="usernameLogin" id="login-username" name="username" className="form-control" placeholder ="Usuario"/>
					                        </div>
					                        <div className="form-group">
					                        	<label className="sr-only" for="form-password">Password</label>
					                        		<input type="password" ref = "passwordLogin" id="login-password" name="password" className="form-control" placeholder="password"/>
					                        </div>
					                        <a href="#" id="btn-login" className="btn btn-primary btn-lg btn-block" onClick = {this.handleLoginPassword}>Login</a>
					                    </form>
				                    </div>

				                     <a href="#" className="" onClick = {this.toggleNewAccount} >New? Create an account</a>
				                </div>
						        )}

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3 social-login">
                        	<h4>...or login with:</h4>
                        	<div className="social-login-buttons">
	                        	<a href="#" id="btn-fblogin" className="btn btn-facebook" onClick = {this.handleLoginFacebook} >
	                        		<i className="fa fa-facebook-official fa-2x"></i> Facebook
	                        	</a>
	                        	<a className="btn btn-link-2" href="#">
	                        		<i className="fa fa-twitter fa-2x"></i> Twitter
	                        	</a>
	                        	<a className="btn btn-link-2" href="#">
	                        		<i className="fa fa-google-plus fa-2x"></i> Google Plus
	                        	</a>
                        	</div>
                        </div>
                    </div>
                </div>
            </div>
		</div>


	)

}

});
