
import React from 'react';
import Header from './Header';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useEffect,useState } from 'react';
function Home() {
  const [list,setList] = useState([])
  const [name,setName] = useState('')
  const [status,setStatus] = useState('')
  useEffect(()=>{
    console.log("asas")
    axios.get(`https://rickandmortyapi.com/api/character/?name=${name}&status=${status}`).then((response)=>{
      console.log("response",response)
      setList(response.data.results)
    })
  },[name,status])
  return (
    <div className="App">
      <Header />
      <section style={{ padding: "10px", width: "100%", paddingLeft: "40%" }}>
        <TextField style={{margin:"8px"}} onChange={(e) => setName(e.target.value)} id="outlined-search" label="Search Name" type="search" />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={status}
          label="Status"
          onChange={(e)=>{setStatus(e.target.value)}}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'alive'}>Alive</MenuItem>
          <MenuItem value={'dead'}>Dead</MenuItem>
          <MenuItem value={'unknown'}>Unknown</MenuItem>
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>      
      </section>
      <section>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {
            list.map((element)=>{
              return(
                <div>
                            <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={element.name} src={element.image} />
            </ListItemAvatar>
            <ListItemText
              primary={element.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {element.status}
                  </Typography>
                  {` --  ${element.location.name}`}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
                </div>
              )
            })
          }

        </List>

      </section>
      <section>
        <Pagination count={10} />

      </section>
    </div>
  );
}

export default Home;
