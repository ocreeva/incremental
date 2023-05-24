import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/App/store';

type DispatchFunc = () => AppDispatch;
const useAppDispatch: DispatchFunc = useDispatch;

export default useAppDispatch;
