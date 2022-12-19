import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import TextInput from "../../../components/TextInput";
import {
    classesServices,
    studentServices,
} from "../../../services/studentServices";
import Dropdown from "../../Dropdown";
import { addNotification } from "../../../utils/toastify";

const genderOptions = ["Male", "Female"];

const NameAndDescription = ({ className }) => {
    const [classes, setClasses] = useState([]);
    const [value, setValueClass] = useState("10A1");
    const [gender, setGender] = useState("Male");
    useEffect(() => {
        async function getClasses() {
            try {
                const classes = await classesServices.getClassNotFull();
                const { data } = classes;
                const listNameClasses = data.map((item) => item.name);
                console.log(listNameClasses);
                setClasses(listNameClasses);
            } catch (e) {
                setClasses([]);
                console.log(e);
            }
        }
        getClasses();
    }, []);
    const [userInfo, setUserInfo] = useState({
        name: "",
        date: "",
        address: "",
        email: "",
        classId: "",
        gender: 0,
    });

    const handleChange = (e) => {
        userInfo[e.target.name] = e.target.value;
        console.log(e.target.name, e.target.value);
        console.log(userInfo);
        setUserInfo({
            ...userInfo,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        userInfo.classId = value;
        if (gender === "Male") {
            userInfo.gender = 1;
        } else {
            userInfo.gender = 0;
        }
        try {
            addNotification("New student created", 0);
            const student = await studentServices.createStudent(userInfo);
            console.log(student);
        } catch (e) {
            addNotification("Something went wrong", 3);
            console.log(e);
        }
    };
    return (
        <Card
            className={cn(styles.card, className)}
            title="Student Addmission"
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
                        name="date"
                        label="Date"
                        type="date"
                        placeholder="yyyy-mm-dd"
                        required
                        handleChange={handleChange}
                    />
                </div>
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
                    name="address"
                    label="Address"
                    type="text"
                    placeholder="Value"
                    required
                    handleChange={handleChange}
                />
                <div>Gender</div>
                <Dropdown
                    value={gender}
                    setValue={setGender}
                    options={genderOptions}
                    className={cn(styles.dropDown)}
                />
                <div style={{ marginTop: "1rem" }}>Class</div>
                <Dropdown
                    value={value}
                    setValue={setValueClass}
                    options={classes}
                    className={cn(styles.dropDown)}
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
