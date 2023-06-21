import CommandButton from '@/components/CommandButton';
import { GlyphSize } from '@/components/Glyph';
import { removeInstruction } from '@/features/program';
import { useAppDispatch } from '@/hooks';

import * as S from './InstructionListItem.styles';

import type { InstructionState } from '@/types';

type InstructionListItemProps = InstructionState & {
    shouldAnimate: boolean;
};

const InstructionListItem: React.FC<InstructionListItemProps> = ({ key, commandId, shouldAnimate }) => {
    const dispatch = useAppDispatch();

    const handleRemoveInstruction: React.MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(removeInstruction({ key }));
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
