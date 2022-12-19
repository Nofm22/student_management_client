import React, { useState } from "react";
import cn from "classnames";
import styles from "./SignUp.module.sass";
import { use100vh } from "react-div-100vh";
import { Link } from "react-router-dom";
import Entry from "./Entry";
import Code from "./Code";
import Image from "../../components/Image";

const items = [
    "Unlimited product uploads",
    "Pro tips",
    "Free forever",
    "Full author options",
];

const SignUp = () => {
    const heightWindow = use100vh();

    return (
        <div className={styles.row}>
            <div className={styles.col}></div>
            <div className={styles.col} style={{ minHeight: heightWindow }}>
                <div className={styles.head}>
                    <div className={styles.info}>
                        {/* Have An Account?{" "} */}
                        <Link className={styles.link} to="/home">
                            Back
                        </Link>
                    </div>
                </div>
                <div className={styles.wrapper}>
                    <div className={cn("h2", styles.title)}>Sign up</div>

                    <Entry />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
