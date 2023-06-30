import * as S from './ScriptButton.styles';

const ScriptButton: React.FC = () => {
    return (<>
        <S.ScriptGlow />
        <S.ScriptButton type='button'>
            <S.ScriptIcon />
        </S.ScriptButton>
    </>);
};

export default ScriptButton;
