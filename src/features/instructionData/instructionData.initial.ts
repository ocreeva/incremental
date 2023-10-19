import { InstructionDataState } from '@/types';

import adapter from './instructionData.adapter';

const initialState: InstructionDataState = adapter.getInitialState();

export default initialState;
