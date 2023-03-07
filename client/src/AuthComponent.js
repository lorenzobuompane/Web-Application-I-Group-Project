import { useState } from 'react';
import { Form, Button, Alert, Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from './API'

function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await API.postLogin(username, password);
        if (response.error !== undefined) {
            setErrMsg(response.error)
            props.setUserLogged(() => '');
        } else {
            props.setUserLogged(() => response.name);
            navigate('/');
        }

    };

    return (
        <Card border="primary"  className="md-5 mt-5 mx-auto" style={{ width: '28rem'}}>
        <Card.Header className="text-center"><h2>FilmLibrary</h2></Card.Header>
        <Card.Body>
          <Card.Title>Login</Card.Title>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='username'>
                <Form.Label>email</Form.Label>
                <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} required={true} />
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true} minLength={6} />
            </Form.Group>

            <Button type="submit">Login</Button>
            {errMsg && <Alert variant='danger'>{errMsg}</Alert>}
        </Form>
        </Card.Body>
  </Card>
    )
};

export { LoginForm }