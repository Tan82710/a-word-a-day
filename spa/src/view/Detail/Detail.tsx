import React from "react";
import { props } from "ramda";
import { useParams } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { liste } from "./../Application/List";

export interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      padding : "20% 10% 10% 10%",
      '& > *': {
        margin: "auto",
        width: theme.spacing(60),
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
    <div className={classes.root}>
      <Paper elevation={3}>
        <div id="centerWord">
        <h1>Mot : <b>{liste[idNbr].mot}</b></h1>
        <h1>Traduction : <b id="red">{liste[idNbr].traduction}</b></h1>
        </div>
      </Paper>
    </div>
  );
};
