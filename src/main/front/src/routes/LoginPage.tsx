import React, { useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import usePostRequest from '../hooks/usePostRequest';
import { User } from '../types/myType';
import { useSetRecoilState } from 'recoil';
import { LoginAtom } from '../atoms/LoginAtom';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const idRef = useRef<HTMLInputElement | null>(null);
    const pwdRef = useRef<HTMLInputElement | null>(null);
    const [rememberMe, setRememberMe] = useState(false);

    const setLoginState = useSetRecoilState(LoginAtom);
    const navigate = useNavigate();

    const location = useLocation();
    const from = location?.state?.redirectedFrom?.pathname || '/';

    const { postData, postError, resetState, postApi } = usePostRequest<User>(null);

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        const { current: id } = idRef;
        const { current: pwd } = pwdRef;

        if (!id || id.value.trim() === '' || !pwd || pwd.value.trim() === '') {
            return;
        }
        resetState();

        const postLogin = {
            id: id.value,
            password: pwd.value
        };
        postApi('/login', postLogin);
    };

    if (postError) {
        alert(postError);
    }

    if (postData) {
        setLoginState(postData);
        alert(postData.id + '님 환영합니다!');
        navigate(from);
    }

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Row className="w-100">
                <Col md={{ span: 6, offset: 3 }}>
                    <h1 className="text-center mb-4">로그인</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail" className="mb-3">
                            <Form.Label>아이디</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="아이디를 입력하세요"
                                ref={idRef}
                                required
                                size="lg"
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mb-3">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                                ref={pwdRef}
                                required
                                size="lg"
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox" className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="아이디 저장"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100" size="lg">
                            로그인
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
