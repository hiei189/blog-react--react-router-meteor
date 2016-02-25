if (Meteor.isClient) {

	const {
    Router,
    Route,
    IndexRoute,
    Link,
    history,
    BrowserHistory
  } = ReactRouter;

  const browserHistory = ReactRouter.history.useQueries(ReactRouter.history.createHistory)();

  //Meteor.subscribe("personalization",function(value){});

  Meteor.subscribe("posts",function(){});

  //Meteor.subscribe("getTheme");
  Meteor.startup(function () {
    //React.render(<HomePage />, document.getElementById("render-target")); //App.jsx
    //Routes;
    React.render((
		<Router history={browserHistory}>
			<Route path="/" component={HomePage}>
				<IndexRoute component = {ShowPostsPage}></IndexRoute>
				<Route path="/blog/(:userId)" component={ShowPostsPage} />
				<Route path="personalize" component={ShowPersonalizationPage} />
				<Route path="createpost" component={ShowCreatePostPage} />
        <Route path="profile" component={ShowProfilePage} />
				<Route path="/about" component={ShowAboutPage} />
				<Route path="/about/(:userId)" component={ShowAboutPage} />
			</Route>
		</Router>
		), document.getElementById("render-target"));
  });
}
