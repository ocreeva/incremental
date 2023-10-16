import Dialog, { DialogButtons, DialogProps, DialogTitle, SubmitDialogEventHandler } from '@/components/Dialog';

const ResetGameDialog: React.FC<Omit<DialogProps, 'onSubmit'>>
= (props) => {
    const handleSubmit: SubmitDialogEventHandler
    = () => {
        console.log('Reset now!');
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
