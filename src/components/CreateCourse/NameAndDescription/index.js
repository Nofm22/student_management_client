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
import {
    classesServices,
    coursesServices,
} from "../../../services/studentServices";
import { addNotification } from "../../../utils/toastify";
const gradeOptions = ["10", "11", "12"];
const NameAndDescription = ({ className }) => {
    const [value, setValue] = React.useState("1");
    const [courseId, setCourseId] = useState(0);
    const [gradeEdit, setGradeEdit] = React.useState("10");
    const [course, setCourse] = useState("Math");
    const [gradeChange, setGradeChange] = React.useState("10");
    const [listIdCourse, setListIdCourse] = useState([]);
    const [courses, setCourses] = useState([]);
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
        passScore: null,
        gradeId: null,
    });
    const [valueChange, setValueChange] = useState({
        name: "",
        passScore: null,
        id: 1,
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
        if (e.target.name === "passScore") {
            value = +value;
        }

        setValueCreate({
            ...valueCreate,
            [e.target.name]: value,
        });
    };
    useEffect(() => {
        let gradeId = 0;
        if (gradeEdit === "10") {
            gradeId = 1;
        } else if (gradeEdit === "11") {
            gradeId = 2;
        } else {
            gradeId = 3;
        }
        setValueCreate({
            ...valueCreate,
            gradeId,
        });
    }, [gradeEdit]);
    useEffect(() => {
        async function getCourses() {
            let gradeId = 0;
            console.log(gradeChange);
            if (gradeChange === "10") {
                gradeId = 1;
            } else if (gradeChange === "11") {
                gradeId = 2;
            } else {
                gradeId = 3;
            }
            console.log(gradeId);
            try {
                const { data } = await coursesServices.getCoursesByGrade(
                    gradeId
                );
                const item = data.map((item) => item.name);
                const ids = data.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        gradeId: item.gradeId,
                    };
                });
                setListIdCourse(ids);
                setCourse(item[0]);
                setCourses(item);
            } catch (e) {
                console.log(e);
            }
        }
        getCourses();
    }, [gradeChange]);
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
            const newCourse = await coursesServices.createCourse(valueCreate);
            addNotification("New course created", 0);
        } catch (e) {
            addNotification("Something went wrong", 3);
            console.log(e);
        }
    };
    const handleChangeEdit = (e) => {
        let value = e.target.value;
        console.log(e.target.name, e.target.value);

        if (e.target.name === "passScore") {
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
    useEffect(() => {
        console.log(course);
        let gradeId = 0;
        console.log(gradeChange);
        if (gradeChange === "10") {
            gradeId = 1;
        } else if (gradeChange === "11") {
            gradeId = 2;
        } else {
            gradeId = 3;
        }
        const id = listIdCourse.filter(
            (item) => item.name === course && item.gradeId === gradeId
        );
        console.log(listIdCourse);
        console.log(gradeChange, course, id);
        if (id.length !== 0) {
            //setCourseId(id[0].id);
            setValueChange({
                ...valueChange,
                id: id[0].id,
            });
        }
    }, [course]);
    return (
        <Card
            className={cn(styles.card, className)}
            title="Course Edit"
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
                                label="Create Course"
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
                                label="Update Course"
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
                                    label="Course Name"
                                    name="name"
                                    type="text"
                                    placeholder="Value"
                                    required
                                    handleChange={handleChangeCreate}
                                />
                                <TextInput
                                    className={styles.field}
                                    label="Score Pass"
                                    name="passScore"
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
                                value={gradeEdit}
                                setValue={setGradeEdit}
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
                            List Grades
                        </div>
                        <Dropdown
                            value={gradeChange}
                            setValue={setGradeChange}
                            options={gradeOptions}
                            className={cn(styles.dropDown)}
                        />
                        <div
                            style={{
                                marginTop: "14px",
                                marginBottom: "14px",
                                fontSize: "14px",
                                fontWeight: 600,
                                lineHeight: 1.7142857143,
                            }}
                        >
                            List Courses
                        </div>
                        <Dropdown
                            value={course}
                            setValue={setCourse}
                            options={courses}
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
                                label="Score Pass"
                                name="passScore"
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
