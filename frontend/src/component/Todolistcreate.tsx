import React from "react";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from "react";
import { TodolistInterface } from "../model/ITodolist";
import { StatusInterface } from "../model/IStatus";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,

    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TodolistCreate() {
    const [todolist, setTodolist] = useState<
        Partial<TodolistInterface>
    >({});
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [status, setStatus] = useState<StatusInterface[]>([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleClose = (
        event?: React.SyntheticEvent | Event,

        reason?: string
    ) => {
        console.log(reason);
        if (reason === "clickaway") {
            return;
        }

        setSuccess(false);

        setError(false);
    };

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }> //ชื่อคอมลัมน์คือ id และค่าที่จะเอามาใส่ไว้ในคอมลัมน์นั้นคือ value
    ) => {
        const id = event.target.id as keyof typeof todolist;
        const { value } = event.target;
        setTodolist({ ...todolist, [id]: value });
    };

    const handleChange = (event: SelectChangeEvent<number>) => {
        const name = event.target.name as keyof typeof todolist;
        console.log(event.target.name);
        console.log(event.target.value);
        const { value } = event.target;
        setTodolist({ ...todolist, [name]: value });
    };

    function submit() {
        let data = {
            List: (todolist.List) ?? "",
            StatusID: Number(todolist.StatusID),
        };
        console.log(data);

        const apiUrl = "http://localhost:8080/todolist";
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.data) {
                    console.log("บันทึกได้");
                    setSuccess(true);
                    setErrorMessage("");
                } else {
                    console.log("บันทึกไม่ได้");
                    setError(true);
                    setErrorMessage(res.error);
                }
            });
    }
    const requestOptions = {
        method: "GET",
    };
    const GetAllStatus = async () => {
        const apiUrl = "http://localhost:8080/status";

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())

            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    setStatus(res.data);
                }
            });
    };
    useEffect(() => {
        GetAllStatus();
    }, []);

    return (
        <Container maxWidth="md">
            <Snackbar
                id="success"
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="success">
                    บันทึกสำเร็จ
                </Alert>
            </Snackbar>
            <Snackbar
                id="error"
                open={error}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error">
                    บันทึกไม่สำเร็จ: {errorMessage}
                </Alert>
            </Snackbar>

            <Paper>
                <Box
                    display="flex"
                    sx={{
                        marginTop: 2,
                    }}
                >
                    <Box sx={{ paddingX: 2, paddingY: 1 }}>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="primary"
                            gutterBottom
                        >
                            Add Task
                        </Typography>
                    </Box>
                </Box>

                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="standard">
                            <p>
                                Task <span style={{ color: 'red' }}>*</span>
                            </p>
                            <TextField
                                id="List"
                                variant="standard"
                                type="string"
                                size="medium"
                                value={todolist.List || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="standard">
                            <p>Status</p>
                            <Select
                                native
                                value={todolist.StatusID}
                                onChange={handleChange}
                                inputProps={{
                                    name: "StatusID",
                                }}
                            >
                                <option aria-label="None" value=""></option>
                                {status.map(
                                    (
                                        item: StatusInterface
                                    ) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Name}
                                        </option>
                                    )
                                )}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            component={RouterLink}
                            to="/todolist"
                            variant="contained"
                        >
                            กลับ
                        </Button>

                        <Button

                            style={{ float: "right" }}
                            onClick={submit}
                            variant="contained"
                            color="success"
                        >
                            บันทึก
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default TodolistCreate;