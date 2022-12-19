import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../Card";
import TextInput from "../../../TextInput";
import Dropdown from "../../../Dropdown";
const NameAndDescription = ({
    className,
    value,
    gradeId,
    nameClass,
    classOptions,
    currentSizeClass,
    nameClassId,
    setNameClass,
    handleSubmit,
}) => {
    return (
        <Card
            className={cn(styles.card, className)}
            title="Change Class"
            classTitle="title-green"
        >
            <div className={cn(styles.row)}>
                <div className={styles.col}>
                    <div className={styles.item}>
                        <div className={styles.avatar}>
                            <img src={value.avatar} alt="Avatar" />
                        </div>
                    </div>
                </div>
                <div className={styles.col}>
                    <div className={styles.email}>{value.name}</div>
                </div>
                <div className={styles.col}>
                    <div className={styles.email}>{value.email}</div>
                </div>
                <div className={styles.col}>
                    <div className={styles.scoreBold}>{value.date}</div>
                </div>
                <div className={styles.col}>
                    <div className={styles.scoreBold}>{value.address}</div>
                </div>
            </div>
            <form className={styles.description} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <div className={styles.currentClass}>
                        <div className={styles.className}>{nameClass}</div>
                        <Dropdown
                            value={nameClassId}
                            setValue={setNameClass}
                            options={classOptions}
                        />
                    </div>
                    <div className={styles.currentClass}>
                        <div className={styles.typeClass}>Current Class</div>
                        <div className={styles.typeClass}>New Class</div>
                    </div>
                </div>
                <div className={styles.containerTable}>
                    <table className={styles.tableLatitude}>
                        <thead>
                            <tr>
                                <th>Class</th>
                                <th>Current Size</th>
                                <th>Max Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentSizeClass &&
                                currentSizeClass?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <th>{item.name}</th>
                                            <td>{item.curSize}</td>
                                            <td>{item.maxSize}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
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
