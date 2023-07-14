import { VisuallyHidden } from '@reach/visually-hidden';

import GlyphPanel from '@/components/GlyphPanel';
import { removeInstruction, selectInstruction } from '@/features/instructions';
import { removeInstructionFromCurrentScript } from '@/features/scripts';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { type EntityId } from '@/types';

import * as S from './Instruction.styles';

declare type InstructionProps = {
    id: EntityId;
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
                    <VisuallyHidden>Remove Instruction from Script</VisuallyHidden>
                </S.RemoveButton>
            </S.ButtonContent>
        </GlyphPanel>
    );
};

export default Instruction;
