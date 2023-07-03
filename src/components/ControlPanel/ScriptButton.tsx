import { VisuallyHidden } from '@reach/visually-hidden';

import * as S from './ScriptButton.styles';

const ScriptButton: React.FC = () => {
    return (<>
        <S.ScriptGlow />
        <S.ScriptButton type='button'>
            <S.ScriptIcon />
            <VisuallyHidden>Manage Scripts</VisuallyHidden>
        </S.ScriptButton>
    </>);
};

export default ScriptButton;
