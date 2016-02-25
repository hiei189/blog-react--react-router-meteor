
Accounts.onCreateUser(function(options, user) {
  //Meteor.call("addNewUserConfigs");
 	Meteor.call("addNewUserConfigs",user._id);
	Meteor.call('updateProfile');
	if (user.services.facebook){
		Meteor.call('updateProfile',user.services.facebook.name);
	}

	if (options.profile) user.profile = options.profile;

	return user;
});