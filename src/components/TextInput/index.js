import React from "react";
import cn from "classnames";
import styles from "./TextInput.module.sass";
import Icon from "../Icon";

const TextInput = ({
    className,
    classLabel,
    classInput,
    label,
    icon,
    copy,
    tooltip,
    handleChange,
    place,
    value,
    ...props
}) => {
    return (
        <div
            className={cn(
                styles.field,
                { [styles.fieldIcon]: icon },
                { [styles.fieldCopy]: copy },
                className
            )}
        >
            {label && (
                <div className={cn(classLabel, styles.label)}>{label} </div>
            )}
            <div className={styles.wrap}>
                <input
                    className={cn(classInput, styles.input)}
                    {...props}
                    onChange={handleChange}
                    value={value}
                />
                {icon && (
                    <div className={styles.icon}>
                        <Icon name={icon} size="24" />{" "}
                    </div>
                )}
                {copy && (
                    <button className={styles.copy}>
                        <Icon name="copy" size="24" />{" "}
                    </button>
                )}
            </div>
        </div>
    );
};

export default TextInput;
