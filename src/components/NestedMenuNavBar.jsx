import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

const menuData = [
    {
        label: 'Menu Item 1',
        children: [
            {
                label: 'Submenu Item 1',
                children: ['Submenu Item 1.1', 'Submenu Item 1.2'],
            },
            {
                label: 'Submenu Item 2',
                children: ['Submenu Item 2.1', 'Submenu Item 2.2'],
            },
        ],
    },
    {
        label: 'Menu Item 2',
        children: [
            {
                label: 'Submenu Item 3',
                children: ['Submenu Item 3.1', 'Submenu Item 3.2'],
            },
            {
                label: 'Submenu Item 4',
                children: ['Submenu Item 4.1', 'Submenu Item 4.2'],
            },
        ],
    },
];

function NestedMenuNavbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentMenu, setCurrentMenu] = useState([]);

    const handleMenuClick = (event, menu) => {
        setAnchorEl(event.currentTarget);
        setCurrentMenu(menu.children || []);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setCurrentMenu([]);
    };

    const renderMenuItems = (items) => {
        return items.map((item, index) => (
            <div key={index}>
                <MenuItem
                    onClick={(event) => handleMenuClick(event, item)}
                >
                    {item.label}
                </MenuItem>
            </div>
        ));
    };

    const renderSubMenuItems = (subMenu) => {
        if (!subMenu || subMenu.length === 0) return null;

        return subMenu.map((item, index) => (
            <div key={index}>
                <MenuItem
                    onClick={(event) => handleMenuClick(event, item)}
                >
                    {item.label}
                </MenuItem>
                {renderSubMenuItems(item.children)}
            </div>
        ));
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={(event) =>
                            handleMenuClick(event, { children: menuData })
                        }
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {renderMenuItems(currentMenu.length === 0 ? menuData : currentMenu)}
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NestedMenuNavbar;
