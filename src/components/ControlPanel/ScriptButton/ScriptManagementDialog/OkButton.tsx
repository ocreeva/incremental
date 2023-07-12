import styled from 'styled-components';

import { ReactComponent as CheckmarkIcon } from '@/assets/checkmark.svg';
import GlowButton, { GlowButtonShape } from '@/components/GlowButton';
import { useScriptSelectionContext } from '@/components/ScriptSelection';

const OkButton: React.FC
= () => {
    const { onSubmit } = useScriptSelectionContext('OkButton');

    return (
        <Container>
            <GlowButton shape={GlowButtonShape.Rect} onClick={onSubmit}>
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
