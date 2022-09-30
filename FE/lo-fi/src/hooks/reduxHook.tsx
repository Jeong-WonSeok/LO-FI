import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../redux/modules/store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// useSelector와 useDispatch의 타입 설정
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector