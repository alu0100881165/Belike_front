import { AppBar, Avatar, Box, Chip, Drawer, Toolbar } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DrawerComponent from '../../components/common/drawer.component';
import { UserModel } from '../../models/user.model';
import { CARDSEXAMPLE } from '../../examples/card.example';
import CardComponent from '../../components/intranet/card.component';

const IntranetPage: React.FC = () => {

    const { id } = useParams();

    const [currentUser, setCurrentUser] = useState<UserModel>();

    // TODO should move to environment file
    const baseUrl = "http://localhost:3000/api";

    useEffect(() => {
        if(id)
            axios
                .get<UserModel>(`${baseUrl}/users/${id}`)
                .then((res) => {
                    if(res?.data && res.data.id > 0) {
                        setCurrentUser(res.data);
                    }
                })
    }, [id]);

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - 240px)` },
                    ml: { sm: `240px` },
                }}
            >
                <Toolbar style={{background: 'white'}}>
                    {currentUser && currentUser.username && 
                        <Chip label={currentUser.username} 
                            avatar={<Avatar>{currentUser.username.substring(0,1)}
                            </Avatar>}
                            style={{position: "absolute", right: 20}}
                        />
                    }
                </Toolbar>
            </AppBar>
            <Box
                sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '240px' },
                    }}
                    open
                >
                    <DrawerComponent />
                </Drawer>
            </Box>
            
                {CARDSEXAMPLE.map(card => 
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
                    >
                        <Toolbar />
                        <CardComponent 
                            title={card.title} 
                            content={card.content} 
                            buttonLabel={card.buttonLabel}
                        />
                    </Box>)
                }
                
            
        </Box>
    );
}

export default IntranetPage