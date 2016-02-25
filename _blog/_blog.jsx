Posts = new Mongo.Collection("posts"); //Definir la coleccion
Personalization = new Mongo.Collection("personalization"); //Definir la coleccion
Comments = new Mongo.Collection("comments");

momentLocated = moment.locale('es');


Meteor.methods({

  	addPost(titlePost,textPost,tags) {
	    // Make sure the user is logged in before inserting a task
	    if (! Meteor.userId()) {
	    	throw new Meteor.Error("not-authorized");
	    }
	    Posts.insert({
  	    titlePost: titlePost,
  			textPost: textPost,
  			createdAt: new Date(),
        new: true,
  			owner: Meteor.userId(),
        tags: tags
	    	});
  	},

  	removePost(postId) {
    	Posts.remove(postId);
  	},

    addThemeColor(value){
      if (Meteor.userId()) {
        const personalization = Personalization.findOne({owner: Meteor.userId()});
        if(personalization){
          Personalization.update({owner: Meteor.userId()},{$set:{themeColor:value}});
        }
      }
    },
    addNewUserConfigs(owner){
      Personalization.insert({
              themeColor: "#000",
              themeTextColor: "#eee",
              owner: owner
          });
    },
    addThemeTextColor(value){
      if (Meteor.userId()) {
        const personalization = Personalization.findOne({owner: Meteor.userId()});
        if(personalization){
          Personalization.update({owner: Meteor.userId()},{$set:{themeTextColor:value}});
        }
      }
    },

    PostNotNewAnymore(PostId){
      Posts.update({_id: PostId}, { $set: { new: false} });
    },

    removeAllUsers() {
        return Meteor.users.remove({});
      },

    removeAllPersonalization() {
        return Personalization.remove({});
      },

    addComment(postId,comment) {
      Comments.insert({
              postowner: postId,
              owner: Meteor.userId(),
              comment: comment,
              createdAt: new Date(),
          });
    },


    removeAllComment() {
      Comments.remove({});
    },

    updateWithFacebook(){
      console.log('updateWithFacebook');
      try{
        token = Meteor.user().services.facebook.accessToken;
        console.log(Meteor.user().services.facebook);
        HTTP.call('GET',
        'https://graph.facebook.com/v2.5/me?fields=picture.type(large),name&access_token='+token,
        (error,result)=>{
          console.log(result);
          try{
            Meteor.users.update({_id: Meteor.userId()},{
              $set:{
              "profile.name":result.data.name,
              "profile.picture":result.data.picture.data.url,
              }
            });
          }
          catch(e){
            console.log(e);
          }
        });
      }catch(e){
        console.log(e);
      }
    },

    updateProfile(name="",username="",edad="",description="") {
      try{
        Meteor.users.update(Meteor.userId(),{
          $set:{
          "profile.name":name,
          "profile.username":username,
          "profile.age":edad,
          "profile.description":description
          }
        });
      }
      catch(e){
        console.log(e);
      }
    },

    removeUser(userId){
      return Meteor.users.remove(userId);
    }
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
