import { type CommandId } from '@/constants';
import { selectCommandDesign } from '@/features/commandView';
import { useParamSelector } from '@/hooks';

import * as S from './GlyphPanelContent.styles';

declare type GlyphPanelContentProps = {
    commandId: CommandId;
};

const GlyphPanelContent: React.FC<React.PropsWithChildren<GlyphPanelContentProps>>
= ({ children, commandId }) => {
    const { GlyphComponent } = useParamSelector(selectCommandDesign, commandId);

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
