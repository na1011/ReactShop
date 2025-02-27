import React from 'react';

const TabContent: React.FC<{ tabNum: number }> = ({ tabNum }) => {
    const content = [
        <div>{'버튼1 의 내용'}</div>,
        <div>{'버튼2 의 내용'}</div>,
        <div>{'버튼3 의 내용'}</div>,
        <div>{'버튼4 의 내용'}</div>
    ];

    return content[tabNum];
};

export default TabContent;
