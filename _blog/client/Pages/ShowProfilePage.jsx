ShowProfilePage = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData(){

		return{
			currentUser: Meteor.user(),
		}
	},

	handleUpdateProfile(){
		var nameProfile = React.findDOMNode(this.refs.nameProfile).value.trim();
		var usernameProfile = React.findDOMNode(this.refs.usernameProfile).value.trim();
		var descriptionProfile = React.findDOMNode(this.refs.descriptionProfile).value.trim();
		var ageProfile = React.findDOMNode(this.refs.ageProfile).value.trim();
		Meteor.call('updateProfile',nameProfile,usernameProfile,ageProfile,descriptionProfile);
	},

	render(){
		var default_name ="";

		if (this.data.currentUser.profile){
			var default_name = this.data.currentUser.profile.name;
			var default_username = this.data.currentUser.profile.username;
			var default_age= this.data.currentUser.profile.age;
			var default_description= this.data.currentUser.profile.description;
		}

		var readOnly = Session.get('loggedWith') === 'facebook' ? true:false;
		return (
			<div className="row">
				<div className="col-xs-offset-2 col-xs-8 col-md-offset-2 col-md-8">
					<div className="page-header"><h1>Actualizar perfil<small></small></h1></div>
					<form role="form">
						<div className="row">
							<div className="form-group">
								<label className="col-xs-12">Nombre y Apellido:
									<input type="text" ref="nameProfile" defaultValue={default_name} className="form-control" placeholder = "Ingresa tu nombre" readOnly = {readOnly}/>
								</label>
							</div>
						</div>
					  	<div className="row">
							<div className="form-group">
								<label className="col-xs-12">Username:
									<input type="text" ref="usernameProfile" defaultValue={default_username} className="form-control" placeholder = "Ingresa tu usuario"/>
								</label>
							</div>
						</div>
						<div className="row">
							<div className="form-group">
								<label className="col-xs-12">Edad:
									<input type="number" ref="ageProfile"  defaultValue={default_age} className="form-control"/>
								</label>
							</div>
						</div>
						<div className="row">
					  		<div className="form-group">
								<label className="col-xs-12">Descripción:
									<textarea type="text" rows="7" ref="descriptionProfile" defaultValue={default_description} className="form-control" placeholder = "Ingresa una descripción de tu blog" />
								</label>
							</div>
						</div>
					   	<button onClick={this.handleUpdateProfile} type="submit" className="btn btn-default">Guardar!</button>
					</form>
				</div>
			</div>

		);
	}
});
