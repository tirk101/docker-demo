import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

export default function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/attractions")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } 
  else if (!isLoaded) {
    return <div>Loading...</div>;
  } 
  else {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              Around the world!
            </Typography>
            <Grid container spacing={2}>
              {items.map(item => (
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardMedia
                    component="img"
                    image={item.coverimage}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.detail}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Grid>
                ))
              }
            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}
