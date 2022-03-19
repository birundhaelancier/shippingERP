import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Link
} from "react-router-dom";
import { menu } from "./menu";
import { hasChildren } from "./utils";
import './siders.css';



export default function SiderMenu() {
    return menu.map((item, key) => <MenuItem key={key} item={item} />);
}

const MenuItem = ({ item }) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component item={item} />;
};

const SingleLevel = ({ item }) => {
    return (
        <ListItem button>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Link style={{color: "black"}} to={item.path}><ListItemText primary={item.title} /></Link>
        </ListItem>
    );
};

const MultiLevel = ({ item }) => {
    const { items: children } = item;
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    return (
        <React.Fragment>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={open} style={{ minHeight: "none" }} timeout="auto">
                <List component="div" disablePadding>
                    {children.map((child, key) => (
                        <Link to={child.path}><MenuItem key={key} item={child} /></Link>
                    ))}
                </List>
            </Collapse>
        </React.Fragment>
    );
};
