import React, { useState } from "react";
import styles from "./Table.module.sass";
import cn from "classnames";
import Row from "./Row";

// data
// import { customers } from "../../../mocks/customers";

const Table = ({ className, activeTable, setActiveTable, pathname, data }) => {
    // const [activeId, setActiveId] = useState(customers[0].id);
    const [selectedFilters, setSelectedFilters] = useState([]);
    console.log(data);
    const handleChange = (id) => {
        if (selectedFilters.includes(id)) {
            setSelectedFilters(selectedFilters.filter((x) => x !== id));
        } else {
            setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
        }
    };

    return (
        <div className={cn(styles.wrapper, className)}>
            <div className={cn(styles.table)}>
                <div
                    className={cn(styles.row, { [styles.active]: activeTable })}
                >
                    <div className={styles.col}></div>

                    <div className={styles.col}>Name</div>
                    <div className={styles.col}>Email</div>
                    <div className={styles.col}>Class</div>
                    <div className={styles.col}>AVG</div>
                    <div className={styles.col}>Type</div>
                </div>
                {data.map((x, index) => (
                    <Row
                        item={x}
                        key={index}
                        activeTable={activeTable}
                        setActiveTable={setActiveTable}
                        // activeId={activeId}
                        // setActiveId={setActiveId}
                        value={selectedFilters.includes(x.id)}
                        onChange={() => handleChange(x.id)}
                        pathname={pathname}
                    />
                ))}
            </div>
        </div>
    );
};

export default Table;
