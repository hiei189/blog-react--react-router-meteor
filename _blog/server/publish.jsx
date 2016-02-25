Meteor.publish("personalization", function () {
    return Personalization.find();
  });

Meteor.publish("posts", function () {
    return Posts.find();
  });

Meteor.publish("getTheme", function (userId) {
    return Personalization.find({owner:userId});
  });

Meteor.publish("getCommentsByPostId", function (postId) {
    return Comments.find({postowner:postId});
  });

Meteor.publish("getUsersById", function (userId) {
    console.log('Getting user by id');
    return Meteor.users.find({_id:userId});
  });

Meteor.publish("findPostsByTag", function (tag) {
    return Post.find({tags:tag});
  });
