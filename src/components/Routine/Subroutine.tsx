import { VisuallyHidden } from '@reach/visually-hidden';

import { convertToGameTime } from '@/core';
import { selectHostDesign } from '@/features/hosts';
import { selectRoleDesign } from '@/features/roles';
import { selectSubroutine } from '@/features/subroutineView';
import { useParamSelector } from '@/hooks';
import type { EntityId } from '@/types';

import * as S from './Subroutine.styles';
import Operation from './Operation';

declare type SubroutineProps = {
    id: EntityId;
};

const Subroutine: React.FC<SubroutineProps> = ({ id }) => {
    const { duration, host, operations, role } = useParamSelector(selectSubroutine, id);

    const { GlyphComponent: HostGlyph, name: hostName } = useParamSelector(selectHostDesign, host);
    const { GlyphComponent: RoleGlyph, name: roleName } = useParamSelector(selectRoleDesign, role);

    if (duration === 0) return null;

    const style = {
        '--subroutine_duration': convertToGameTime(duration),
    } as React.CSSProperties;

    return (
        <>
            <S.Container style={style}>
                <S.Host>
                    <HostGlyph />
                    <VisuallyHidden>Host: { hostName }</VisuallyHidden>
                </S.Host>
                <S.StartSpacer />
                { operations.map(operationId => <Operation key={operationId} id={operationId} />) }
                <S.EndSpacer />
                <S.Role>
                    <RoleGlyph />
                    <VisuallyHidden>Role: { roleName }</VisuallyHidden>
                </S.Role>
            </S.Container>
        </>
    );
};

export default Subroutine;
