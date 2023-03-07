import { Table } from 'react-bootstrap';
import FilmRow from './FilmRow';
import * as funcF from './filmFunctions';

function FilmTable(props) {
    
    return <>
        <Table responsive="md"  >
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Favorite</th>
                    <th>Date of Watching</th>
                    <th>Rating</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {/* map for all films in filteringFilms */}
                {props.films.map((film) => <FilmRow filter={props.filter} film={film} setMode={props.setMode} removeFilm={props.removeFilm} editFilm={props.editFilm} editFavoriteFilm={props.editFavoriteFilm}/>)}
            </tbody>

        </Table></>;
}

export default FilmTable;