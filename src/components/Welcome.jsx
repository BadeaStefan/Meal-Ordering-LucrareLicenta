import { Link } from 'react-router-dom';
export default function Welcome() {
    return (
        <div className="welcome-div">
            
            <h1>Welcome to our restaurant !</h1>
            <p>The best food in town !</p>
            <Link to="/auth" className="link-mode">Go to login</Link>
        </div>
    );

}