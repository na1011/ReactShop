import React from 'react';
import { StudentListProps } from '../types/myType';

const StudentList: React.FC<StudentListProps> = ({ list, removeStudent }) => {
    return (
        <div>
            {list.length > 0 ? (
                list.map((student) => (
                    <div key={student.id}>
                        <span>{student.name}</span>
                        <button type={'button'} onClick={(): void => removeStudent(student.id)}>
                            {'삭제'}
                        </button>
                    </div>
                ))
            ) : (
                <div>{'목록이 없습니다.'}</div>
            )}
        </div>
    );
};

export default StudentList;
