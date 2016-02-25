

ShowAboutPage = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState: function() {
    return {
      gotUserInfo: false
    };
  },

  getMeteorData: function(){
    this.currentPage = Session.get('currentViewedPageId');
    var handle = Meteor.subscribe('getUsersById',this.currentPage);
    var data = {};
    if(handle.ready()){
      data.currentUser = Meteor.users.findOne({_id:this.currentPage});
    }
    return data;
  },

  componentWillMount: function() {
  },
  img: function(){
    return (

        <img id="profilePicAbout" src={this.data.currentUser.profile.picture} width='100px'/>
      );
  },
  name: function(){
    return(
        <h1>{this.data.currentUser.profile.name}</h1>
    )
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-xs-7 col-xs-offset-2">
          <div className = "page-header">
            <div className="container-fluid">
              <div className="row">
                <div className= "col-xs-2">
                  {this.data.currentUser?this.img():null}
                </div>
                <div className="col-xs-10">
                  {this.data.currentUser?this.name():null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});
