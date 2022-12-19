import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from "./StudentAdmission.module.sass";
import NameAndDescription from "./NameAndDescription";
import { useLocation } from "react-router-dom";
import {
    classesServices,
    studentServices,
} from "../../../services/studentServices";
const GradesEdit = () => {
    const { pathname, state } = useLocation();
    const [space, edit, typeEdit, id] = pathname.split("/");
    const [classOptions, setClassOptions] = useState([]);
    const [currentSizeClass, setCurrentSizeClass] = useState([]);
    const [nameClassId, setNameClass] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nameClassId === "") {
            return;
        }
        try {
            await classesServices.changeClass(id, nameClassId);
            await getStudent();
            await getClassCurSize();
        } catch (e) {
            console.log(e);
        }
    };
    async function getClassCurSize() {
        try {
            const { data } = await studentServices.getListStudents(id);
            const classes = await classesServices.getClass(data.classId);

            const grades = await classesServices.getClassCurSize(state.gradeId);
            console.log(studentClass);
            let getClassNotFull = grades?.data.filter((item) => {
                if (
                    item.name !== classes.data.name &&
                    item.curSize < item.maxSize
                ) {
                    return item.name;
                }
            });
            getClassNotFull = getClassNotFull.map((item) => item.name);
            console.log(getClassNotFull);
            setStudentClass(classes.data.name);
            setClassOptions(getClassNotFull);
            setCurrentSizeClass(grades?.data);
        } catch (e) {
            console.log(e);
            setCurrentSizeClass([]);
            setClassOptions([]);
            setStudentClass("");
        }
    }
    async function getStudent() {
        try {
            const { data } = await studentServices.getListStudents(id);
            const classes = await classesServices.getClass(data.classId);
            console.log(classes.data.name);
            setStudentClass(classes.data.name);
        } catch (e) {
            console.log(e);
            setStudentClass("");
        }
    }
    useLayoutEffect(() => {
        async function init() {
            await getStudent();
        }
        init();
    }, []);
    useEffect(() => {
        async function init() {
            await getStudent();
            await getClassCurSize();
        }
        init()
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
    }, []);
    return (
        <>
            <div className={styles.row}>
                <div className={styles.col}>
                    <NameAndDescription
                        className={styles.card}
                        typeEdit={typeEdit}
                        id={id}
                        value={state.item}
                        gradeId={state.gradeId}
                        nameClass={studentClass}
                        classOptions={classOptions}
                        currentSizeClass={currentSizeClass}
                        nameClassId={nameClassId}
                        setNameClass={setNameClass}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
        </>
    );
};

export default GradesEdit;
