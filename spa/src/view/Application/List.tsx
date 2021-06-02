import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { NavLink, useParams } from "react-router-dom";
import "../../index.css";
import { Filter } from "./Filter";

import { DateTime } from "luxon";
import { any, props } from "ramda";

export interface Props {
  dataFromFilter: string;
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export interface Example {
  id: number;
  mot: string;
  traduction: string;
  date: DateTime;
  gapDate: number;
}

export let example = [
  {
    id: 0,
    mot: "lapin",
    traduction: "rabbit",
    date: DateTime.fromObject({ year: 2021, month: 6, day: 1 }),
    gapDate: 0,
  },
  {
    id: 1,
    mot: "chat",
    traduction: "cat",
    date: DateTime.fromObject({ year: 2021, month: 5, day: 27 }),
    gapDate: 0,
  },
  {
    id: 2,
    mot: "chien",
    traduction: "dog",
    date: DateTime.fromObject({ year: 2019, month: 6, day: 10 }),
    gapDate: 0,
  },
];

let examples: Example[] = example;
let filterData: any = [];
let indent: any = [];

let arrGapDays: number[] = [];

function gap(arrGapDays: number[]) {
  for (var i = 0; i < example.length; i++) {
    const days = example[i].date.diffNow("day");
    const gapDays = days.days;
    if (arrGapDays.length < example.length) {
      arrGapDays.push(gapDays);
    } else {
      arrGapDays.splice(example[i].id, 1, gapDays);
    }
  }
}

const selectPeriod = (stringPeriod: string) => {
  examples.map((x) => (x.gapDate = arrGapDays[x.id]));
  console.log(examples);

  switch (stringPeriod) {
    case "Hier":
      console.log("HIER");
      filter(-2);
      break;
    case "1 Semaine":
      console.log("1 SEMAINE");
      filter(-8);
      break;
    case "Tout":
      filter(-10000);
      break;
    default:
      return;
  }
};

function filter(gapDay: number) {
  filterData = examples.filter((x) => x.gapDate >= gapDay);
  indent = filterData;
  console.log(indent);
}

export const List: React.FunctionComponent<Props> = (dataFromFilter) => {
  const period = dataFromFilter;
  const classes = useStyles();
  let indents: any = [];
    console.log(indent)
    console.log(examples)
  gap(arrGapDays);


  useEffect(() => {
    selectPeriod(period.dataFromFilter);
    console.log(indent)
  });


    for (var i = 0; i < indent.length; i++) {
        console.log(indent[i].mot);
        indents.push(
          <Card
            className={classes.root}
            style={{
              textAlign: "center",
              backgroundColor: "gray",
              margin: "3%",
            }}
            key={indent[i].id.toString()}
          >
            <CardContent>
              <Typography variant="h5" component="h2">
                {indent[i].mot}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {indent[i].traduction}
              </Typography>
            </CardContent>
            <NavLink to={"/detail/" + i}>
              <CardActions
                style={{
                  justifyContent: "center",
                }}
              >
                <Button size="small">Learn More</Button>
              </CardActions>
            </NavLink>
          </Card>
        );
      }
  
  console.log(filterData)
  console.log(indents);
  return <div id="grid">{indents}</div>;
};
