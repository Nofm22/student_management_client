import React, { useState } from "react";
import cn from "classnames";
import { Link, useLocation } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import TextInput from "../../../components/TextInput";
import Row from "../Table/Row";
import { addNotification } from "../../../utils/toastify";
import { studentServices } from "../../../services/studentServices";
const NameAndDescription = ({ className }) => {
    const { pathname, state } = useLocation();
    const { item } = state;
    const [student, setStudent] = useState(item);
    const [studentScore, setStudentScore] = useState({
        exam15: item.exam15,
        exam45: item.exam45,
        examFinal: item.examFinal,
        semester: item.semesterOne === 0 ? "SemsterTwo" : "SemesterOne",
        studentId: item.studentId,
        courseId: item.courseId,
    });
    console.log(item);
    const handleChange = (e) => {
        setStudentScore({
            ...studentScore,
            [e.target.name]: +e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(studentScore);
        try {
            const update = await studentServices.updateScore(
                item.id,
                studentScore
            );
            update.data.avatar = "/images/content/male.png";
            setStudent(update.data);
            addNotification("Updated", 0);
        } catch (e) {
            console.log(e);
            addNotification(e, 3);
        }
    };

    return (
        <Card
            className={cn(styles.card, className)}
            title="Score Detail"
            classTitle="title-green"
        >
            <form className={styles.description} onSubmit={handleSubmit}>
                <Row item={student} key={0} />
                <TextInput
                    className={styles.field}
                    label="Exam 15"
                    name="exam15"
                    type="number"
                    placeholder="Value"
                    required
                    defaultValue={student.exam15}
                    handleChange={handleChange}
                    min="0"
                    max="10"
                />
                <TextInput
                    className={styles.field}
                    name="exam45"
                    label="Exam 45"
                    type="number"
                    placeholder="Value"
                    defaultValue={student.exam45}
                    required
                    handleChange={handleChange}
                    min="0"
                    max="10"
                />
                <TextInput
                    className={styles.field}
                    name="examFinal"
                    label="Exam Final"
                    type="number"
                    placeholder="Value"
                    required
                    defaultValue={student.examFinal}
                    handleChange={handleChange}
                    min="0"
                    max="10"
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
