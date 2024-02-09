import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BaseURL = "https://65c0b652dc74300bce8c98a7.mockapi.io/api/employee"

const initialState = {
    employee: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};


export const fetchEmp = createAsyncThunk('fetchEmp', async () => {
    const response = await axios.get(BaseURL)
    return response.data
})

export const EmpReducer = createSlice({
    name: "emp",
    initialState,
    reducers: {
        addEmployee: (state, action) => {
            const tempEmp = {
                id: nanoid(),
                name: action.payload.name,
                salary: action.payload.salary,
                designation: action.payload.designation,
                address: action.payload.address,
            };
            state.employee.push(tempEmp);
        },
        dropEmployee: (state, action) => {
            state.employee = state.employee.filter((emp) => emp.id != action.payload);
        },
        editEmployee: (state, action) => {
            const x = state.employee.find((emp) => { return emp.id === action.payload.id })
            const i = state.employee.indexOf(x)
            state.employee.splice(i, 1, action.payload)
        },

    },
    extraReducers(builder) {
        builder
            .addCase(fetchEmp.pending, (state) => {
                state.status = 'loading'
                // console.log(action.payload);
            })
            .addCase(fetchEmp.fulfilled, (state, action) => {
                state.employee = action.payload
                state.status = "succeeded"
            })
            .addCase(fetchEmp.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

    }
});

export const { addEmployee, dropEmployee, editEmployee } = EmpReducer.actions;
export const selectAllEmployee = (store) => store.employee
export const getEmpStatus = (state) => state.status;
export const getEmpError = (state) => state.error;
export default EmpReducer.reducer
