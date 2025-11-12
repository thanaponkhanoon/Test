import React, { useEffect, useState, useCallback } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Link as RouterLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { TodolistInterface } from "../model/ITodolist";
import TodolistEdit from "./TodolistEdit";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { colors } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Todolist() {
    const [todolist, setTodolist] = useState<TodolistInterface[]>([]);
    const [filteredTodolist, setFilteredTodolist] = useState<TodolistInterface[]>([]);

    const [taskFilter, setTaskFilter] = useState("");
    const [descriptionFilter, setDescriptionFilter] = useState("");
    const [dateFilter, setDateFilter] = useState<Date | null>();
    const [statusFilter, setStatusFilter] = useState("");

    const [selectcellData, setSelectcellData] = useState<TodolistInterface>();
    const [opendelete, setOpenDelete] = useState(false);
    const [openedit, setOpenEdit] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const [selectedRows, setSelectedRows] = useState<number[]>([]);

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

    const handleRowSelection = (ids: number[]) => {
        setSelectedRows(ids);
    };

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

    const handleEdit = () => {
        setOpenEdit(true);
    };

    const handleClickDelete = () => {
        DeleteTodolist(Number(selectcellData?.ID));

        setOpenDelete(false);
    };

    const handleDelete = () => {
        setOpenDelete(true);
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

    const handleStatusChange = (id: number, newStatus: string) => {
        // Update the status in the todolist
        const updatedTodolist = todolist.map((item) =>
            item.ID === id ? { ...item, Status: newStatus } : item
        );
        setTodolist(updatedTodolist);
        setFilteredTodolist(updatedTodolist);
    };

    // ฟังก์ชันสำหรับกรอง Task, Description, Status และ Date
    const filterTodolist = useCallback(() => {
        const filtered = todolist.filter((item) => {
            const matchTask = item.List.toLowerCase().includes(taskFilter.toLowerCase());
            const matchDescription = item.Des.toLowerCase().includes(descriptionFilter.toLowerCase());
            const matchStatus = item.Status.toLowerCase().includes(statusFilter.toLowerCase()); // Match status with filter text

            // Format Date to string (YYYY-MM-DD)
            const formattedDate = new Date(item.Date).toISOString().split('T')[0];

            // Check if dateFilter exists and match it
            const matchDate = dateFilter ? formattedDate.includes(dateFilter.toISOString().split('T')[0]) : true;

            return matchTask && matchDescription && matchStatus && matchDate;
        });
        setFilteredTodolist(filtered);
    }, [todolist, taskFilter, descriptionFilter, statusFilter, dateFilter]);

    useEffect(() => {
        filterTodolist(); // Call filtering when filters or todolist change
    }, [taskFilter, descriptionFilter, dateFilter, statusFilter, filterTodolist]);

    useEffect(() => {
        GetAllTodolist();
    }, []);

    const GetAllTodolist = async () => {
        const apiUrl = "http://localhost:8080/todolist";
        const requestOptions = {
            method: "GET",
        };

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    const mockData = res.data.map((item: TodolistInterface) => ({
                        ...item,
                        Status: Math.random() > 0.5 ? "ดำเนินการเสร็จแล้ว" : "ยังไม่ดำเนินการ", // Randomly assign status
                    }));
                    setTodolist(mockData);
                    setFilteredTodolist(mockData);
                }
            });
    };

    const columns: GridColDef[] = [
        {
            field: "List",
            headerName: "Task",
            width: 100,
            headerAlign: "center",
        },
        {
            field: "Des",
            headerName: "Description",
            width: 300,
            headerAlign: "center",
        },
        {
            field: "Date",
            headerName: "Due",
            width: 150,
            headerAlign: "center",
            valueGetter: (value, row) => {
                const date = new Date(row.Date);
                if (!isNaN(date.getTime())) {
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear() + 543;
                    return `${month}/${day}/${year}`;
                }
                return '';
            },
        },
        // {
        //     field: "Status",
        //     headerName: "Status",
        //     width: 180,
        //     headerAlign: "center",
        //     renderCell: (params) => (
        //         <Select
        //             value={params.row.Status}
        //             onChange={(e) => handleStatusChange(params.row.ID, e.target.value)}
        //             fullWidth
        //         >
        //             <MenuItem value="ดำเนินการเสร็จแล้ว">ดำเนินการเสร็จแล้ว</MenuItem>
        //             <MenuItem value="ยังไม่ดำเนินการ">ยังไม่ดำเนินการ</MenuItem>
        //         </Select>
        //     ),
        // },
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

    return (
        <div>
            <Container maxWidth="md">
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

                <Box display="flex" sx={{ marginTop: 2 }}>
                    <Box flexGrow={1}>
                        <Typography component="h1" variant="h6" color="primary" gutterBottom>
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
                        >
                            Add Task
                        </Button>
                    </Box>
                </Box>

                {/* Filter Section */}
                {/* <Box display="flex" justifyContent="space-between" my={2}>
                    <TextField
                        label="Filter Task"
                        variant="outlined"
                        value={taskFilter}
                        onChange={(e) => setTaskFilter(e.target.value)}
                    />
                    <TextField
                        label="Filter Description"
                        variant="outlined"
                        value={descriptionFilter}
                        onChange={(e) => setDescriptionFilter(e.target.value)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={dateFilter}
                            onChange={(newValue: Date | null) => setDateFilter(newValue)}
                            slots={{ textField: TextField }}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                },
                            }}
                        />
                    </LocalizationProvider>
                    <TextField
                        label="Filter Status"
                        variant="outlined"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    />
                </Box> */}

                <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
                    <DataGrid
                        rows={filteredTodolist}
                        getRowId={(row) => row.ID}
                        columns={columns}
                        pageSizeOptions={[5]}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
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
                        checkboxSelection
                        onRowSelectionModelChange={(newSelection: any) => handleRowSelection(newSelection)}
                        onCellClick={(params) => {
                            setSelectcellData(params.row);
                        }}
                    />
                </div>
            </Container>
        </div>
    );
}

export default Todolist;
