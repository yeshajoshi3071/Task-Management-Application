import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ReactComponent as Logo } from '../../assets/svg/full-icon.svg';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Products', 'Pricing', 'Blog'];
/**
 * Renders a responsive app bar with a navigation menu.
 * The app bar adjusts its layout based on the screen size.
 * On mobile view, a menu icon is displayed to open the navigation menu.
 * On larger screens, a list of pages is displayed in the app bar.
 */

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [isMobileView, setIsMobileView] = React.useState<boolean>(false);

  React.useEffect(() => {
    function handleResize() {
      setIsMobileView(window.innerWidth < 600); // Adjust the breakpoint as needed
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Logo />

          {isMobileView ? (
            <>
              <IconButton onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography variant="inherit" noWrap>
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {pages.map((page) => (
                <Button key={page} color="inherit" onClick={handleCloseNavMenu}>
                  {page}
                </Button>
              ))}
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
