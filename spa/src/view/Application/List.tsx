import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { NavLink, useParams } from "react-router-dom";
import "../../index.css";

import { DateTime } from "luxon";

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
    mot: "Lapin",
    traduction: "Rabbit",
    date: DateTime.fromObject({ year: 2021, month: 6, day: 3 }),
    gapDate: 0,
  },
  {
    id: 1,
    mot: "Chat",
    traduction: "Cat",
    date: DateTime.fromObject({ year: 2021, month: 6, day: 1 }),
    gapDate: 0,
  },
  {
    id: 2,
    mot: "Chien",
    traduction: "Dog",
    date: DateTime.fromObject({ year: 2021, month: 5, day: 15}),
    gapDate: 0,
  },
  {
    id: 3,
    mot: "Loup",
    traduction: "Wolf",
    date: DateTime.fromObject({year: 2021, month: 4, day: 30 }),
    gapDate: 0,
  },
  {
    id: 4,
    mot: "Cheval",
    traduction: "Horse",
    date: DateTime.fromObject({ year: 2021, month: 1, day: 15}),
    gapDate: 0,
  },
  {
    id: 5,
    mot: "Canard",
    traduction: "Duck",
    date: DateTime.fromObject({ year: 2020, month: 8, day: 26}),
    gapDate: 0,
  },
  {
    id: 6,
    mot: "Serpent",
    traduction: "Snake",
    date: DateTime.fromObject({ year: 2019, month: 1, day: 2}),
    gapDate: 0,
  },
];


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

let examples: Example[] = example;
const selectPeriod = (stringPeriod: string) => {
  examples.map((x) => (x.gapDate = arrGapDays[x.id]));
  console.log(examples)
  switch (stringPeriod) {
    case "Hier":
      console.log("HIER");
      filter(-2);
      break;
    case "1 Semaine":
      console.log("1 SEMAINE");
      filter(-8);
      break;
    case "1 Mois":
      console.log("1 Mois");
      filter(-32);
      break;
    case "3 Mois":
      console.log("3 Mois");
      filter(-92);
      break;
    case "6 Mois":
      console.log("6 Mois");
      filter(-183);
      break;
    case "1 An":
      console.log("1 an");
      filter(-366);
      break;
    case "Tout":
      filter(-10000);
      break;
    default:
      return;
  }
};

let filterData: any = [];
let indent: any = [];
function filter(gapDay: number) {
  filterData = examples.filter((x) => x.gapDate >= gapDay && x.gapDate <= 0);
  indent = filterData;
}

export const List: React.FunctionComponent<Props> = (dataFromFilter) => {
  const period = dataFromFilter;
  const classes = useStyles();
  const dataIndent: any = [];

  gap(arrGapDays);
  selectPeriod(period.dataFromFilter);

  for (var i = 0; i < indent.length; i++) {
    dataIndent.push(
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

  return <div id="grid">{dataIndent}</div>;
};
