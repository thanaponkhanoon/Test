import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import FeedIcon from '@mui/icons-material/Feed';

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import InventoryIcon from '@mui/icons-material/Inventory';
import { NavLink } from 'react-router-dom';

const menu = [
    { name: "หน้าแรก", icon: <HomeIcon />, path: "/" },
    { name: "To-Do List", icon: <InventoryIcon />, path: "/todolist" },
];

function Appbar() {
    const [open, setOpen] = React.useState(false);

    return (
        <Box>
            <AppBar position="static"
                sx={{
                    backgroundImage: 'url(https://i.pinimg.com/736x/57/28/6d/57286df05d3470fd18ef883df200ca67.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    '@media (max-width: 600px)': {
                        height: 'auto'
                    }
                }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setOpen(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component={NavLink}
                        to="/"
                        sx={{
                            flexGrow: 1,
                            textDecoration: 'none',
                            color: 'inherit',
                            marginRight: '1200px',
                            '@media (max-width: 600px)': {
                                fontSize: '1rem'
                            }
                        }}
                    >
                        Home
                    </Typography>
                    <a
                        href="https://github.com/thanaponkhanoon/Test/blob/main/README.md"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub repository"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'inherit'
                        }}
                    >
                        <Typography>
                            Demonstrate website usage
                        </Typography>
                        <IconButton size="large" color="inherit">
                            <FeedIcon />
                        </IconButton>
                    </a>
                </Toolbar>
                <Drawer
                    variant="temporary"
                    open={open}
                    onClose={() => setOpen(false)}
                    PaperProps={{
                        sx: {
                            color: 'white',
                            width: 250,
                            height: '100%',
                            backgroundImage: 'url(https://wallpapercave.com/wp/wp5006064.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }
                    }}
                >
                    <List>
                        {menu.map((item, index) => (
                            <Link
                                to={item.path}
                                key={item.name}
                                style={{ textDecoration: "none", color: "inherit" }}
                                onClick={() => setOpen(false)}
                            >
                                <ListItem>
                                    <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Drawer>
            </AppBar>
        </Box>
    );
}

export default Appbar;
