import { Col, ListGroup, Collapse } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


function LeftSideBar(props) {

    return <>
        {/* collapse sidebar */}
        <Collapse in={props.open}>
            <Col className=' d-md-block col-md-3 col-12 bg-light below-nav '>
                {/* filter list */}
                <ListGroup variant='flush' defaultActiveKey="#All" >

                    <ListGroup.Item as={NavLink} to='/' id="filter-all" className='leftBarItem'>
                        All
                    </ListGroup.Item>

                    <ListGroup.Item as={NavLink} to='/favorites' id="filter-favorites" className='leftBarItem' >
                        Favorites
                    </ListGroup.Item>

                    <ListGroup.Item as={NavLink} to='/bestRated' id="filter-best" className='leftBarItem'>
                        Best Rated
                    </ListGroup.Item>

                    <ListGroup.Item as={NavLink} to='/seenLastMonth' id="filter-seen-last-month" className='leftBarItem'>
                        Seen Last Month
                    </ListGroup.Item>

                    <ListGroup.Item as={NavLink} to='/unseen' id="filter-unseen" className='leftBarItem'>
                        Unseen
                    </ListGroup.Item>

                </ListGroup>
            </Col>
        </Collapse>
    </>;
}

export default LeftSideBar;