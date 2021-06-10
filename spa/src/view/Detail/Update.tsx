import React from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import IconButton from "@material-ui/core/IconButton";
import { deleteWord, Liste } from "../Application/List";
import { NavLink } from "react-router-dom";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { SimpleDialogProps, labels } from "../Application/Add";
import Button from "@material-ui/core/Button";

export interface Props {
  newWord: Liste;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "500px",
      padding: "20% 10% 10% 10%",
      "& > *": {
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
    button: {},
  })
);

export const Update: React.FunctionComponent<Props> = (newWord) => {
  const [open, setOpen] = React.useState(false);
  const data = newWord.newWord;
  const words = newWord.newWord.mot;
  const translations = newWord.newWord.traduction;

  const handleClickOpen = () => {
    console.log("OPEN");
    setOpen(true);
  };

  const classes = useStyles();
  function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;

    let [word, setWord] = React.useState<string>(words);
    let [translation, setTranslation] = React.useState<string>(translations);

    const handleCloses = () => {
      onClose(selectedValue);
    };

    //MaJ d'un mot
    const updateWord = (word: string, translation: string) => {
      data.mot = word;
      data.traduction = translation;
      console.log(word);
      return labels;
    };

    const handleChangeWord = (event: React.ChangeEvent<HTMLInputElement>) => {
      setWord(event.target.value);
      console.log(word);
    };

    const handleChangeTranslation = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setTranslation(event.target.value);
    };

    return (
      <form className={classes.form} noValidate autoComplete="off">
        <InputLabel htmlFor="component-simple">Mot :</InputLabel>
        <Input id="component-simple" value={word} onChange={handleChangeWord} />
        <InputLabel htmlFor="component-simple">Traduction</InputLabel>
        <Input
          id="component-simple"
          value={translation}
          onChange={handleChangeTranslation}
        />
        <NavLink to={"/"}>
          <ListItem
            className={classes.form}
            autoFocus
            button
            onClick={() => updateWord(word, translation)}
          >
            <Button variant="contained" color="primary">
              Update
            </Button>
          </ListItem>
        </NavLink>
      </form>
    );
  }

  const handleClose = (value: string) => {
    setOpen(false);
  };

  const deleteWords = () => {
    deleteWord(data);
  };

  return (
    <div id="box">
      <div id="circle2">
        <NavLink to={"/"}>
          <IconButton onClick={deleteWords}>
            <BsTrash id="BsTrash" />
          </IconButton>
        </NavLink>
      </div>
      <div id="circle2">
        <IconButton onClick={handleClickOpen}>
          <BsPencil id="BsPencil" />
        </IconButton>
      </div>
      <div className={classes.root}>
        <Dialog
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={open}
        >
          <DialogTitle className={classes.form} id="simple-dialog-title">
            Modifier un mot
          </DialogTitle>
          <SimpleDialog
            selectedValue="value"
            open={open}
            onClose={handleClose}
          />
        </Dialog>
      </div>
    </div>
  );
};
