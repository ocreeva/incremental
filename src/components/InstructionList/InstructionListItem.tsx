import CommandButton from '@/components/CommandButton';
import { GlyphSize } from '@/components/Glyph';
import { removeInstruction } from '@/features/program';
import { useAppDispatch } from '@/hooks';
import { Instruction } from '@/types';

import * as S from './InstructionListItem.styles';

interface InstructionListItemProps {
    instruction: Instruction;
    shouldAnimate: boolean;
}

const InstructionListItem: React.FC<InstructionListItemProps> = ({ instruction, shouldAnimate }) => {
    const dispatch = useAppDispatch();

    const { id, commandId } = instruction;

    const handleRemoveInstruction: React.MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(removeInstruction({ instructionId: id }));
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

export default InstructionListItem;
