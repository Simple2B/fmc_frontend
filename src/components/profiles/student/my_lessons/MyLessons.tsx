import RightBar from '@/common/right_bar/RightBar';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import styles from './MyLessons.module.sass';

export interface IMyLessons {}

const MyLessons: React.FC<IMyLessons> = () => {
  // const router = useRouter();

  return (
    <Box className={styles.wrapper} flex={1} p={2}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      <RightBar />
    </Box>
  );
};

export default MyLessons;
