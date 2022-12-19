import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import TextInput from "../../../components/TextInput";
const NameAndDescription = ({ className, value }) => {
    console.log(value);
    const [studentInfo, setStudentInfo] = useState({
        name: "",
        gender: "",
        date: "",
        address: "",
        email: "",
        class: "",
        term1: 0,
        term2: 0,
    });
    const handleChange = (e) => {
        studentInfo[e.target.name] = e.target.value;
        const targetName = e.target.name;
        setStudentInfo({
            ...studentInfo,
            targetName: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(studentInfo);
    };
    return (
        <Card
            className={cn(styles.card, className)}
            title="Edit"
            classTitle="title-green"
        >
            <form className={styles.description} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <TextInput
                        className={styles.field}
                        label="Full Name"
                        name="name"
                        type="text"
                        placeholder="Value"
                        required
                        handleChange={handleChange}
                    />
                    <TextInput
                        className={styles.field}
                        name="gender"
                        label="Gender"
                        type="text"
                        placeholder="Value"
                        required
                        handleChange={handleChange}
                    />
                    <TextInput
                        className={styles.field}
                        name="date"
                        label="Date"
                        type="text"
                        placeholder="yyyy/mm/dd"
                        required
                        handleChange={handleChange}
                    />
                    <TextInput
                        className={styles.field}
                        name="address"
                        label="Address"
                        type="text"
                        placeholder="Value"
                        required
                        handleChange={handleChange}
                    />
                    <TextInput
                        className={styles.field}
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Value"
                        required
                        handleChange={handleChange}
                    />
                    <TextInput
                        className={styles.field}
                        name="class"
                        label="Class"
                        type="text"
                        placeholder="Value"
                        required
                        handleChange={handleChange}
                    />
                </div>
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
