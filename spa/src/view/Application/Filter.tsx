import React, { useState, useEffect } from "react";
import arrow from '../../assets/arrow.png';
import { List } from './List';
import { NavLink } from "react-router-dom";

export interface Props {}

interface Per {
    id: number,
    label: string
}

const per: Per[] = [
    {
        id: 1,
        label: "Hier"
    },
    {
        id: 2,
        label: "1 Semaine"
    },
    {
        id: 3,
        label: "1 Mois"
    },
    {
        id: 4,
        label: "3 Mois"
    },
    {
        id: 5,
        label: "6 Mois"
    },
    {
        id: 6,
        label: "1 An"
    },
    {
        id: 7,
        label: "Tout"
    }
];

export const Filter: React.FunctionComponent<Props> = () => {
    const [period, setPeriod] = useState<Per>(per[0]);

    function togglePrevious() {
        if (period.id == 1) {
            return setPeriod(per[per.length - 1]);
        }
        return setPeriod(per[period.id - 2]);
    }

    function toggleNext() {
        if (period.id == per.length) {
            return setPeriod(per[0]);
        }
        return setPeriod(per[period.id]);
    }

    const state = {data : period.label}

    return (
        <div>
                <nav className="pagination is-centered" role="navigation" aria-label="pagination">
                    <div className="pagination-previous" id="previous"><img src={arrow} onClick={() => togglePrevious()} /></div>
                    <ul className="pagination-list">
                        <h1>{period.label}</h1>
                    </ul>
                    <div className="pagination-next"><img src={arrow} onClick={() => toggleNext()} /></div>
                </nav>
            <List dataFromFilter = {state.data}/>
        </div>
    )
};