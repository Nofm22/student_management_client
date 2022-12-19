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
    const [term, setTerm] = useState(termOptions[0]);
    const [score, setScore] = useState([]);
    const [visible, setVisible] = useState(false);
    const { pathname } = useLocation();
    let [space, typeEdit, courseName] = pathname.split("/");
    let classList = useRef(null);
    const [formCourseUpdate, setFormCourseUpdate] = useState({
        semesterOne: 1,
        semesterTwo: 0,
    });

    console.log(formCourseUpdate);
    useEffect(() => {
        setFormCourseUpdate({
            ...formCourseUpdate,
            semesterOne: term === "Semester 1" ? 1 : 0,
            semesterTwo: term === "Semester 2" ? 1 : 0,
        });
    }, [term]);

    const handleChange = (item) => (e) => {};
    const clickHandler = async (e) => {
        try {
            console.log(formCourseUpdate);
            const { data } = await coursesServices.getSemesterSummary(
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
                title="Semester Statistics"
                classTitle={cn("title-red", styles.title)}
                classCardHead={cn(styles.head, { [styles.hidden]: visible })}
                head={
                    <>
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
