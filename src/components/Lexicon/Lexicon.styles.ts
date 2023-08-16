import styled from 'styled-components';

export const Container = styled.section`
    --glyph_size: var(--glyph_size-medium);

    padding: 8px;

    display: flex;
    align-items: flex-end;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
`;

export const Spacer = styled.div`
    height: calc((100% - 8px - 78px * var(--lexicon_num-commands)) / 2);
`;
