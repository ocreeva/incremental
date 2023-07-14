import { useDispatch } from 'react-redux';
import { type AppDispatch } from '@/App/store';

declare type DispatchFunc = () => AppDispatch;
const useAppDispatch: DispatchFunc = useDispatch;

export default useAppDispatch;
