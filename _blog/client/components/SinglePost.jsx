SinglePost  = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){


		var theme2 = Personalization.findOne({owner: currentViewedPageId});
		Meteor.subscribe("getTheme", currentViewedPageId);


		//console.log(theme2.themeColor);

		if(theme2){
			/*PubSub.publish('theme',theme.themeColor);*/
			return {
				currentUser: Meteor.user(),
				themeColor: theme2.themeColor
			};
		}
		else{
			return{
				currentUser: Meteor.user()
			}
		}

	},

	componentWillMount(){

		/*this.pubsub_token_theme = PubSub.subscribe('theme', function(color){
		console.log("color: " + color);
		this.setState({
		theme:color,
		bgcolor:theme
		});
		}.bind(this));
		*/	},

		componentWillUnmount(){
			/*PubSub.unsubscribe(this.pubsub_token_theme);*/
		},

		getInitialState() {
			this.neededToggleReadmore = this.props.post.textPost.split(' ').length > 200 ? true:false;
			initialstate = this.neededToggleReadmore?false:true;
			return {
				readmore: initialstate,
			};
		},

		toggleReadmore(){
			if (this.neededToggleReadmore){
				this.setState({
					readmore: !this.state.readmore
				});
			}
			return;
		},

		removePost(){
			Meteor.call("removePost",this.props.post._id);
			React.unmountComponentAtNode(document.getElementById("top-target"));
			return;
		},

		handleTag(e){
			var tag = e.target.textContent
			console.log(e.target.textContent);
			console.log(Posts.find({tags:tag}).fetch());
		},

		renderTags(){
			//console.log(this.props.post.tags);

			if(this.props.post.tags) {
				return this.props.post.tags.map((tag)=>{
					//console.log(tag);
					return <span
						className="badge tags"
						style ={{background:this.data.themeColor}}
						onClick={this.handleTag}
						key={tag}>
						{tag}
					</span>
				});
			}
			else{
				return;
			}
		},

		deletePostModal(){
			const deletePostModalContent =  {
				title: "Eliminar",
				text: "¿Estás seguro que deseas eliminar este post?",
				save: "Eliminar",
				close: "Cancelar",
				link: this.removePost
			};
			React.unmountComponentAtNode(document.getElementById("top-target")); //Unmount just in case
			React.render(
				<Modal content = {deletePostModalContent}/>,
				document.getElementById("top-target")
			); //renderizar modal
			$('#Modal-default').modal();
			return;
		},

		rawHtml (rawMark){
			return {__html:rawMark}
		},

		render(){

			const classReadmore = (this.state.readmore? "openedPost divParagraph col-xs-12": "closedPost divParagraph col-xs-12");
			const newPost =  (this.props.new)?"new-post":"";

			if(newPost){
				setTimeout(function() {
					Meteor.call("PostNotNewAnymore",this.props.post._id);
				}.bind(this), 3000);
			}

			return(

				<div className="row">


					<div className="col-xs-12 col-md-12 posts">


						<div className={"post " + newPost}>


							<div className="titlePost col-xs-10">


								<h2>
									{this.props.post.titlePost}
								</h2>


							</div>

							{this.props.showPostButtons?(
								<h3 className="col-xs-2">


									<small>


										<span
											href="#"
											className="postButton glyphicon glyphicon-remove-circle"
											onClick={this.deletePostModal}/>


										<span
											className="postButton glyphicon-pencil glyphicon"
											aria-hidden="true">
										</span>


									</small>


								</h3>
							):''}

							<div className="row">


								<div className="col-xs-12 dateCreated">

									{"Creado " + moment(this.props.post.createdAt).locale('es').calendar()}

								</div>


							</div>


							<div className="row">


								<div
									className={classReadmore}
									onClick ={this.toggleReadmore}>


									<span dangerouslySetInnerHTML={this.rawHtml(this.props.post.textPost)} />



								</div>


							</div>


							<div className="row">


								<div className = "col-xs-12">

									{this.renderTags()}

								</div>


							</div>


							<CommentsComponent postid = {this.props.post._id}/>


						</div>


						<hr/>


					</div>



				</div>
			);
		}
	});
