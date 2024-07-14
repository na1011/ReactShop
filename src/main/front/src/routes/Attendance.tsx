import React, { useReducer, useRef } from 'react';
import StudentList from '../components/StudentList';
import { Student, StudentAction, StudentInfo } from '../types/myType';

const Attendance: React.FC = () => {
    /**
     * @param info 는 useReducer 훅에서 설정한 State 임.
     * @param action 은 dispatch (요구) 함수를 실행할 때 안에 전달되는 요구사항 내용임
     */
    const myReducer = (info: StudentInfo, action: StudentAction): StudentInfo => {
        switch (action.type) {
            case 'ADD-STUDENT': {
                const newStudent: Student = {
                    id: Date.now(),
                    name: action.payload,
                    isHere: false
                };
                return {
                    count: info.count + 1,
                    students: [...info.students, newStudent]
                };
            }
            case 'REMOVE-STUDENT':
                return {
                    count: info.count - 1,
                    students: info.students.filter((student) => student.id !== action.payload)
                };
            default:
                return info;
        }
    };

    const initialState: StudentInfo = {
        count: 0,
        students: []
    };

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [info, dispatch] = useReducer(myReducer, initialState);

    const addStudent = (): void => {
        const { current } = inputRef;

        if (current && current.value.trim() !== '') {
            const { value } = current;
            dispatch({
                type: 'ADD-STUDENT',
                payload: value
            });
            current.value = '';
            current.focus();
        }
    };

    const removeStudent = (id: number): void => {
        dispatch({
            type: 'REMOVE-STUDENT',
            payload: id
        });
    };

    return (
        <div>
            <h1>{'출석부'}</h1>
            <p>
                {'총 학생 수 : '}
                {info.count}
            </p>
            <input type={'text'} ref={inputRef} placeholder={'이름을 입력해주세요.'} />
            <button type={'button'} onClick={addStudent}>
                {'추가'}
            </button>
            <StudentList list={info.students} removeStudent={removeStudent} />
        </div>
    );
};

export default Attendance;
