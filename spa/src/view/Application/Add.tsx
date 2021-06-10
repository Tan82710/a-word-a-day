import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import { NavLink } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { GrAdd } from "react-icons/gr";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

export interface Props {
  updateList : (arg: string) => void
}

export interface Label {
  id : number;
  name : string;
  data : string
}

export const labels : Label[] = [
  {id: 0, name: "Mot", data: "" },
  {id: 1, name: "Traduction", data: "" },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "500px",
      padding : "20% 10% 10% 10%",
      '& > *': {
        margin: "auto",
      },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    form: {
      padding: "20px 0px 10px 70px",
      width: "500px",
    },
    button: {

    },
  })
);

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  let [word, setWord] = React.useState<string>("");
  let [translation, setTranslation ] = React.useState<string>("");

  const handleClose = () => {
    onClose(selectedValue);
  };

  function Add(word : string, translation : string) {
    labels[0].data = word;
    labels[1].data = translation;
    console.log(labels)
    handleClose();
    return labels;
  }

  const handleChangeWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  }

  const handleChangeTranslation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTranslation(event.target.value);
  }

  return (
        <form className={classes.form} noValidate autoComplete="off" >
        <InputLabel htmlFor="component-simple">Mot :</InputLabel>
        <Input id="component-simple" value={word} onChange={handleChangeWord}  />
        <InputLabel htmlFor="component-simple">Traduction</InputLabel>
        <Input id="component-simple" value={translation} onChange={handleChangeTranslation}  />
        <NavLink to={"/"}>
        <ListItem className={classes.form} autoFocus button onClick={() => Add(word, translation)}>
          <Button variant="contained" color="primary">
            Add
          </Button>
        </ListItem>
        </NavLink>
        </form>   
  );
}

export const Add: React.FunctionComponent<Props> = ({updateList}) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = (value: string) => {
    setOpen(false);
    for(var i=0; i < labels.length; i++){
      updateList(labels[i].data)
    }
  };
  
  return (
    <div>
      <div id="circle">
        <IconButton onClick={handleClickOpen}>
          <GrAdd id="GrAdd" />
        </IconButton>
      </div>
      <div className={classes.root}>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle className={classes.form} id="simple-dialog-title">Ajouter un mot</DialogTitle>
        <SimpleDialog selectedValue="value" open={open} onClose={handleClose} />
      </Dialog>
    </div>
    </div>
  );
};
