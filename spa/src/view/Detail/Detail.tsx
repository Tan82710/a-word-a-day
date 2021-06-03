import React from "react";
import { props } from "ramda";
import { useParams } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { example } from "./../Application/List";

export interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: "auto",
        width: theme.spacing(32),
        height: theme.spacing(32),
        "text-align": "center",
      },
    },
  }),
);

export const Detail: React.FunctionComponent<Props> = () => {
  const id = useParams();
  const classes = useStyles();

  var s = JSON.stringify(id);
  let idString: string = "";
  let size = s.length;
  let idNbr = 0;

  function stringToNumber(sizeId: number) {
    console.log(s.substr(7, sizeId));
    idString = s.substr(7, sizeId);
    idNbr = Number(idString);
  }

  if (size == 10) {
    stringToNumber(1);
  } else if (size == 11) {
    stringToNumber(2);
  } else {
    stringToNumber(3);
  }

  return (
    <div className={classes.root} style={{margin : "auto"}}>
      <Paper elevation={3}>
      <h1>Mot : <b>{example[idNbr].mot}</b></h1>
      <h1>Traduction : <b id="red">{example[idNbr].traduction}</b></h1>
      </Paper>
    </div>
  );
};
