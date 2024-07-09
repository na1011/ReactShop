import React, { useEffect, useState } from 'react';

const OrderAlert: React.FC = () => {
    const [count, setCount] = useState<number>(5);

    /**
     * (): void - 이 표현은 함수가 아무 것도 반환하지 않는다는 것을 의미
     * (() => void) - 이 표현은 반환 타입이 함수이며, 그 함수는 반환값이 없다는 것을 의미
     */
    useEffect((): void | (() => void) => {
        if (count > 0) {
            const timer = setTimeout(() => {
                setCount(count - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
        // count 가 0 이하일 경우도 반환을 명시해줘야 함
        return undefined;
    }, [count]);

    return count > 0 ? (
        <div className={'alert alert-warning'}>
            <p>{'5초 이내 구매시 할인'}</p>
            <p>{count}</p>
        </div>
    ) : null;
};

export default OrderAlert;
