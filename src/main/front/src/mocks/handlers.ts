import { Item, User } from '../types/myType';
import { http, HttpResponse } from 'msw';
import { AxiosError } from 'axios';

const users: User[] = [
    { id: 'admin', password: '1234', role: 'admin' },
    { id: 'user', password: '5678', role: 'user' }
];

const items: Item[] = [
    {
        id: 1,
        title: 'White and Black',
        content: 'Born in France',
        img: 'shoes1',
        price: 1000
    },
    {
        id: 2,
        title: 'Red Knit',
        content: 'Born in Seoul',
        img: 'shoes2',
        price: 2000
    },
    {
        id: 3,
        title: 'Grey Yordan',
        content: 'Born in the States',
        img: 'shoes3',
        price: 3000
    }
];

export const handlers = [
    http.post('http://localhost:8080/api/login', async ({ request }) => {
        const { id: inputId, password: inputPwd } = (await request.json()) as User;

        const findById = users.find((user) => user.id === inputId);
        if (!findById) {
            throw new AxiosError('아이디 오류입니다', '403');
        }

        if (findById.password !== inputPwd) {
            throw new AxiosError('비밀번호 오류입니다', '403');
        }

        return new HttpResponse(
            JSON.stringify({
                id: findById.id,
                role: findById.role
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }),
    http.get('http://localhost:8080/api/items', ({ request }) => {
        console.log('GET 요청 모킹', request);
        return new HttpResponse(JSON.stringify(items), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }),
    http.get('http://localhost:8080/api/details/:itemId', ({ params }) => {
        const { itemId } = params as { itemId: string };
        const item: Item | undefined = items.find((target) => target.id === parseInt(itemId));
        if (!item) {
            throw new Error('잘못된 요청입니다.');
        }
        return new HttpResponse(JSON.stringify(item), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    })
];

// export const handlers = [
//     rest.post('/api/login', (req, res, ctx) => {
//         const { id: inputId, password: inputPwd } = req.body as User;
//
//         const findById = users.find((user) => user.id === inputId);
//         if (!findById) {
//             return res(ctx.status(401), ctx.json({ message: '아이디가 없습니다.' }));
//         }
//         if (findById.password !== inputPwd) {
//             return res(ctx.status(401), ctx.json({ message: '잘못된 비밀번호 입니다.' }));
//         }
//         return res(
//             ctx.status(200),
//             ctx.json({
//                 username: findById.id,
//                 role: findById.role
//             })
//         );
//     }),
//     rest.get('http://localhost:8080/api/items', (req, res, ctx) => {
//         console.log('get 요청 모킹 ', req.url);
//         return res(ctx.status(200), ctx.json(items));
//     }),
//     rest.get('http://localhost:3000/test', (req, res, ctx) => {
//         console.log('get 요청 모킹 ', req.url);
//         return res(ctx.status(400), ctx.json({ message: '테스트 완료' }));
//     })
// ];
