import { Divider, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import logo from '../../common/img/beLikeLogo.png';

const DrawerComponent: React.FC = () => {
    return (<div>
        <Toolbar style={{background: 'white'}}>
            <img src={logo} style={{width: '90%', float: 'left', display: 'block'}} />
        </Toolbar>
        <Divider />
        <List>
          {['Página principal', 'Noticias'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <DashboardIcon /> : <NewspaperIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>)
}

export default DrawerComponent;