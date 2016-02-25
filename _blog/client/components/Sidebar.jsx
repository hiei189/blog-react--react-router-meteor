const {Link} = ReactRouter;
Sidebar = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return{
         currentUser: Meteor.user()
        };

    },

    getInitialState() {
        //React.render(<PostsPage />, document.getElementById("wrapper")); //App.jsx
        return {

        };
    },
    componentWillMount(){

    },
    componentDidMount(){
        //$(".sidebar-nav li a").css("color",this.state.styleTex); //NECESARIO PARA COLOR INICIAL
    },

    logout(){
        Meteor.logout();
    },

    render(){
        const currentUserId = this.data.currentUser && this.data.currentUser._id;
        this.style = {
            background: this.props.background
        };
        return (
            <div id="sidebar-wrapper" style={this.style}>
                <ul className="sidebar-nav">
                    <li className="sidebar-brand">
                        <a href="#">
                            Menú
                        </a>
                    </li>

                    <li>
                        <Link to="/">Inicio</Link>
                    </li>

                    {currentUserId ?
                    (<li>
                        <Link to="/createpost">Crear Post</Link>
                    </li>):""}

                    {currentUserId ?
                    <li>
                        <Link to="/personalize">Personalizar</Link>
                    </li>:""}

                    <li>
                        <Link to="/profile/">Perfil</Link>
                    </li>
                    <li>
                        <Link to="/about/">Acerca de</Link>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#">Services</a>
                    </li>
                    {currentUserId ?
                    <li>
                        <Link to = '/' onClick = {this.logout}>Cerrar sesión</Link>
                    </li>:''}
                </ul>
            </div>
            );
        }
});
