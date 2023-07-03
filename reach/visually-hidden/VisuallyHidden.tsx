import * as React from 'react';
import * as S from './VisuallyHidden.styles';

const VisuallyHidden: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <S.Container>
            { children }
        </S.Container>
    );
};

export default VisuallyHidden;
