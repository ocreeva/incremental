import * as S from './ControlPanel.styles';
import MenuButton from './MenuButton';
import PlayButton from './PlayButton';
import ScriptButton from './ScriptButton';

const ControlPanel: React.FC = () => {
    return (
        <S.Container>
            <PlayButton />
            <ScriptButton />
            <MenuButton />
        </S.Container>
    );
};

export default ControlPanel;
