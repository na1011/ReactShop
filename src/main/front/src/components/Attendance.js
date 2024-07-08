import React, {useReducer, useRef} from 'react';
import StudentList from "./StudentList";

function Attendance(props) {

    /**
     * @param info 는 useReducer 훅에서 설정한 State 임.
     * @param action 은 dispatch (요구) 함수를 실행할 때 안에 전달되는 요구사항 내용임
     */
    const myReducer = (info, action) => {
        switch (action.type) {
            case 'add-student':
                const newStudent = {
                    id: Date.now(),
                    name: action.payload,
                    isHere: false
                }
                return {
                    count: info.count + 1,
                    students: [...info.students, newStudent]
                };
            case 'remove-student':
                return {
                    count: info.count - 1,
                    students: info.students.filter((student) => student.id !== action.payload),
                }
            default:
                return info;
        }
    };

    const initialState = {
        count: 0,
        students: []
    }

    const inputRef = useRef('');
    const [info, dispatch] = useReducer(myReducer, initialState);

    const addStudent = (value) => {
        if (value.trim() !== '') {
            dispatch({
                type: 'add-student', payload: value
            });
            inputRef.current.value = '';
            inputRef.current.focus();
        }
    }

    const removeStudent = (id) => {
        dispatch({
            type: 'remove-student', payload: id
        })
    }

    return (
        <div>
            <h1>출석부</h1>
            <p>총 학생 수 : {info.count}</p>
            <input type={"text"}
                   ref={inputRef}
                   placeholder={"이름을 입력해주세요."}/>
            <button onClick={() => addStudent(inputRef.current.value)}>추가</button>
            <StudentList list={info.students} removeStudent={removeStudent}/>
        </div>
    );
}

export default Attendance;