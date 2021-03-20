import React from "react";

interface ListItemProps {
    icon: string,
    text: string
}

const ListItem = (props: ListItemProps) => {
    return (
        <li>
            <span className="icon">
                <i className="fa">
                    <img src={props.icon} />
                </i>
            </span>
            <span className="is-small">{props.text}</span>
        </li>
    )
}

export default ListItem
