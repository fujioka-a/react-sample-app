import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface FormTextFieldProps {
    error?: boolean;
    id?: string;
    label: string;
    defaultValue?: string;
    helperText?: string;
    variant?: 'filled' | 'outlined' | 'standard';
    width?: string;
}

const FormTextField: React.FC<FormTextFieldProps> = (props) => {
    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: props.width || '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField {...props} />
            </div>
        </Box>
    );
};

export default FormTextField;