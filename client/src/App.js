import { Navbar, Nav, Form, FormControl, Container, Row, Col, Button, Alert, Dropdown } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Outlet, useNavigate, Link, useLocation, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from 'react';
import LeftSideBar from './LeftSideBar';
import FilmTable from './FilmTable';
import AddEditForm from './AddEditForm';
import { LoginForm } from './AuthComponent';
import API from './API'

function App() {
  /* use for open left sidebar in mobile version */
  const [open, setOpen] = useState(false);

  /* store all films */
  const [films, setFilms] = useState([]);

  /* if user is logged the state contains his name, '' otherwise */
  const [userLogged, setUserLogged] = useState('');


  /**
   * add new film 
   * @param {Film} newFilm film to be added
   */
  const addFilm = async (newFilm, filter) => {
    await API.postFilm(newFilm);
    let list;
    if (filter === "") {
      list = await API.getFilms(filter);
    } else {
      list = await API.filteringFilms(filter);
    }
    setFilms(() => list);
  }
  /**
   * edit a film
   * @param {Film} filmToEdit film to be edited
   */
  const editFilm = async (filmToEdit, filter) => {
    await API.putFilm(filmToEdit);
    let list;
    if (filter === "") {
      list = await API.getFilms(filter);
    } else {
      list = await API.filteringFilms(filter);
    }
    setFilms(() => list);
  }

  /**
 * edit favorite of a film
 * @param {Film} filmToEdit film to be edited
 */
  const editFavoriteFilm = async (id, filter) => {
    await API.putFavoriteFilm(id);
    let list;
    if (filter === "") {
      list = await API.getFilms(filter);
    } else {
      list = await API.filteringFilms(filter);
    }
    setFilms(() => list);
  }

  /**
   * remove a film
   * @param {Film} removeId film to be removed
   */
  const removeFilm = async (removeId, filter) => {
    await API.deleteFilm(removeId);
    let list;
    if (filter === "") {
      list = await API.getFilms(filter);
    } else {
      list = await API.filteringFilms(filter);
    }
    setFilms(() => list);
  }

  const handleLogout = async () => {
    await API.postLogout();
    setUserLogged(()=>'');
    setFilms([]);
  }

  /* filter list */
  const filters = ['', 'favorites', 'bestRated', 'seenLastMonth', 'unseen'];

  return (
    <BrowserRouter>
      <Routes>

        {userLogged !== '' ?
          /* USER IS LOGGED -> FILM LIST */
          <Route element={<AppLayout setOpen={setOpen} open={open} handleLogout={handleLogout} />}>

            {/* filter route */}
            {filters.map((f) =>
              <Route path={'/'.concat(f.toString())} element={
                <ViewPage films={films} setFilms={setFilms} removeFilm={removeFilm} editFilm={editFilm} setOpen={setOpen} open={open} editFavoriteFilm={editFavoriteFilm} userLogged={userLogged} />
              } />
            )}

            {/* add route */}
            <Route path='/add' element={<AddEditPage films={films} addOrEditFilms={addFilm} />} ></Route>

            {/* edit route */}
            <Route path='/edit/:id' element={<AddEditPage films={films} addOrEditFilms={editFilm} />} ></Route>

            {/* error route */}
            <Route path='*' element={
              <Alert key='danger' variant='danger' align='center'>
                <Alert.Heading>Page not found</Alert.Heading>
                <hr />
              </Alert>
            } />

          </Route>

          :
          /* USER ISN'T LOGGED -> REDIRECT TO LOGIN */
          <Route>
            <Route path='*' element={
              <Navigate replace to='/login' />
            } />

            <Route path='/login' element={
              <LoginForm setUserLogged={setUserLogged}></LoginForm>
            } />
          </Route>
        }


      </Routes>
    </BrowserRouter>
  );
}

/**
 * left sidebar: contain site-logo, site-name, searchbox, user-icon, button for collapsing 
 * @param {*} props 
 * @returns NavigationBar
 */
function NavigationBar(props) {
  return <>
    <Navbar bg="primary" variant="dark" expand='md' sticky="top" className='navbar-padding'>

      {/* button for collapsing */}
      <Navbar.Toggle type="button" data-bs-toggle="collapse" data-bs-target="#left-sidebar"
        aria-controls="left-sidebar" aria-expanded="false" aria-label="Toggle sidebar" onClick={() => props.setOpen(!props.open)} />

      {/* site logo and name */}
      <Navbar.Brand as={Link} to='/'>
        <span className='mx-2'>
          <svg className='mx-2' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-film" viewBox="0 0 16 16">
            <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
          </svg>
        </span>
        FilmLibrary
      </Navbar.Brand>

      {/* user-icon */}
      <Nav className="ms-md-auto order-md-2">
        {/* <Nav.Link href="#">
          <svg className='bi bi-people-circle' width="30" height="30" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z" />
            <path fill-rule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
            <path fill-rule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clip-rule="evenodd" />
          </svg>
        </Nav.Link> */}
        <Dropdown>
          <Dropdown.Toggle className='bg-transparent' id="dropdown-basic">
            <svg className='bi bi-people-circle' width="30" height="30" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z" />
              <path fill-rule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              <path fill-rule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clip-rule="evenodd" />
            </svg>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={props.handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>

      {/* searchbox */}
      <Navbar.Collapse id="responsive-navbar-nav" className='order-md-1'>
        <Form className="form-inline my-2 my-lg-0 mx-auto ">
          <FormControl
            type="search"
            placeholder="Search"
            className="form-control me-md-2"
            aria-label="Search"
          />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  </>
}

/**
 * prepare page layout 
 * @param {*} props 
 * @returns AppLayout 
 */
function AppLayout(props) {
  return <>
    <NavigationBar setOpen={props.setOpen} open={props.open} handleLogout={props.handleLogout} />
    <Container fluid>
      <Row className='vheight-100'>
        <Outlet />
      </Row>
    </Container>
  </>
}

/**
 * render left sidebar, film table, button for navigation to add page
 * @param {*} props 
 * @returns ViewPage
 */
function ViewPage(props) {
  const navigate = useNavigate();
  const location = useLocation();

  /* import filter from URL */
  let filter = (location.pathname.split('/'))[1];
  /* map for traduction filter-alias to filter-name */
  let filtersNames = { "": "All", "favorites": "Favorites", "bestRated": "Best Rated", "seenLastMonth": "Seen Last Month", "unseen": "Unseen" };

  /**
  * load list of film with filter
  */
  useEffect(() => {
    async function load() {
      let list;
      if (filter === "") {
        list = await API.getFilms(filter);
      } else {
        list = await API.filteringFilms(filter);
      }
      props.setFilms(() => list);
      //setLoading(()=>false);
    }
    load();
  }, [filter]);


  return <>
    {/* left sidebar */}
    <LeftSideBar open={props.open} ></LeftSideBar>
    
    <Col as='main' className='col-md-9 col-12 below-nav'>
    <Alert variant='primary' ><h2>Welcome {props.userLogged}</h2></Alert>
      {/* filter-name */}
      <h1 class="mb-2" id="filter-title">{filtersNames[filter]}</h1>
      {/* film table */}
      <FilmTable films={props.films} filter={filter} removeFilm={props.removeFilm} editFilm={props.editFilm} editFavoriteFilm={props.editFavoriteFilm}></FilmTable>
      {/* button for navigation to add page */}
      <Button className='btn btn-lg btn-primary fixed-right-bottom' onClick={() => { navigate('/add', { state: filter }) }}> &#43; </Button>

    </Col>
  </>
}

/**
 * form for adding or editing film 
 * @param {*} props 
 * @returns AddEditPage
 */
function AddEditPage(props) {
  /* import mode from URL */
  const location = useLocation();
  let mode = (location.pathname.split('/'))[1]; /* add or edit */

  return <>
    <AddEditForm films={props.films} mode={mode} addOrEditFilms={props.addOrEditFilms}> </AddEditForm>
  </>
}

export default App;
