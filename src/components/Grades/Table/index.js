import React, { useState } from "react";
import styles from "./Table.module.sass";
import cn from "classnames";
import Row from "./Row";

const Table = ({
    className,
    activeTable,
    setActiveTable,
    pathname,
    data,
    nameClass,
    gradeId,
}) => {
    const [activeId, setActiveId] = useState(data[0]?.id);

    const [selectedFilters, setSelectedFilters] = useState([]);

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
                    <div className={styles.col}>Gender</div>
                    <div className={styles.col}>Date</div>
                    <div className={styles.col}>Address</div>
                </div>
                {data.map((x, index) => (
                    <Row
                        item={x}
                        key={index}
                        activeTable={activeTable}
                        setActiveTable={setActiveTable}
                        activeId={activeId}
                        setActiveId={setActiveId}
                        value={selectedFilters.includes(x.id)}
                        onChange={() => handleChange(x.id)}
                        pathname={pathname}
                        nameClass={nameClass}
                        gradeId={gradeId}
                    />
                ))}
            </div>
        </div>
    );
};

export default Table;
