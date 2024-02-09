import { useDispatch, useSelector } from "react-redux";
import { selectAllEmployee, getEmpStatus, getEmpError, editEmployee, fetchEmp } from "../redux-toolkit/empSlice";
import {
    TableContainer, Spinner, Table, Thead, Th, Tbody, Tr, Td, Button, HStack, ButtonGroup, Input, Text, VStack, useDisclosure,
    AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogHeader, AlertDialogOverlay, AlertDialogFooter, Wrap, WrapItem, Avatar
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import { dropEmployee } from "../redux-toolkit/empSlice";
import { useState } from "react";

const DisplayEmployee = () => {
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const data = useSelector(selectAllEmployee);
    const empStatus = useSelector(getEmpStatus);
    const error = useSelector(getEmpError);
    const [isSyncing, setSyncing] = useState(false)
    // const toast = useToast()




    const url = 'https://65c0b652dc74300bce8c98a7.mockapi.io/api/employee/'
    async function syncToDatabaseManually() {
        setSyncing(true)
        const getRes = await axios.get(url)
        getRes.data.map(async (i) => {
            await axios.delete(url + i.id)
        })
        if (data.length === 0) {
            setSyncing(false)
        }
        data.map(async (i) => {
            axios.post(url, i).then(setSyncing(false))
        })
    }

    // useEffect(() => {
    //     if (empStatus === 'idle') {
    //         dispatch(fetchEmp())
    //     }
    // }, [])

    const [editValues, setEditValues] = useState({
        id: -1,
        name: "",
        designation: "",
        salary: 0,
        address: "",
        avatar: ""
    });
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setEditValues({
                ...editValues,
                avatar: URL.createObjectURL(event.target.files[0]),
            });
        }
    }
    const [editable, setEditable] = useState(false);
    const [editId, setEditId] = useState(-1);
    function setter(item) {
        setEditId(item.id);
        setEditable(true);
        setEditValues(item);
    }

    return (
        <>
            <HStack spacing={5} padding={3}>
                <Link to="/">
                    <IoArrowBack size={40} />
                </Link>
                <h1>Stored Data</h1>
                {empStatus === 'loading' && <Spinner margin={5} color='red.500' />}
            </HStack>

            {empStatus === 'failed' && <p className="alert alert-danger">{error}</p>}
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th width={"5%"}>Avatar</Th>
                            <Th width={"16.6%"}>Name</Th>
                            <Th width={"16.6%"}>Salary</Th>
                            <Th width={"16.6%"}>Designation</Th>
                            <Th width={"16.6%"}>Address</Th>
                            <Th width={"16.6%"}>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {/* {allData.length} */}
                        {data.map(function (item) {
                            return (


                                <Tr key={item.id}>
                                    {editable && item.id == editId ? (
                                        <Td>
                                            <label htmlFor="upload-photo" className="btn btn-secondary">Upoad</label>
                                            <input
                                                onChange={onImageChange}
                                                id="upload-photo"
                                                type="file"
                                                className="CustomUpload"

                                            />
                                        </Td>) :
                                        (
                                            <Td>
                                                <Wrap>
                                                    <WrapItem>
                                                        <Avatar src={item.avatar} />
                                                    </WrapItem>
                                                </Wrap>
                                            </Td>)
                                    }
                                    {editable && item.id === editId ? (
                                        <Td>
                                            <Input
                                                width={"100%"}
                                                onChange={(e) => {
                                                    setEditValues({
                                                        ...editValues,
                                                        name: e.target.value,
                                                    });
                                                }}
                                                value={editValues.name}
                                            />
                                        </Td>
                                    ) : (
                                        <Td>
                                            <Text width={"100%"}> {item.name}</Text>
                                        </Td>
                                    )}

                                    {editable && item.id === editId ? (
                                        <Td>
                                            <Input
                                                type="number"
                                                width={"100%"}
                                                onChange={(e) => {
                                                    setEditValues({
                                                        ...editValues,
                                                        salary: e.target.value,
                                                    });
                                                }}
                                                value={editValues.salary}
                                            />
                                        </Td>
                                    ) : (
                                        <Td>
                                            <Text width={"100%"}> {item.salary}</Text>
                                        </Td>
                                    )}
                                    {editable && item.id === editId ? (
                                        <Td>
                                            <Input
                                                width={"100%"}
                                                onChange={(e) => {
                                                    setEditValues({
                                                        ...editValues,
                                                        designation: e.target.value,
                                                    });
                                                }}
                                                value={editValues.designation}
                                            />
                                        </Td>
                                    ) : (
                                        <Td>
                                            <Text width={"100%"}> {item.designation}</Text>
                                        </Td>
                                    )}
                                    {editable && item.id === editId ? (
                                        <Td>
                                            <Input
                                                width={"50%"}
                                                onChange={(e) => {
                                                    setEditValues({
                                                        ...editValues,
                                                        address: e.target.value,
                                                    });
                                                }}
                                                value={editValues.address}
                                            />
                                        </Td>
                                    ) : (
                                        <Td>
                                            <Text width={"100%"}> {item.address}</Text>
                                        </Td>
                                    )}
                                    {editable && item.id === editId ? (
                                        <Td>
                                            <Button
                                                variant={"outline"}
                                                colorScheme="green"
                                                onClick={() => {
                                                    setEditable(false);
                                                    dispatch(editEmployee(editValues));
                                                }}
                                            >
                                                Save
                                            </Button>
                                        </Td>
                                    ) : (
                                        <Td>
                                            <ButtonGroup size="sm" isAttached variant="outline">
                                                <Button
                                                    colorScheme="green"
                                                    onClick={() => {
                                                        setter(item);
                                                    }}
                                                >
                                                    <MdEdit size={20} />
                                                </Button>
                                                <Button
                                                    colorScheme="red"
                                                    onClick={() => {
                                                        dispatch(dropEmployee(item.id));
                                                    }}
                                                >
                                                    {" "}
                                                    <MdDelete size={20} />
                                                </Button>
                                            </ButtonGroup>
                                        </Td>
                                    )}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
                <VStack>
                    <Button marginTop={3} colorScheme="green" onClick={onOpen}>Fetch</Button>
                    <Button colorScheme="red" isLoading={isSyncing} loadingText={"Please wait"} onClick={syncToDatabaseManually}>Sync</Button>
                </VStack>
            </TableContainer>
            <AlertDialog
                isOpen={isOpen}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Fetch from database ?
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? Your may loose your local store. Sync to save current state.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={() => { dispatch(fetchEmp()); onClose() }} ml={3}>
                                Fetch
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default DisplayEmployee;
