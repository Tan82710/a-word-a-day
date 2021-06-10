import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { BsTrophy, BsListUl } from "react-icons/bs";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Filter} from '../Application/Filter';
import {Quizz} from '../Quizz/Quizz';

export interface Props {}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    margin: "auto",
    "text-align": "center",
  },
});

export const Header: React.FunctionComponent<Props> = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const state = { data: "Tout" };

  return (
    <div className="tabs is-centered">
      <div className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab icon={<BsListUl id="BsListUl" />} label="List" />
          <Tab icon={<BsTrophy id="BsTrophy" />} label="Quizz" />
        </Tabs>

        <TabPanel value={value} index={0}>
            <Filter />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Quizz />
          </TabPanel>
      </div>
    </div>
  );
};
