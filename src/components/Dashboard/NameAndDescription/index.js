import React, { useState } from "react";
import cn from "classnames";
import { Link, useLocation } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import TextInput from "../../../components/TextInput";
import Row from "../Table/Row";
const NameAndDescription = ({ className }) => {
    const { pathname, state } = useLocation();
    const { item } = state;
    const [studentScore, setStudentScore] = useState({
        exam15: item.exam15,
        exam45: item.exam45,
        examFinal: item.examFinal,
        semester: item.semesterOne === 0 ? "SemsterTwo" : "SemesterOne",
        studentId: item.studentId,
        courseId: item.courseId,
    });
    const handleChange = (e) => {
        setStudentScore({
            ...studentScore,
            [e.target.name]: +e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(studentScore);
    };

    return (
        <Card
            className={cn(styles.card, className)}
            title="Score Detail"
            classTitle="title-green"
        >
            <form className={styles.description} onSubmit={handleSubmit}>
                <Row item={item} key={0} />
                <TextInput
                    className={styles.field}
                    label="Exam 15"
                    name="exam15"
                    type="number"
                    placeholder="Value"
                    required
                    defaultValue={studentScore.exam15}
                    handleChange={handleChange}
                />
                <TextInput
                    className={styles.field}
                    name="exam45"
                    label="Exam 45"
                    type="number"
                    placeholder="Value"
                    defaultValue={studentScore.exam45}
                    required
                    handleChange={handleChange}
                />
                <TextInput
                    className={styles.field}
                    name="examFinal"
                    label="Exam Final"
                    type="number"
                    placeholder="Value"
                    required
                    defaultValue={studentScore.examFinal}
                    handleChange={handleChange}
                />
                <div className={styles.buttonContainer}>
                    <button className={cn("button")} type="submit">
                        Save
                    </button>
                </div>
            </form>
        </Card>
    );
};

export default NameAndDescription;
