import React, { useRef, useState } from "react";
import styles from "./Row.module.sass";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../TextInput";
const Row = ({
    item,
    value,
    onChange,
    activeTable,
    setActiveTable,
    activeId,
    setActiveId,
    pathname,
    handleChange,
    multipleScoreUpdate,
}) => {
    const handleClick = (id) => {
        navigate(`/edit/score/${item.studentId}`, {
            state: { item },
        });
    };
    const navigate = useNavigate();
    return (
        <>
            <div
                className={cn(
                    styles.row,
                    { [styles.selected]: activeId === item.id },
                    { [styles.active]: activeTable }
                )}
                onClick={() => handleClick(item.id)}
            >
                <div className={styles.col}>{item.id}</div>

                <div className={styles.col}>
                    <div className={styles.item}>
                        <div className={styles.avatar}>
                            <img src={item.avatar} alt="Avatar" />
                        </div>
                        <div className={styles.details}>
                            <div className={styles.user}>{item.name}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.col}>
                    <div className={cn("status-green-dark", styles.purchase)}>
                        {item.exam15}
                    </div>
                </div>
                <div className={styles.col}>
                    <div className={cn("status-green-dark", styles.purchase)}>
                        {item.exam45}
                    </div>
                </div>
                <div className={styles.col}>
                    <div className={cn("status-green-dark", styles.purchase)}>
                        {item.examFinal}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Row;
