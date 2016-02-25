ShowPersonalizationPage = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
        return {
            currentUser: Meteor.user()
        };
    },
	handleColorTxChange(color){
		//$(".sidebar-nav li a").css("color",color);
		Meteor.call("addThemeTextColor",color);
	},
	handleColorBgChange(color){
		Meteor.call("addThemeColor",color);
		return;
	},
	render(){
		
		return (
			<div className="row">
				<div className="col-xs-offset-2 col-xs-8 col-md-offset-2 col-md-8">
					<div className="page-header"><h1>Personalización</h1></div>
					<div className="page-header"><h3>Color del tema <small>Elige un color para las barra de navegación y otras partes</small></h3>
						<div className="Colors-choice">
							<ColorSquare CallBackParent = {this.handleColorBgChange} background = "#337ab7"/>
							<ColorSquare CallBackParent = {this.handleColorBgChange} background = "#5cb85c"/>
							<ColorSquare CallBackParent = {this.handleColorBgChange} background = "#5bc0de"/>
							<ColorSquare CallBackParent = {this.handleColorBgChange} background = "#f0ad4e"/>
							<ColorSquare CallBackParent = {this.handleColorBgChange} background = "#d9534f"/>
							<ColorSquare CallBackParent = {this.handleColorBgChange} background = "#000"/>
						</div>
					</div>
					<div className="page-header"><h3>Color de texto <small>Elige un color para el texto</small></h3>
						<div className="Colors-choice">
							<ColorSquare  CallBackParent = {this.handleColorTxChange} background = "#222222"/>
							<ColorSquare  CallBackParent = {this.handleColorTxChange} background = "#333333"/>
							<ColorSquare  CallBackParent = {this.handleColorTxChange} background = "#555555"/>
							<ColorSquare  CallBackParent = {this.handleColorTxChange} background = "#777777"/>
							<ColorSquare  CallBackParent = {this.handleColorTxChange} background = "#999999"/>
							<ColorSquare  CallBackParent = {this.handleColorTxChange} background = "#BBBBBB"/>
						</div>
					</div>
				</div>
			</div>
			);
	}
});