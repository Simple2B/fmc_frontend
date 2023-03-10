import { Box } from '@mui/material';
import style from './TitleBox.module.sass';

export interface ITitleBox {
  color: string;
  top?: string;
  title: string;
  description: string;
}

const TitleBox: React.FC<ITitleBox> = ({
  color,
  top = 0,
  title,
  description,
}) => {
  // const matches845 = useMediaQuery('(max-width:845px)');
  // const matches445 = useMediaQuery('(max-width:445px)');
  // const matches320 = useMediaQuery('(max-width:320px)');
  return (
    <Box component="section" className={style.section} sx={{ top: { top } }}>
      <Box sx={{ color: { color } }} className={style.title}>
        {title}
      </Box>
      <Box sx={{ color: { color } }} className={style.description}>
        {description}
      </Box>
    </Box>
  );
};

export default TitleBox;
