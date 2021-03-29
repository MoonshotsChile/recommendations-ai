import React from "react";

interface ListItemProps {
    icon: string,
    text: string
}

const ListItem = (props: ListItemProps) => {
    return (
        <li style={{listStyleImage: `url(${props.icon})`}}>
            <span className="icon-text">{props.text}</span>
        </li>
    )
}

export default ListItem
