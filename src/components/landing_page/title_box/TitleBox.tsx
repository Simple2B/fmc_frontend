import { Box } from '@mui/material';
import style from './TitleBox.module.sass';

export interface ITitleBox {
  color: string;
  top?: string;
  marginBottom?: string;
  marginTop?: string;
  title: string;
  description: string;
  textAlign?: string;
  paddingLeft?: string;
}

const TitleBox: React.FC<ITitleBox> = ({
  color,
  top = 0,
  marginBottom = 0,
  marginTop = 0,
  title,
  description,
  textAlign = 'center',
  paddingLeft = 0,
}) => {
  // const matches845 = useMediaQuery('(max-width:845px)');
  // const matches445 = useMediaQuery('(max-width:445px)');
  // const matches320 = useMediaQuery('(max-width:320px)');
  return (
    <Box
      component="section"
      className={style.section}
      sx={{
        top: { top },
        marginTop: { marginTop },
        marginBottom: { marginBottom },
        textAlign: textAlign,
        paddingLeft: paddingLeft,
      }}
    >
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
