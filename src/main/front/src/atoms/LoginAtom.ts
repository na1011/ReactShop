import { atom, selector } from 'recoil';
import { User } from '../types/myType';

export const LoginAtom = atom<User>({
    key: 'LoginAtom',
    default: undefined
});

export const isLoginSelector = selector<boolean>({
    key: 'isLoginSelector',
    get: ({ get }) => !!get(LoginAtom)
});
