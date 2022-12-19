import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Entry.module.sass";
import TextInput from "../../../components/TextInput";
import Dropdown from "../../Dropdown";
import {
    coursesServices,
    usersServices,
} from "../../../services/studentServices";
import { addNotification } from "../../../utils/toastify";
import { useNavigate } from "react-router-dom";
const gradeOptions = ["10", "11", "12"];
const Entry = (props) => {
    const navigate = useNavigate();
    const [classOptions, setClassOptions] = useState(["10A1"]);
    const [listIdCourse, setListIdCourse] = useState([]);
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState("Math");
    const [gradeChange, setGradeChange] = React.useState("10");
    const [className, setClass] = useState("");
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
        date: "",
        gradeId: null,
        courseName: null,
    });
    const handleChange = (e) => {
        let value = e.target.value;
        console.log(e.target.name, e.target.value);
        setData({
            ...data,
            [e.target.name]: value,
        });
    };
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
        let gradeId = 0;
        console.log(gradeChange);
        if (gradeChange === "10") {
            gradeId = 1;
        } else if (gradeChange === "11") {
            gradeId = 2;
        } else {
            gradeId = 3;
        }
        setData({
            ...data,
            gradeId,
        });
        getCourses();
    }, [gradeChange]);
    useEffect(() => {
        console.log(course);
        setData({
            ...data,
            courseName: course,
        });
    }, [course]);
    const handleSubmitChange = async (e) => {
        e.preventDefault();
        try {
            console.log(data);
            const newUser = await usersServices.register(data);
            localStorage.setItem("access_token", newUser.token);
            navigate("/home");
            addNotification("New Users created", 0);
        } catch (e) {
            const { statusCode, message } = e.data;
            console.log(message);
            //console.log(e.data.message);
            addNotification("Email is existed.", 3);
        }
    };
    return (
        <div className={styles.entry}>
            <div className={styles.body}>
                <form
                    className={styles.description}
                    onSubmit={handleSubmitChange}
                >
                    <TextInput
                        className={styles.field}
                        name="username"
                        type="text"
                        placeholder="User Name"
                        required
                        icon="mail"
                        handleChange={handleChange}
                    />
                    <TextInput
                        className={styles.field}
                        name="email"
                        type="email"
                        placeholder="Your email"
                        required
                        icon="mail"
                        handleChange={handleChange}
                    />
                    <TextInput
                        className={styles.field}
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        icon="lock"
                        handleChange={handleChange}
                    />
                    <TextInput
                        className={styles.field}
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        required
                        icon="diamond"
                        handleChange={handleChange}
                    />
                    <TextInput
                        className={styles.field}
                        name="date"
                        type="date"
                        placeholder="Date"
                        required
                        icon="expand"
                        handleChange={handleChange}
                    />

                    <div
                        style={{
                            marginBottom: "14px",
                            fontSize: "14px",
                            fontWeight: 600,
                            lineHeight: 1.7142857143,
                        }}
                    >
                        <Dropdown
                            value={gradeChange}
                            setValue={setGradeChange}
                            options={gradeOptions}
                            className={cn(styles.dropDown)}
                        />
                    </div>
                    <div
                        style={{
                            marginTop: "14px",
                            marginBottom: "14px",
                            fontSize: "14px",
                            fontWeight: 600,
                            lineHeight: 1.7142857143,
                        }}
                    >
                        <Dropdown
                            value={course}
                            setValue={setCourse}
                            options={courses}
                            className={cn(styles.dropDown)}
                        />
                    </div>

                    <button className={cn("button", styles.button)}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Entry;
