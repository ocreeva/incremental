import styled from 'styled-components';


export const ProgressBorder = styled.div`
    /* --operation_delay: 0; */
    /* --operation_duration: 42; */
    /* --operation_progress: 50%; */
    --operation_units: calc(var(--operation_duration) / 84);
    --operation_width: calc(var(--operation_duration) * 1px);

    --operation_gradient-left: calc(25% / var(--operation_units));
    --operation_gradient-right: calc(100% - var(--operation_gradient-left));
    --operation_left-gradient-progress: min(25%, var(--operation_progress) * var(--operation_units));
    --operation_left-gradient-progress-end: calc(100% - var(--operation_left-gradient-progress));
    --operation_center-gradient-progress: max(var(--operation_gradient-left), min(var(--operation_gradient-right), var(--operation_progress)));
    --operation_right-gradient-progress: min(25%, (100% - var(--operation_progress)) * var(--operation_units));
    --operation_right-gradient-progress-end: calc(100% - var(--operation_right-gradient-progress));

    --operation_box-shadow: 1px 1px 2px hsla(0deg 0% 100% / 25%);

    background-color: var(--color-empty);
    background-image:
        conic-gradient(
            from 270deg at var(--operation_gradient-left) 50%,
            var(--color-progress),
            var(--color-progress) var(--operation_left-gradient-progress),
            transparent var(--operation_left-gradient-progress),
            transparent var(--operation_left-gradient-progress-end),
            var(--color-progress) var(--operation_left-gradient-progress-end),
            var(--color-progress)
        ),
        linear-gradient(
            to right,
            transparent,
            transparent var(--operation_gradient-left),
            var(--color-progress) var(--operation_gradient-left),
            var(--color-progress) var(--operation_center-gradient-progress),
            transparent var(--operation_center-gradient-progress),
            transparent 100%
        ),
        conic-gradient(
            from 90deg at var(--operation_gradient-right) 50%,
            transparent,
            transparent var(--operation_right-gradient-progress),
            var(--color-progress) var(--operation_right-gradient-progress),
            var(--color-progress) 25%,
            transparent 25%,
            transparent 75%,
            var(--color-progress) 75%,
            var(--color-progress) var(--operation_right-gradient-progress-end),
            transparent var(--operation_right-gradient-progress-end),
            transparent
        )
        ;
    border-radius: 11px;
    box-shadow: inset var(--operation_box-shadow);
    margin-inline-start: calc(var(--operation_delay) * 1px);
    padding: 3px;
`;

export const Container = styled.div`
    background: var(--color-background);
    border-radius: 9px;
    box-shadow: var(--operation_box-shadow);
    width: calc(var(--operation_width) - 6px);
`;

export const GlyphContainer = styled.div`
    width: max-content;
    margin-inline: auto;
    padding: 1px;

    position: sticky;
    left: 2px;
    right: 2px;
`;
