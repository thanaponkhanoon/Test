import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FeedIcon from '@mui/icons-material/Feed';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
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
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
            </AppBar>
        </Box>
    );
}
