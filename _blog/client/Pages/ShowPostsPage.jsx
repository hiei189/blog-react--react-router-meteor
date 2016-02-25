ShowPostsPage = React.createClass({

  componentWillMount: function() {
    // when React renders me, I subscribe to the topic 'products'
    // .subscribe returns a unique token necessary to unsubscrib

		return ;
  	},
	render:function(){

		var currentPage = Session.get('currentViewedPageId');
    console.log(currentPage);
		return(
				<div id="post-wrapper" className="container-fluid">
					<div className="row">
						<div className="col-xs-offset-2 col-xs-7" id ="post-wrapper">
							<PostsInstance showUser = {currentPage}/>
						</div>
						<div className="col-xs-2">
							<ProfileResume showUser = {currentPage}/>
						</div>
					</div>
				</div>
			);
	}
});
