export interface Item {
    id: number;
    title: string;
    content: string;
    img: string;
    price: number;
}

export interface CartList {
    user: number;
    cartList: CartItem[];
}

export interface CartItem {
    quantity: number;
    item: Item;
}

// 출석부 시스템에 쓰이는 타입
export interface Student {
    id: number;
    name: string;
    isHere: boolean;
}

export interface StudentInfo {
    count: number;
    students: Student[];
}

export type StudentAction =
    | { type: 'ADD-STUDENT'; payload: string }
    | { type: 'REMOVE-STUDENT'; payload: number };

export interface StudentListProps {
    list: Student[];
    removeStudent: (id: number) => void;
}
