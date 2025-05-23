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
                <TextField
                    {...props}
                    sx={{
                        '& .MuiInputBase-root.Mui-error': {
                            color: 'black',
                        },
                        '& .MuiFormHelperText-root.Mui-error': {
                            color: 'gray',
                        },
                        '& .MuiInputLabel-root.Mui-error': {
                            color: 'gray',
                        },
                        '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black',
                        },
                        '& .MuiFilledInput-root.Mui-error:before': {
                            borderBottomColor: 'black',
                        },
                        '& .MuiInput-root.Mui-error:before': {
                            borderBottomColor: 'black',
                        },
                    }}
                />
            </div>
        </Box>
    );
};

export default FormTextField;