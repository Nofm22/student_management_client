import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../Card";
import TextInput from "../../../TextInput";
import Dropdown from "../../../Dropdown";
const currentSizeClass = [
    {
        name: "10A1",
        maxSize: 34,
    },
    {
        name: "10A2",
        maxSize: 20,
    },
    {
        name: "10A3",
        maxSize: 45,
    },
];
const termOptions = ["Term 1", "Term 2"];
const NameAndDescription = ({
    className,
    value,
    student,
    term,
    setTerm,
    handleChange,
}) => {
    const navigate = useNavigate();
    const avatar = value.gender
        ? "/images/content/male.png"
        : "/images/content/female.png";
    return (
        <Card
            className={cn(styles.card, className)}
            title="View Info"
            classTitle="title-green"
        >
            <div className={styles.description}>
                <div className={styles.wrap}>
                    <div className={styles.group}>
                        <div className={styles.cardContainer}>
                            <img
                                className={styles.round}
                                src={avatar}
                                alt="user"
                                width={100}
                            />
                            <div className={styles.wrapInfo}>
                                <div className={styles.info}>
                                    <h3>Name:</h3>
                                    <h3>Date:</h3>
                                    <h3>Address:</h3>
                                    <h3>Class</h3>
                                    <h3>Phone</h3>
                                </div>
                                <div className={styles.info}>
                                    <h3>{value.name}</h3>
                                    <h3>{value.date}</h3>
                                    <h3>{value.address}</h3>
                                    <h3>{value.className}</h3>
                                    <h3>0934667489</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.scoreDetail}>
                        <div className={styles.dropdownStyle}>
                            <Dropdown
                                value={term}
                                setValue={setTerm}
                                options={termOptions}
                            />
                        </div>

                        <div className={styles.containerTable}>
                            <table className={styles.tableLatitude}>
                                <thead>
                                    <tr>
                                        <th>Subject</th>
                                        <th>Avg Mark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {student &&
                                        student?.data?.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th>{item.courseName}</th>
                                                    <td>{item.avgScore}</td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                        <div className={styles.currentClass}>
                            <div className={cn("button", styles.typeClass)}>
                                AVG:
                            </div>
                            <div className={styles.className}>
                                {student.avg}
                            </div>
                        </div>
                        <div className={styles.currentClass}>
                            <div className={cn("button", styles.typeClass)}>
                                Type:
                            </div>
                            <div className={styles.className}>
                                {student.type}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <div
                        className={cn("button")}
                        type="button"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Back
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default NameAndDescription;
