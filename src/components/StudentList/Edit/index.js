import React, { useEffect, useState } from "react";
import styles from "./StudentAdmission.module.sass";
import NameAndDescription from "./NameAndDescription";
import { useLocation } from "react-router-dom";
import { studentServices } from "../../../services/studentServices";
const StudentDetail = () => {
    const { pathname, state } = useLocation();
    const [space, name, id] = pathname.split("/");
    const [student, setStudent] = useState({});
    const [term, setTerm] = useState("Term 1");
    const handleChange = (e) => {
        setTerm(e.target.value);
    };
    useEffect(() => {
        async function getStudentDetail() {
            try {
                let student = await studentServices.getAVGStudent(id);
                console.log(term);
                let data = student.data.filter((item) => {
                    if (term === "Term 1") {
                        if (item.semesterOne === 1) {
                            return item;
                        }
                    } else {
                        if (item.semesterTwo === 1) {
                            return item;
                        }
                    }
                });
                student.data = data;
                console.log(data);
                setStudent(student);
            } catch (e) {
                console.log(e);
                setStudent({});
            }
        }
        getStudentDetail();
    }, [term]);
    return (
        <>
            <div className={styles.row}>
                <div className={styles.col}>
                    <NameAndDescription
                        className={styles.card}
                        typeEdit={""}
                        id={id}
                        value={state.item}
                        student={student}
                        term={term}
                        setTerm={setTerm}
                        handleChange={handleChange}
                    />
                </div>
            </div>
        </>
    );
};

export default StudentDetail;
