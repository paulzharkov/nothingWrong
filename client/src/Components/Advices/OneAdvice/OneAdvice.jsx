import { makeStyles, withStyles, CardActionArea, Card, CardActions, CardContent, CardMedia, Button, Typography, Icon } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 380,
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
  },
  media: {
    height: 170,
  },
  content: {
    padding: "15px 15px 0px",
  },
  button: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    paddingBottom: "17px",
    marginBottom: "15px",
  },

});

function OneAdvice({ text, img, title, link }) {
  const RandomButton = withStyles(() => ({
    root: {
      color: '#67a3a3',
      '&:hover': {
        backgroundColor: '#FFE0A1',
        color: 'white !important',
      },
    },
  }))(Button);

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img}
          title="Picture"
        />
        <div className={classes.content}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {text}
            </Typography>
          </CardContent>
        </div>
      </CardActionArea>
      <CardActions>
        <div className={classes.button}>
          <RandomButton
            variant="outlined"
            endIcon={<Icon>menu_book_rounded</Icon>}
            onClick={() => { window.open(link) }}
          >
            Подробнее...
        </RandomButton>
        </div>
      </CardActions>
    </Card>
  );
}

export default OneAdvice
