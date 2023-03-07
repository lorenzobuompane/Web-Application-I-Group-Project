import { useEffect, useState } from 'react';
import { Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { Film } from './filmLibrary';
import * as funcF from './filmFunctions';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import API from './API';

function AddEditForm(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const filter = location.state === null ? '' : location.state;
    /* import film id to edit from URL */
    const { id } = useParams();
    //let editedFilm = new Film();

    /*if (props.mode === "edit") {
        editedFilm = funcF.getFilmById(props.films, Number(id));
    }*/

    const [title, setTitle] = useState('');
    const [favorite, setFavorite] = useState(false);
    const [date, setDate] = useState('');
    const [rating, setRating] = useState('');
    const [operationSuccess, setOperationSuccess] = useState(false);

    useEffect(()=>{
        async function getFilmToEdit(){
            if (props.mode === "edit") {
                const editedFilm = await API.getByIdFilm(id);
                setTitle(()=>editedFilm.title);
                setFavorite(()=>editedFilm.favorite);
                setDate(()=>(editedFilm.dateOfWatching).format('YYYY-MM-DD'));
                setRating(()=>editedFilm.rating);
            }
        }
        getFilmToEdit();
    },[]);

    /**
     * on submit function
     * @param {*} event 
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        /* if add mode needs new id for new film, else, in edit mode, set id of edited film */
        let idSubmitted = props.mode === "edit" ? id : null;
        /* addOrEditFilms could be addFilm or editFilm */
        props.addOrEditFilms(new Film(idSubmitted, title, Boolean(favorite), date, Number(rating)), filter);
        setOperationSuccess(() => (true));
    }

    const successMessageHandler = (par) => {
        let url;
        par === "filter" ? url = '/'.concat(filter.toString()) : url = "/";
        navigate(url);
    }

    return <>
        {operationSuccess === false && <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={title} required={true} placeholder="Enter title" onChange={(event) => { setTitle(event.target.value) }} />
            </Form.Group>
            <Form.Check type='checkbox' checked={favorite} label='Favorite' onChange={(event) => { setFavorite(event.target.checked) }}></Form.Check>
            <Row>
                <Col>
                    <Form.Group className='mb-3'>
                        <Form.Label>Date</Form.Label>
                        <Form.Control type='date' value={date} onChange={(event) => { setDate(event.target.value) }} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="number" value={rating} min={0} max={5} placeholder="Enter rating" onChange={(event) => { setRating(event.target.value) }} />
                    </Form.Group>
                </Col>
            </Row>
            <div align='right'>
                <Button variant='outline-secondary' onClick={() => { navigate('/'.concat(filter.toString())) }}>Cancel</Button>
                <Button type='submit' variant='outline-success'>{props.mode === 'add' ? 'Add' : 'Save'}</Button>
            </div>
        </Form>}
        {/* success message after add/edit film */}
        {operationSuccess === true && <SuccessMessage successMessageHandler={successMessageHandler} operationSuccess={operationSuccess} mode={props.mode} />}
    </>
}

/**
 * success message with button for navigation to current filter or home
 * @param {*} props 
 * @returns 
 */
function SuccessMessage(props) {
    return (
        <>
            <Alert show={props.operationSuccess} variant="success">
                <Alert.Heading>Success!!</Alert.Heading>
                {props.mode === "edit" ? <p>The film was edited correctly!</p> : <p>The film was added correctly!</p>}
                <hr />
                <div className="d-flex justify-content-end">
                    <Button className='mx-2' onClick={() => { props.successMessageHandler("filter") }} variant="outline-success">
                        Back to current filter
                    </Button>
                    <Button className='mx-2' onClick={() => { props.successMessageHandler("") }} variant="outline-success">
                        Back to All
                    </Button>
                </div>
            </Alert>
        </>
    );
}

export default AddEditForm;