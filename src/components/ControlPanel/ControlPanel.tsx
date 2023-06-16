import * as S from './ControlPanel.styles';
import PlayButton from './PlayButton';

const ControlPanel: React.FC = () => {
    return (
        <S.Container>
            <PlayButton />
        </S.Container>
    );
};

export default ControlPanel;
