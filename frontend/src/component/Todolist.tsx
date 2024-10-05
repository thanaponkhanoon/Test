import React from "react";
import { useEffect, useState, useCallback } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from '@mui/icons-material/Add';
import { TodolistInterface } from "../model/ITodolist";
import TodolistEdit from "./TodolistEdit";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,

    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Todolist() {
    const [todolist, setTodolist] = useState<TodolistInterface[]>([]);

    const [selectcellData, setSelectcellData] =
        useState<TodolistInterface>();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [opendelete, setOpenDelete] = useState(false);
    const [openedit, setOpenEdit] = useState(false);

    const handleCellFocus = useCallback(
        (event: React.FocusEvent<HTMLDivElement>) => {
            const row = event.currentTarget.parentElement;
            const id = row?.dataset.id;
            const selectedTodolist = todolist.find((v) => Number(v.ID) === Number(id));
            console.log(selectedTodolist);
            setSelectcellData(selectedTodolist);
        },
        [todolist]
    );
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
    const handleClickDelete = () => {
        DeleteTodolist(Number(selectcellData?.ID));

        setOpenDelete(false);
    };
    const handleDelete = () => {
        setOpenDelete(true);
    };
    const handleEdit = () => {
        setOpenEdit(true);
    };

    const handleDeleteClose = () => {
        setOpenDelete(false);
    };
    const handleEditClose = () => {
        setOpenEdit(false);
    };
    const DeleteTodolist = async (id: Number) => {
        const apiUrl = `http://localhost:8080/todolist/${id}`;
        const requestOptions = {
            method: "DELETE",
        };

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())

            .then((res) => {
                if (res.data) {
                    setSuccess(true);
                    const remove = todolist.filter(
                        (perv) => perv.ID !== selectcellData?.ID
                    );
                    setTodolist(remove);
                } else {
                    setError(true);
                }
            });
    };

    const GetAllTodolist = async () => {
        const apiUrl = "http://localhost:8080/todolist";

        const requestOptions = {
            method: "GET",
        };

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())

            .then((res) => {
                console.log(res.data);

                if (res.data) {
                    setTodolist(res.data);
                }
            });
    };

    const columns: GridColDef[] = [
        {
            field: "List",
            headerName: "Task",
            width: 200,
            headerAlign: "center",
            headerClassName: "gray-header",
            renderCell: (params) => (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",

                    }}
                >
                    {params.value}
                </div>
            ),
        },
        {
            field: "Status",
            headerName: "Status",
            width: 130,
            headerAlign: "center",
            valueGetter: (value, row) => `${row.Status.Name || ''}`,
        },
        {
            field: "actions",
            headerName: "Action",
            width: 175,
            headerAlign: "center",
            renderCell: () => (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <Button
                        onClick={handleEdit}
                        variant="contained"
                        size="small"
                        startIcon={<EditIcon />}
                        color="success"
                    ></Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button
                        onClick={handleDelete}
                        variant="contained"
                        size="small"
                        startIcon={<DeleteIcon />}
                        color="error"
                    ></Button>
                </div>
            ),
        },
    ];

    useEffect(() => {
        GetAllTodolist();
    }, []);

    return (
        <div>
            <Container maxWidth="sm">
                <Snackbar
                    open={success}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert onClose={handleClose} severity="success">
                        ลบ Task สำเร็จ
                    </Alert>
                </Snackbar>

                <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        ลบ Task ไม่สำเร็จ
                    </Alert>
                </Snackbar>
                <Dialog
                    open={opendelete}
                    onClose={handleDeleteClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"คุณต้องการลบใช่หรือไม่?"}
                    </DialogTitle>

                    <DialogActions>
                        <Button onClick={handleDeleteClose}>ยกเลิก</Button>
                        <Button onClick={handleClickDelete} autoFocus>
                            ตกลง
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openedit}
                    onClose={handleEditClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogActions>
                        <TodolistEdit
                            Cancle={handleEditClose}
                            Data={selectcellData}
                        />
                    </DialogActions>
                </Dialog>
                <Box
                    display="flex"
                    sx={{
                        marginTop: 2,
                    }}
                >
                    <Box flexGrow={1}>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="primary"
                            gutterBottom
                        >
                            To-Do List
                        </Typography>
                    </Box>

                    <Box>
                        <Button
                            component={RouterLink}
                            to="/todolistcreate"
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            sx={{ textTransform: 'none' }}
                        >
                            Add Task
                        </Button>
                    </Box>
                </Box>

                <div style={{ height: 400, width: "100%", marginTop: "20px", }}>
                    <DataGrid
                        rows={todolist}
                        getRowId={(row) => row.ID}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        sx={{
                            '& .MuiDataGrid-cell': {
                                color: 'white',
                            },
                            '& .MuiDataGrid-columnHeader': {
                                color: 'white',
                                backgroundColor: '#a800ab',
                            },
                        }}
                        slotProps={{
                            cell: {
                                onFocus: handleCellFocus,
                            },
                        }}

                    />
                </div>
            </Container>
        </div>
    );
}

export default Todolist;