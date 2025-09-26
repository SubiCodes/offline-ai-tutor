import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

interface AlertOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentState: string | null;
  activity: string;
}

const AlertLoadingWithState = ({open, onOpenChange, currentState, activity}: AlertOverlayProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange} >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{activity}</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription className='my-4'>
                    <Text className='text-center'>{currentState || "Processing..."}</Text>
                </AlertDialogDescription>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertLoadingWithState