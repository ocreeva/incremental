import CommandButton from '@/components/CommandButton';
import { GlyphSize } from '@/components/Glyph';
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
        <CommandButton commandId={commandId} glyphSize={GlyphSize.small} shouldAnimate={shouldAnimate}>
            <S.ButtonContent>
                <S.RemoveButton onClick={handleRemoveInstruction}>
                    <S.RemoveIcon />
                </S.RemoveButton>
            </S.ButtonContent>
        </CommandButton>
    );
};

export default Instruction;
