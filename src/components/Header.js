import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

const Header = (props)=>  {
    const isAuthenticated = useSelector(state => state.isAuthenticated);
    const dispatch = useDispatch();
    return (
        <header>
            <h2>This is Header</h2>
            {isAuthenticated ? (
                <button onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</button>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </header>
    );
}

export default Header;