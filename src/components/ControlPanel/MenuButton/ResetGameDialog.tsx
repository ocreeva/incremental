import Dialog, { DialogButtons, DialogProps, DialogTitle, SubmitDialogEventHandler } from '@/components/Dialog';
import { reset, selectGameIsPlaying } from '@/features/game';
import { useAppDispatch, useAppSelector } from '@/hooks';
import GameStateService from '@/services/GameStateService';

const ResetGameDialog: React.FC<Omit<DialogProps, 'onSubmit'>>
= (props) => {
    const gameIsPlaying = useAppSelector(selectGameIsPlaying);

    const dispatch = useAppDispatch();
    const handleSubmit: SubmitDialogEventHandler
    = () => {
        if (gameIsPlaying) GameStateService.stopAsync();
        dispatch(reset());
    };

    return (
        <Dialog {...props} onSubmit={handleSubmit}>
            <DialogTitle>Reset Game</DialogTitle>
            <p>Are you sure you want to reset the game? This will remove all progress and delete all saved scripts.</p>
            <DialogButtons />
        </Dialog>
    );
};

ResetGameDialog.displayName = 'ResetGameDialog';
export default ResetGameDialog;
