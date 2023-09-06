import styled from 'styled-components';

export const Container = styled.div`
    /* --subroutine_duration: 42; */

    width: 100%;

    display: flex;
    flex-direction: row;
    gap: 8px;

    background: var(--color-background);
    filter: drop-shadow(0 0 2px var(--color-background));
    padding-block: 2px;

    &:first-of-type {
        padding-block-start: 4px;
    }
`;

export const StartSpacer = styled.div`
    width: calc(50vw - 100px);
`;

export const EndSpacer = styled.div`
    width: calc(50vw - 100px + 1px * (var(--routine_duration) - var(--subroutine_duration)));
`;

const Information = styled.div`
    position: sticky;
    left: 0;
    right: 0;
    z-index: 1;

    height: 42px;
    padding: 4px;
    width: 63px;

    background: linear-gradient(
        to var(--subroutine_direction),
        var(--color-background),
        var(--color-background) 65%,
        transparent
    );
`;

export const Host = styled(Information)`
    --subroutine_direction: right;

    padding-inline-end: 25px;
`;

export const Role = styled(Information)`
    --subroutine_direction: left;

    padding-inline-start: 25px;
`;
