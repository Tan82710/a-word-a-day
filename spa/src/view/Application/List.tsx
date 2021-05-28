import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { NavLink, useParams } from "react-router-dom";
import "../../index.css";
import {Filter} from "./Filter";

import {DateTime} from "luxon"
import { any } from "ramda";

export interface Props { }

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export interface Example {
    id : number
    mot : string
    traduction : string
    date : DateTime
    gapDate : number
}

export let example = [
    {
        id : 0,
        mot : "lapin",
        traduction : "rabbit",
        date : DateTime.fromObject({year:2021, month:5, day:27}),
        gapDate : 0
    },
    {
        id : 1,
        mot : "chat",
        traduction : "cat",
        date : DateTime.fromObject({year:2020, month:5, day:26}),
        gapDate : 0
    },
    {
        id : 2,
        mot : "chien",
        traduction : "dog",
        date : DateTime.fromObject({year:2019, month:6, day:10}), 
        gapDate : 0
    }
]

export const List: React.FunctionComponent<Props> = () => {
    const [examples, setExample] = useState<Example[]>(example)
    const classes = useStyles();
    var indents = [];
    
    const period = useParams();

    for (var i = 0; i < examples.length; i++) {
        const days = example[i].date.diffNow('day')
        const gapDays = days.days

        const stringPeriod = period.toString();
        console.log(examples[i])
        console.log(gapDays)

    //     const selectPeriod = (period : string) => {
    //         switch(period) {
    //             case 'Hier':
    //                 if(gapDays >= -2){
    //                     setExample(gapDays)
    //                 }
    //                 return updateDate;
    //             default :
    //                 return updateDate
    //         }
    //     }

    // selectPeriod(stringPeriod)
        indents.push(
            <Card className={classes.root}
                style={{
                    textAlign: 'center',
                    backgroundColor: "gray",
                    margin: "3%"
                }}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {examples[i].mot}
      </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {examples[i].traduction}
      </Typography>

                </CardContent>
                <NavLink to={"/detail/" + i}>
                <CardActions
                    style={{
                        justifyContent: "center"
                    }}>
                    <Button size="small">Learn More</Button>
                </CardActions>
                </NavLink>
            </Card>);
    }

    return (
        <div id="grid">
            {indents}
        </div>
    )
};