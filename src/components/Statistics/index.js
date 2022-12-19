import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import cn from "classnames";
import Dropdown from "../Dropdown";
import Card from "../Card";
import styles from "../Grades/Grades.module.sass";
import NameAndDescription from "./NameAndDescription/";
import Table from "./Table";
import {
    classesServices,
    coursesServices,
    studentServices,
} from "../../services/studentServices";

const termOptions = ["Semester 1", "Semester 2"];
const Subject = () => {
    const [courses, setCourses] = useState("");
    const [term, setTerm] = useState(termOptions[0]);
    const [score, setScore] = useState([]);
    const [visible, setVisible] = useState(false);
    const [courseOptions, setCourseOptions] = useState(["10A1"]);
    const { pathname } = useLocation();
    let [space, typeEdit, courseName] = pathname.split("/");
    const [students, setStudents] = useState([]);
    let classList = useRef(null);
    const [formCourseUpdate, setFormCourseUpdate] = useState({
        courseName: "Math",
        semesterOne: 1,
        semesterTwo: 0,
    });
    useEffect(() => {
        async function getCourses() {
            try {
                let { data } = await classesServices.getCourses(-1);
                data = data.map((item) => item.name);
                data = [...new Set(data)];
                setCourses(data[0]);
                setCourseOptions(data);
            } catch (e) {
                console.log(e);
                setCourseOptions([]);
            }
        }
        getCourses();
    }, []);
    console.log(formCourseUpdate);
    useEffect(() => {
        setFormCourseUpdate({
            ...formCourseUpdate,
            courseName: courses,
            semesterOne: term === "Semester 1" ? 1 : 0,
            semesterTwo: term === "Semester 2" ? 1 : 0,
        });
    }, [term, courses]);

    const handleChange = (item) => (e) => {};
    const clickHandler = async (e) => {
        try {
            console.log(formCourseUpdate);
            const { data } = await coursesServices.getCoursesSummary(
                formCourseUpdate.courseName,
                formCourseUpdate.semesterOne,
                formCourseUpdate.semesterTwo
            );
            setScore(data);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <>
            <Card
                className={styles.card}
                title="Subject Statistics"
                classTitle={cn("title-red", styles.title)}
                classCardHead={cn(styles.head, { [styles.hidden]: visible })}
                head={
                    <>
                        <Dropdown
                            className={styles.field}
                            value={courses}
                            setValue={setCourses}
                            options={courseOptions}
                        />
                        <Dropdown
                            className={styles.field}
                            value={term}
                            setValue={setTerm}
                            options={termOptions}
                        />
                        <div className={styles.buttonContainer}>
                            <button
                                className={cn("button")}
                                onClick={clickHandler}
                            >
                                Save
                            </button>
                        </div>
                    </>
                }
            >
                <div className={cn(styles.row, { [styles.flex]: visible })}>
                    <Table
                        className={styles.table}
                        activeTable={visible}
                        setActiveTable={setVisible}
                        pathname={typeEdit}
                        data={score}
                        handleChange={handleChange}
                    />
                </div>
            </Card>
        </>
    );
};

export default Subject;
