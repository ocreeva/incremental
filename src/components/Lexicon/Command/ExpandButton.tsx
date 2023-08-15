import { useState } from 'react';
import { AccordionState, useAccordionItemContext } from '@reach/accordion';

import { ReactComponent as AnimatedCollapseIcon } from '@/assets/collapseFromExpand.svg';
import { ReactComponent as ExpandIcon } from '@/assets/expand.svg';
import { ReactComponent as AnimatedExpandIcon } from '@/assets/expandFromCollapse.svg';

import * as S from './ExpandButton.styles';

const ExpandButton: React.FC
= () => {
    const { state } = useAccordionItemContext('ExpandButton');
    const [wasOpen, setWasOpen] = useState(false);

    const isOpen = state === AccordionState.Open;
    if (!wasOpen && state === AccordionState.Open) setWasOpen(true);

    const Icon = isOpen ? AnimatedCollapseIcon : wasOpen ? AnimatedExpandIcon : ExpandIcon;

    return (
        <S.Container>
            <S.Button>
                <Icon />
            </S.Button>
            <S.Glow />
        </S.Container>
    );
};

ExpandButton.displayName = 'ExpandButton';
export default ExpandButton;
