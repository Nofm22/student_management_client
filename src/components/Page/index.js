import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Page.module.sass";
import Sidebar from "../Sidebar";
import Header from "../Header";
import authApi from "../../api/authApi";
import { useNavigate } from "react-router-dom";
const Page = ({ wide, children, title }) => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [userId, setUserId] = useState(null);
    const [data, setData] = useState({});
    useEffect(() => {
        async function auth() {
            try {
                const { data } = await authApi.verify();

                setData(data);
            } catch (e) {
                navigate("/");
                console.log(e);
            }
        }
        auth();
    }, []);
    return (
        <>
            <div className={styles.page}>
                <Sidebar
                    data={data}
                    className={cn(styles.sidebar, {
                        [styles.visible]: visible,
                    })}
                    onClose={() => setVisible(false)}
                />
                <Header data={data} onOpen={() => setVisible(true)} />
                <div className={styles.inner}>
                    <div
                        className={cn(styles.container, {
                            [styles.wide]: wide,
                        })}
                    >
                        {title && (
                            <div className={cn("h3", styles.title)}>
                                {title}
                            </div>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
