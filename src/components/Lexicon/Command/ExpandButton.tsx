import { ReactComponent as CollapseIcon } from '@/assets/collapse.svg';
import { ReactComponent as ExpandIcon } from '@/assets/expand.svg';

import * as S from './ExpandButton.styles';
import { AccordionState, useAccordionItemContext } from '@reach/accordion';

const ExpandButton: React.FC
= () => {
    const { state } = useAccordionItemContext('ExpandButton');

    return (
        <S.Container>
            <S.Button>
                { state === AccordionState.Open
                    ? <CollapseIcon />
                    : <ExpandIcon />
                }
            </S.Button>
            <S.Glow />
        </S.Container>
    );
};

ExpandButton.displayName = 'ExpandButton';
export default ExpandButton;
