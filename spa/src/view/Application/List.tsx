import React, {useCallback} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";
import "../../index.css";
import {Add} from "../Application/Add";
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';

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

export interface Translation {
  id: number;
  mot: string;
  traduction: string;
  date: DateTime;
  note : string;
  gapDate: number;
}

export let liste : Translation[] = [
  {
    id: 0,
    mot: "Lapin",
    traduction: "Rabbit",
    date: DateTime.fromObject({ year: 2021, month: 6, day: 14 }),
    note : "blabla",
    gapDate: 0,
  },
  {
    id: 1,
    mot: "Chat",
    traduction: "Cat",
    date: DateTime.fromObject({ year: 2021, month: 6, day: 13 }),
    note : "blabla",
    gapDate: 0,
  },
  {
    id: 2,
    mot: "Chien",
    traduction: "Dogggggggg",
    date: DateTime.fromObject({ year: 2021, month: 6, day: 1}),
    note : "blabla",
    gapDate: 0,
  },
  {
    id: 3,
    mot: "Loup",
    traduction: "Wolf",
    date: DateTime.fromObject({year: 2021, month: 4, day: 30 }),
    note : "blabla",
    gapDate: 0,
  },
  {
    id: 4,
    mot: "Cheval",
    traduction: "Horse",
    date: DateTime.fromObject({ year: 2021, month: 1, day: 15}),
    note : "blabla",
    gapDate: 0,
  },
  {
    id: 5,
    mot: "Canard",
    traduction: "Duck",
    date: DateTime.fromObject({ year: 2020, month: 8, day: 26}),
    note : "blabla",
    gapDate: 0,
  },
  {
    id: 6,
    mot: "Serpent",
    traduction: "Snake",
    date: DateTime.fromObject({ year: 2019, month: 1, day: 2}),
    note : "blabla",
    gapDate: 0,
  },
];

let arrGapDays: number[] = [];
function gap(arrGapDays: number[]) {
  for (var i = 0; i < liste.length; i++) {
    const days = liste[i].date.diffNow("day");
    const gapDays = days.days;
    if (arrGapDays.length < liste.length) {
      arrGapDays.push(gapDays);
    } else {
      arrGapDays.splice(liste[i].id, 1, gapDays);
    }
  }
}

let listes: Translation[] = liste;
const selectPeriod = (stringPeriod: string) => {

  listes.map((x) => (x.gapDate = arrGapDays[x.id]));
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
  filterData = listes.filter((x) => x.gapDate >= gapDay && x.gapDate <= 1);
  indent = filterData;
  console.log(indent)
}

// export const deleteWord = (data : Liste) => {
//   deleteWords(data)
// }

// let check : boolean;
// export const deleteWord = (data : Liste) => {
//   console.log('Delete !')
//   const index = listes.indexOf(data);
//   if(check == false){
//     console.log('FALSE')
//     return 
//   }else if(check == true ){
//     listes.splice(index, 1)
//   }
// }

export let myPeriod : string ;

export const List: React.FunctionComponent<Props> = (dataFromFilter) => {

  console.log(localStorage.getItem('arr') || '');
  function deleteWords(data : Translation){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: { isConfirmed: any; }) => {
      console.log(result.isConfirmed)
      if (result.isConfirmed) { 
        // check = result.isConfirmed;
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
          const index = listes.indexOf(data);
          listes.splice(index, 1)
          test()
      }
    })
  }
  
  function test(){
    handleOnClick()
  }

  const history = useHistory();
  const handleOnClick = useCallback(() => history.push('/'), [history]);

  const period = dataFromFilter.dataFromFilter;
  myPeriod = period;
  const classes = useStyles();
  const dataIndent: any = [];

  const arr : string[] = [];
  let newWord : Translation;

  const updateList = (data : string) => {
    if(arr.length<2){
      localStorage.setItem('arr', data);
      arr.push(localStorage.getItem('arr') || '');
    }else{
      //On enlève la première data et on en ajoute une en dernière position.
      arr.splice(0)
      arr.push(data);
    }
    //Notre nouveau mot
    newWord = {
      id: liste.length,
      mot: arr[0],
      traduction: arr[1],
      date: DateTime.local(),
      note : arr[3],
      gapDate: 0,
    }
    if(arr.length == 2){
      if(arr[0] != "" && arr[1] != ""){
        liste.push(newWord);
      }
    }else{
      return data;
    } 
  }


  gap(arrGapDays);
  selectPeriod(period);

  for (var i = 0; i < indent.length; i++) {
    //const id permet d'adapter l'id pour le detail
    const id = listes.indexOf(indent[i]);
    const data = indent[i];
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
        <NavLink to={"/detail/" + id}>
          <CardActions
            style={{
              justifyContent: "center",
            }}
          >
            <Button size="small">Learn More</Button>
          </CardActions>
        </NavLink>
        <NavLink to={"/"}>
        <Button onClick={() => deleteWords(data)}>Delete</Button>
        </NavLink>
      </Card>
    );
  }

  return <div id="space">
    {dataIndent}
  <Add updateList={updateList}/>
  </div>;
};
