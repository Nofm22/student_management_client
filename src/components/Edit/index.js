import React, { useState } from "react";
import styles from "./StudentAdmission.module.sass";
import NameAndDescription from "./NameAndDescription";
import { useLocation } from "react-router-dom";
const StudentAdmission = () => {
    const { pathname, state } = useLocation();
    const [space, edit, typeEdit, id] = pathname.split("/");
    return (
        <>
            <div className={styles.row}>
                <div className={styles.col}>
                    <NameAndDescription
                        className={styles.card}
                        typeEdit={typeEdit}
                        id={id}
                        value={state.item}
                    />
                </div>
            </div>
        </>
    );
};

export default StudentAdmission;
