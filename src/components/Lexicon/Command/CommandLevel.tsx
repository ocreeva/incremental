import styled from 'styled-components';

import { useCommandContext } from './CommandContext';
import { useAppSelector } from '@/hooks';
import { selectCommand } from '@/features/commands';
import { VisuallyHidden } from '@reach/visually-hidden';

const CommandLevel: React.FC
= () => {
    const { commandId } = useCommandContext('CommandLevel');
    const { level = 0, progress = 0 } = useAppSelector(state => selectCommand(state, commandId));

    const style = {
        '--command-level_progress': `${progress}%`,
    } as React.CSSProperties;

    return (
        <Container style={style}>
            <Progress>
                <VisuallyHidden>{progress}% to next level</VisuallyHidden>
            </Progress>
            <Level><VisuallyHidden>Level </VisuallyHidden>{ level }</Level>
        </Container>
    );
};

const Container = styled.div`
    grid-area: level;

    display: grid;
    grid-template-areas:
        'level progress'
    ;
    grid-template-columns: 1.4375rem 1fr;
    grid-template-rows: 1.4375rem;
`;

const Level = styled.div`
    grid-area: level;

    background: var(--color-highlight);
    border-radius: 50%;
    color: var(--color-background);
    font-weight: 900;

    display: grid;
    place-content: center;
`;

const Progress = styled.div`
    grid-area: progress;
    align-self: center;

    margin-inline-start: -1px;
    height: 4px;
    width: calc(100% + 1px);

    border-radius: 0 2px 2px 0;
    background: var(--color-empty);
    background-image: linear-gradient(
        to right,
        var(--color-highlight),
        var(--color-highlight) var(--command-level_progress),
        transparent var(--command-level_progress),
        transparent
    );
`;

CommandLevel.displayName = 'CommandLevel';
export default CommandLevel;
