import { useState } from 'react'
import AllRoutes from './routes/allRoutes'
import './App.css'
import { Button, Typography, Container } from '@mui/material';

function App() {
  const [count, setCount] = useState(0)

    return (
      <Container>
        <AllRoutes />
        <Typography variant="h1" component="h2" gutterBottom>
          Hello, Material-UI!
        </Typography>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </Container>
    );
  
}

export default App
