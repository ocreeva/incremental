import styled from 'styled-components';

export const Container = styled.div`
    /* --routine_duration: 42; */
    /* --routine_elapsed: 21; */
    /* --routine_max-duration: 171 */

    flex: 0 0 fit-content;
    width: 100%;

    background: var(--color-empty);
    filter: drop-shadow(0 0 4px var(--color-background));

    overflow-x: auto;
    &::-webkit-scrollbar {
        background: transparent;
        height: 0;
    }
`;

export const ScrollRegion = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: calc(100vw + var(--routine_duration) * 1px - 42px);
`;

export const MaxDurationContainer = styled.div`
    height: 8px;
    padding: 2px calc(50vw - 21px);

    background: var(--color-background);
    filter: drop-shadow(0 0 2px var(--color-background));
`;

export const MaxDuration = styled.div`
    height: 4px;
    width: calc(var(--routine_max-duration) * 1px);

    background: var(--color-empty);
    border-radius: 2px;
    box-shadow: inset -1px -1px 2px hsla(0deg 0% 100% / 25%);
`;

export const Elapsed = styled.div`
    height: 4px;
    width: calc(var(--routine_elapsed) * 1px);

    background: var(--color-progress);
    border-radius: 2px;
    box-shadow: inset 1px 1px 2px hsla(0deg 0% 100% / 50%);
`;
