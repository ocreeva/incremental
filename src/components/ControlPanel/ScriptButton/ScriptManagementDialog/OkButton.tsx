import styled from 'styled-components';

import { ReactComponent as CheckmarkIcon } from '@/assets/checkmark.svg';
import GlowButton, { GlowButtonShape } from '@/components/GlowButton/GlowButton';
import { useScriptSelectionContext } from '@/components/ScriptSelection';
import { setCurrentScriptId } from '@/features/scripts';
import { useAppDispatch } from '@/hooks';

import type { DismissDialogEventHandler } from '@reach/dialog';

declare type OkButtonProps = {
    onDismiss: DismissDialogEventHandler;
};

const OkButton: React.FC<OkButtonProps>
= ({ onDismiss }) => {
    const dispatch = useAppDispatch();
    const { scriptId } = useScriptSelectionContext('OkButton');

    const handleClick: React.MouseEventHandler<HTMLButtonElement>
    = (event) => {
        dispatch(setCurrentScriptId(scriptId));
        onDismiss(event);
    };

    return (
        <Container>
            <GlowButton shape={GlowButtonShape.Rect} onClick={handleClick}>
                <CheckmarkIcon />
            </GlowButton>
        </Container>
    );
};

const Container = styled.div`
    --color-highlight: var(--color-checkmark);

    flex: 1;

    display: grid;
    justify-content: end;
`;

OkButton.displayName = 'OkButton';
export default OkButton;
