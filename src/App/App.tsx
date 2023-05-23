import GlobalStyles from './GlobalStyles';
import ActionId from '@/model/ActionId';
import Glyph, { GlyphSize } from '@/components/Glyph';

const App: React.FC = () => {
    return (
        <>
            <GlobalStyles />
            <Glyph action={ActionId.Login} size={GlyphSize.small} />
            <Glyph action={ActionId.Login} size={GlyphSize.medium} />
            <Glyph action={ActionId.Login} size={GlyphSize.large} />
        </>
    );
};

export default App
