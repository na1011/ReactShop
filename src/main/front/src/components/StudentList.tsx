import React from 'react';

function StudentList({list, removeStudent}) {
    return (
        <div>
            {list.length > 0 ? list.map((student) => (
                <div key={student.id}>
                    <span>{student.name}</span>
                    <button onClick={() => removeStudent(student.id)}>삭제</button>
                </div>
            )) : <div>목록이 없습니다.</div>}
        </div>
    )
}

export default StudentList;