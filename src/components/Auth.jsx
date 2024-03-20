import { Form, Link, useSearchParams, useActionData } from 'react-router-dom';
import Button from './UI/Button';
export default function Auth() {
    const data = useActionData();

    const [searchParams, setSearchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';

    if (searchParams.get('mode') !== 'login' && searchParams.get('mode') !== 'signup') {
        setSearchParams({ isLogin: 'login' });
    }


    return (
        <>
            <Form method="post" className="login-page">

                <div className="form">
                    {data && data.errors && <ul>{Object.values(data.errors).map(err => <li key={err}>{err}</li>)}</ul>}
                    {data && data.message && <p>{data.message}</p>}
                    < div className="login-form">
                        <input id="email" type="email" name="email" placeholder="email address" />
                        <input id="password" type="password" name="password" placeholder="password" />
                        {isLogin && <div>
                            <Button>Log in</Button>
                            <p className="message">Not registered?</p>
                            <Link to={`?mode=${'signup'}`} className="link-mode">Register now!</Link>
                        </div>}
                        {!isLogin && <div>
                            <Button>Create new user</Button>
                            <p className="message">Already registered?</p>
                            <Link to={`?mode=${'login'}`} className="link-mode">Log in</Link>
                        </div>}
                     </div>
                </div>

            </Form>
        </>

    )
}