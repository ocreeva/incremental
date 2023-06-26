import GlyphPanel from '@/components/GlyphPanel';
import { removeInstruction } from '@/features/instructions';
import { removeInstructionFromCurrentScript } from '@/features/scripts';
import { useAppDispatch, useAppSelector } from '@/hooks';

import * as S from './Instruction.styles';
import { selectInstruction } from '@/features/instructions/instructionsSlice.selectors';

type InstructionProps = {
    id: string;
    shouldAnimate: boolean;
};

const Instruction: React.FC<InstructionProps> = ({ id, shouldAnimate }) => {
    const dispatch = useAppDispatch();
    const { commandId } = useAppSelector(state => selectInstruction(state, id));

    const handleRemoveInstruction: React.MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(removeInstructionFromCurrentScript(id));
        dispatch(removeInstruction(id));
    };

    return (
        <GlyphPanel commandId={commandId} shouldAnimate={shouldAnimate}>
            <S.ButtonContent>
                <S.RemoveButton onClick={handleRemoveInstruction}>
                    <S.RemoveIcon />
                </S.RemoveButton>
            </S.ButtonContent>
        </GlyphPanel>
    );
};

export default Instruction;
