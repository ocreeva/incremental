import * as S from './ControlPanel.styles';
import PlayButton from './PlayButton';
import ScriptButton from './ScriptButton';

const ControlPanel: React.FC = () => {
    return (
        <S.Container>
            <PlayButton />
            <ScriptButton />
        </S.Container>
    );
};

export default ControlPanel;
