var ReactTransitionGroup = React.addons.CSSTransitionGroup;

Test = React.createClass({
  getInitialState: function() {
    return { mounted: false };
  },
  componentDidMount: function() {
    this.setState({ mounted: true });
  },
  render: function() {
    var child = this.state.mounted ?
      <h1>Hello worldasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdsadasdasdas</h1> :
      null;

    return (
      <ReactTransitionGroup transitionName="example" className>
        {child}
        <ul className="nav navbar-nav navbar-right navbar-height">            
              <li> <AccountsUIWrapper /></li>
            </ul>
      </ReactTransitionGroup>

    );
  }
});
