import { withStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

export const StyledButton = withStyles({
    root: {
        '&:hover': {
            backgroundColor: '#7a6ae2',
        },
    }
})(Button);