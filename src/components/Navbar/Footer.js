import  React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Grid, Link, Typography } from '@material-ui/core';
import {Marginer} from '../marginer';

export default() => {
    return(
        <footer style={{position:'fixed', bottom:'0', width: '100%'}}>
            <AppBar style={{backgroundColor:'black', textAlign: 'center'}} position="static">
                <Grid>
                    <Grid className="footer-links"style={{display:'inline-flex'}}>
                        <Link component={RouterLink} to="/" id='footerLink'style={{display:'inline-flex'}}>
                            Home
                        </Link>
                        <Marginer direction="vertical" margin={5} style={{display:'inline-flex'}}/>
                        <Link component={RouterLink} to="/EventsList" id='footerLink'style={{display:'inline-flex'}}>
                            Events List
                        </Link>
                        <Marginer direction="vertical" margin={5} style={{display:'inline-flex'}}/>
                        <Link component={RouterLink} to="/CreateEvent" id='footerLink'style={{display:'inline-flex'}}>
                            Create Event
                        </Link>
                        <Marginer direction="vertical" margin={5} style={{display:'inline-flex'}}/>
                        <Link component={RouterLink} to="/SignUp" id='footerLink'style={{display:'inline-flex'}}>
                            Get Started
                        </Link>
                        <Marginer direction="vertical" margin={5} style={{display:'inline-flex'}}/>
                        <Link component={RouterLink} to="/About" id='footerLink' style={{display:'inline-flex'}}>
                            About
                        </Link>
                    </Grid>
                    <Grid>
                        <Typography className="marginL-d7" style={{marginTop: '10px', marginBottom: '10px'}}>
                            Copyright &copy;{new Date().getFullYear()} Univent
                        </Typography>
                    </Grid>
                </Grid>
            </AppBar>
        </footer>
    );
}