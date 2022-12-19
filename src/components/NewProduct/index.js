import React, { useState } from "react";
import styles from "./StudentAdmission.module.sass";
import NameAndDescription from "./NameAndDescription";

const StudentAdmission = () => {
    return (
        <>
            <div className={styles.row}>
                <div className={styles.col}>
                    <NameAndDescription className={styles.card} />
                </div>
            </div>
        </>
    );
};

export default StudentAdmission;
