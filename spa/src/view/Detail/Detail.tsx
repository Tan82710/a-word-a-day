import React from "react";
import { props } from "ramda";
import Paper from "@material-ui/core/Paper";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { liste } from "./../Application/List";
import { Update } from "./Update";
import { NavLink, useParams } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import {IoMdArrowRoundBack} from "react-icons/io";

export interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexWrap: "wrap",
      padding: "20% 10% 10% 10%",
      "justify-content": "space-around",
      "& > *": {
        margin: "auto",
        width: theme.spacing(60),
      },
    },
  })
);

export const Detail: React.FunctionComponent<Props> = () => {
  const id = useParams();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

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

  const word = liste[idNbr];

  return (
    <div className={classes.root}>
      <NavLink to={"/"}>
        <div id="back">
        <IconButton>
          <IoMdArrowRoundBack id="IoMdArrowRoundBack"/>
        </IconButton>
        </div>
      </NavLink>

      <Paper elevation={3}>
        <div id="centerWord">
          <h1>
            Mot : <b>{liste[idNbr].mot}</b>
          </h1>
          <h1>
            Traduction : <b id="red">{liste[idNbr].traduction}</b>
          </h1>
        </div>
      </Paper>
      <Update newWord={word}/>
    </div>
  );
};
