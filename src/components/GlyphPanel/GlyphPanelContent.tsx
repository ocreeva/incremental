import { type CommandId } from '@/constants';
import { selectDesign } from '@/features/commands';
import { useParamSelector } from '@/hooks';

import * as S from './GlyphPanelContent.styles';

declare type GlyphPanelContentProps = {
    commandId: CommandId;
};

const GlyphPanelContent: React.FC<React.PropsWithChildren<GlyphPanelContentProps>>
= ({ children, commandId }) => {
    const { GlyphComponent } = useParamSelector(selectDesign, commandId);

    return (
        <S.Container>
            <S.GlyphContainer>
                <GlyphComponent />
            </S.GlyphContainer>
            <S.ContentContainer>
                { children }
            </S.ContentContainer>
        </S.Container>
    );
};

GlyphPanelContent.displayName = 'GlyphPanelContent';
export default GlyphPanelContent;
