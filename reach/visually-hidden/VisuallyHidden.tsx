import * as React from 'react';
import styled from 'styled-components';

export declare type VisuallyHiddenProps = React.HTMLAttributes<HTMLSpanElement> & {
    children: React.ReactNode;
};

const VisuallyHiddenContainer = styled.span`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
    word-wrap: normal;
`;

const VisuallyHidden: React.FC<VisuallyHiddenProps> = (props) => {
    return <VisuallyHiddenContainer {...props} />;
};

VisuallyHidden.displayName = 'VisuallyHidden';

export default VisuallyHidden;
