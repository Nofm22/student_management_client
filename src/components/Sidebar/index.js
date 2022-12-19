import React, { useState } from "react";
import styles from "./Sidebar.module.sass";
import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
import Icon from "../Icon";
import Dropdown from "./Dropdown";
// import Image from "../Image";
const teacherAction = ["Home", "Courses"];
const Sidebar = ({ className, onClose, data }) => {
    const [visibleHelp, setVisibleHelp] = useState(false);
    const [visible, setVisible] = useState(false);
    let navigation = [
        {
            title: "Home",
            icon: "home",
            url: "/home",
        },
        {
            title: "Grade",
            slug: "grades",
            icon: "diamond",
            to: "/products/add",
            hideArrow: false,
            dropdown: [
                {
                    title: "Grade 10",
                    url: "/grades/10",
                    counter: "2",
                },
                {
                    title: "Grade 11",
                    url: "/grades/11",
                    counter: "2",
                },
                {
                    title: "Grade 12",
                    url: "/grades/12",
                    counter: "2",
                },
                {
                    title: "Create Class",
                    url: "/createClass",
                },
            ],
        },
        {
            title: "Student Detail",
            slug: "students",
            icon: "profile-circle",
            url: "/students/list",
        },
        {
            title: "Statistics",
            icon: "heart",
            url: "/statistics",
        },
        {
            title: "Courses",
            slug: "courses",
            icon: "pie-chart",
            dropdown: [
                {
                    title: "Math",
                    url: "/subject/Math",
                },
                {
                    title: "Physics",
                    url: "/subject/Physics",
                },
                {
                    title: "Chemistry",
                    url: "/subject/Chemistry",
                },
                {
                    title: "Biology",
                    url: "/subject/Biology",
                },
                {
                    title: "History",
                    url: "/subject/History",
                },
                {
                    title: "Geography",
                    url: "/subject/Geography",
                },
                {
                    title: "Literature",
                    url: "/subject/Literature",
                },
                {
                    title: "Civics",
                    url: "/subject/Civics",
                },
                {
                    title: "Physical Education",
                    url: "/subject/PhysicalEducation",
                },
                {
                    title: "Create Course",
                    url: "/createCourse",
                },
            ],
        },
        {
            title: "Student Admission",
            icon: "promotion",
            url: "/students/add",

            hideArrow: true,
        },
    ];
    console.log(data);
    const { courseName, teacher, user } = data;
    if (user?.role === "teacher") {
        navigation = navigation.filter((item) => {
            if (item.title === "Home") {
                return item;
            } else if (item.title === "Courses") {
                const dropdown = item.dropdown.filter(
                    (drop) => drop.title === courseName
                );

                item.dropdown = dropdown;
                return {
                    ...item,
                };
            }
        });
    }

    console.log(navigation);
    return (
        <>
            <div
                className={cn(styles.sidebar, className, {
                    [styles.active]: visible,
                })}
            >
                <button className={styles.close} onClick={onClose}>
                    <Icon name="close" size="24" />
                </button>
                <Link className={styles.logo} to="/" onClick={onClose}>
                    {/* <Image
                        className={styles.pic}
                        src="/images/logo-dark.png"
                        srcDark="/images/logo-light.png"
                        alt="Core"
                    /> */}
                </Link>
                <div className={styles.menu}>
                    {navigation.map((x, index) =>
                        x.url ? (
                            <NavLink
                                className={styles.item}
                                activeClassName={styles.active}
                                to={x.url}
                                key={index}
                                exact
                                onClick={onClose}
                            >
                                <Icon name={x.icon} size="24" />
                                {x.title}
                            </NavLink>
                        ) : (
                            <Dropdown
                                className={styles.dropdown}
                                visibleSidebar={visible}
                                setValue={setVisible}
                                key={index}
                                item={x}
                                onClose={onClose}
                            />
                        )
                    )}
                </div>
                <button
                    className={styles.toggle}
                    onClick={() => setVisible(!visible)}
                >
                    <Icon name="arrow-right" size="24" />
                    <Icon name="close" size="24" />
                </button>
            </div>
        </>
    );
};

export default Sidebar;
