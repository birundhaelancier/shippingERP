import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Collapse, Toolbar, Divider } from "@material-ui/core";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Link, useLocation
} from "react-router-dom";
import { menu } from "./menu";
import { hasChildren } from "./utils";
import './siders.css';



export default function SiderMenu(props) {
    const [selectIndex, setSelectIndex] = useState(0)
    console.log(selectIndex, 'item')

    return menu.map((item, key) =>
        <MenuItem selected={selectIndex == key} key={key} item={item} openMenu={props.openMenu} onClick={() => setSelectIndex(key)} />
    );
}

const MenuItem = ({ item, openMenu }) => {
    const Component = hasChildren(item, openMenu) ? MultiLevel : SingleLevel;
    return <Component item={item} openMenu={openMenu} />;
};

const SingleLevel = ({ item, openMenu }) => {
    let location = useLocation()
    return (
        <ListItem button component={Link} to={item.path} className={`${item.path === location.pathname ? "activecolor" : null}`}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Link style={{ color: "black" }} to={item.path}><ListItemText primary={item.title} style={{ color: "#fff" }} /></Link>
        </ListItem>
    );
};

const MultiLevel = ({ item }) => {
    const { items: children } = item;
    const [open, setOpen] = useState(false);
    const [subOpen, setSubOpen] = useState(false);
    const [getKey, setGetKey] = useState();


    const handleClick = () => {
        setOpen((prev) => !prev);
    };
    const handleSubClick = (data) => {
        setSubOpen((prev) => !prev);
        setGetKey(data)
    };

    return (
        <React.Fragment>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={open} style={{ minHeight: "none" }} timeout="auto" className="">
                <List component="div" disablePadding>
                    {children.map((child, key) => (
                        <>
                            {child.items != undefined ?
                                <>
                                    <ListItem button onClick={()=>handleSubClick(key)}>
                                        <ListItemIcon>{item.items[key].icon}</ListItemIcon>
                                        <ListItemText primary={item.items[key].title} />
                                        {subOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </ListItem>
                                    <Collapse in={key == getKey ? subOpen : false} style={{ minHeight: "none" }} timeout="auto" className="">
                                        <List component="div" disablePadding>
                                            {child.items.map((childs, keys) => (
                                                <Link to={childs.path}><MenuItem key={keys} item={childs} /></Link>
                                            ))}
                                        </List>
                                    </Collapse>
                                </>
                                : <Link to={child.path}><MenuItem key={key} item={child} /></Link>}
                        </>

                    ))}
                </List>
            </Collapse>
        </React.Fragment>
    );

};
