import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from '../atoms/LoginAtom';

const NavMenu: React.FC = () => {
    const isLogin: boolean = useRecoilValue(isLoginSelector);

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
                    {isLogin ? (
                        <Nav.Link as={Link} to={'/logout'}>
                            {'Logout'}
                        </Nav.Link>
                    ) : (
                        <Nav.Link as={Link} to={'/login'}>
                            {'Login'}
                        </Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavMenu;
