import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import TextInput from "../../../components/TextInput";
import Dropdown from "../../Dropdown";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { classesServices } from "../../../services/studentServices";
import { addNotification } from "../../../utils/toastify";
const gradeOptions = ["10", "11", "12"];
const NameAndDescription = ({ className }) => {
    const [value, setValue] = React.useState("1");
    const [grade, setGrade] = React.useState("10");
    const [nameClass, setNameClass] = useState("10A1");
    const [curNumberStudent, setCurNumberStudent] = useState(0);
    const [classId, setClassId] = useState([]);
    const [id, setId] = useState(0);
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };
    const [allClasses, setAllClasses] = useState([]);
    const [valueCreate, setValueCreate] = useState({
        name: "",
        numberStudent: null,
        gradeId: null,
    });
    const [valueChange, setValueChange] = useState({
        name: "",
        numberStudent: null,
        id: 0,
    });
    useEffect(() => {
        async function getClass() {
            try {
                const { data } = await classesServices.getClass(-1);
                const listClass = data.map((i) => i.name);
                const listIdClass = data.map((i) => {
                    return {
                        name: i.name,
                        id: i.id,
                    };
                });
                setClassId(listIdClass);
                console.log(listIdClass);
                setAllClasses(listClass);
            } catch (e) {
                console.log(e);
            }
        }
        getClass();
    }, []);
    const handleChangeCreate = (e) => {
        let value = e.target.value;
        console.log(e.target.name, e.target.value);
        if (e.target.name === "numberStudent") {
            value = +value;
        }

        setValueCreate({
            ...valueCreate,
            [e.target.name]: value,
        });
    };
    useEffect(() => {
        let gradeId = 0;
        if (grade === "10") {
            gradeId = 1;
        } else if (grade === "11") {
            gradeId = 2;
        } else {
            gradeId = 3;
        }
        setValueCreate({
            ...valueCreate,
            gradeId,
        });
    }, [grade]);
    const handleSubmitChange = async (e) => {
        e.preventDefault();
        try {
            console.log(valueChange);
            const data = await classesServices.updateClass(valueChange);
            addNotification("Update successfully", 0);
        } catch (e) {
            addNotification("Something went wrong", 3);
            console.log(e);
        }
    };
    const handleSubmitCreate = async (e) => {
        e.preventDefault();
        try {
            console.log(valueCreate);
            const newClass = await classesServices.createClass(valueCreate);
            addNotification("New class created", 0);
        } catch (e) {
            addNotification("Something went wrong", 3);
            console.log(e);
        }
    };
    const handleChangeEdit = (e) => {
        let value = e.target.value;
        console.log(e.target.name, e.target.value);

        if (e.target.name === "numberStudent") {
            value = +value;
        }
        setValueChange({
            ...valueChange,
            [e.target.name]: value,
        });
    };
    useEffect(() => {
        async function getClassCurSize() {
            try {
                const { data } = await classesServices.getClassNumberStudent(
                    nameClass
                );
                setCurNumberStudent(data.numberStudent);
            } catch (e) {
                console.log(e);
            }
        }
        getClassCurSize();
        const data = classId.filter((item) => item.name === nameClass);
        if (data.length !== 0) {
            setId(data[0].id);
            setValueChange({
                ...valueChange,
                id: data[0].id,
            });
        }
    }, [nameClass]);
    return (
        <Card
            className={cn(styles.card, className)}
            title="Class Update"
            classTitle="title-green"
        >
            <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                            onChange={handleChangeTab}
                            aria-label="lab API tabs example"
                        >
                            <Tab
                                label="Create Class"
                                value="1"
                                sx={{
                                    color: "#ffffff",
                                    marginBottom: "14px",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    lineHeight: 1.7142857143,
                                }}
                            />
                            <Tab
                                label="Update Class"
                                value="2"
                                sx={{
                                    color: "#ffffff",
                                    marginBottom: "14px",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    lineHeight: 1.7142857143,
                                }}
                            />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <form
                            className={styles.description}
                            onSubmit={handleSubmitCreate}
                        >
                            <div className={styles.group}>
                                <TextInput
                                    className={styles.field}
                                    label="Class Name"
                                    name="name"
                                    type="text"
                                    placeholder="Value"
                                    required
                                    handleChange={handleChangeCreate}
                                />
                                <TextInput
                                    className={styles.field}
                                    label="Student Number"
                                    name="numberStudent"
                                    type="number"
                                    placeholder="Value"
                                    required
                                    handleChange={handleChangeCreate}
                                />
                            </div>
                            <div
                                style={{
                                    color: "#ffffff",
                                    marginBottom: "14px",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    lineHeight: 1.7142857143,
                                    marginTop: "1rem",
                                }}
                            >
                                Grades
                            </div>
                            <Dropdown
                                value={grade}
                                setValue={setGrade}
                                options={gradeOptions}
                                className={cn(styles.dropDown)}
                            />
                            <div className={styles.buttonContainer}>
                                <button className={cn("button")} type="submit">
                                    Save
                                </button>
                            </div>
                        </form>
                    </TabPanel>
                    <TabPanel value="2">
                        <div
                            style={{
                                marginBottom: "14px",
                                fontSize: "14px",
                                fontWeight: 600,
                                lineHeight: 1.7142857143,
                            }}
                        >
                            List class
                        </div>
                        <Dropdown
                            value={nameClass}
                            setValue={setNameClass}
                            options={allClasses}
                            className={cn(styles.dropDown)}
                        />
                        <form
                            className={styles.description}
                            onSubmit={handleSubmitChange}
                        >
                            <TextInput
                                className={styles.field}
                                label="Class Name"
                                name="name"
                                type="text"
                                placeholder="Value"
                                required
                                handleChange={handleChangeEdit}
                            />
                            <TextInput
                                className={styles.field}
                                label="Student Number"
                                name="numerStudent"
                                type="text"
                                placeholder="Value"
                                required
                                disabled
                                value={curNumberStudent}
                                handleChange={handleChangeEdit}
                            />
                            <TextInput
                                className={styles.field}
                                label="New Student Number"
                                name="numberStudent"
                                type="text"
                                placeholder="Value"
                                handleChange={handleChangeEdit}
                            />

                            <div className={styles.buttonContainer}>
                                <button className={cn("button")} type="submit">
                                    Save
                                </button>
                            </div>
                        </form>
                    </TabPanel>
                </TabContext>
            </Box>
        </Card>
    );
};

export default NameAndDescription;
