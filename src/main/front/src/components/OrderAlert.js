import React, {useEffect, useState} from 'react';

function OrderAlert({message}) {
    const [count, setCount] = useState(5);

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(()=> {
                setCount(count - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [count])

    return count > 0 ? (
        <div className={"alert alert-warning"}>
            <p>5초 이내 구매시 할인</p>
            <p>{count}</p>
        </div>
    ) : null;
}

export default OrderAlert;