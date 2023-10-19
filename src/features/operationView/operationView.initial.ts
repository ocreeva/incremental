import { OperationViewState } from '@/types';

import adapter from './operationView.adapter';

const initialState: OperationViewState = adapter.getInitialState();

export default initialState;
