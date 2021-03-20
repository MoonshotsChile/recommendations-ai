import React, { ReactNode } from "react";
import './TutorialCard.scss';

interface CardAction {
    title: string,
    onClick: (params?: any) => any | void
}

interface TutorialCardProps {
    icon?: string,
    title?: string,
    subtitle?: string,
    action?: CardAction,
    children?:
        | JSX.Element
        | JSX.Element[]
        | string
        | string[];
}

const TutorialCard = (props: TutorialCardProps): JSX.Element => {
    return (
        <section className="tutorial">
            <div className="card">
                <div className="card-header">
                    {props.icon && (
                        <caption className="image">
                            <img src={props.icon}/>
                        </caption>
                    )}
                    {!props.icon && (
                        <p className="title">{props.title}</p>
                    )}
                </div>
                <div className="card-content">
                    {props.children}
                    {props.title && props.icon && <p className="title">{props.title}</p>}
                    {props.subtitle && <p className="subtitle">{props.subtitle}</p>}
                </div>
                <div className="card-footer">
                    <div className="card-footer-item">
                        {props.action && (
                            <button className="button is-primary is-fullwidth is-inline" onClick={props.action.onClick}>
                                {props.action.title}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TutorialCard
