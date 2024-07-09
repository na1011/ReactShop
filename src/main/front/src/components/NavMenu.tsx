import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavMenu: React.FC = () => {
    return (
        <Navbar bg={'dark'} variant={'dark'}>
            <Container>
                <Navbar.Brand as={Link} to={'/'}>
                    {'ReactShop'}
                </Navbar.Brand>
                <Nav className={'me-auto'}>
                    <Nav.Link as={Link} to={'/'}>
                        {'Home'}
                    </Nav.Link>
                    <Nav.Link as={Link} to={'/cart'}>
                        {'Cart'}
                    </Nav.Link>
                    <Nav.Link as={Link} to={'/attendance'}>
                        {'Attendance'}
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavMenu;
