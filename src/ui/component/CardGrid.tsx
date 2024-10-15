import {Grid, Card, CardContent, Typography, CardMedia} from '@mui/material';
import {ProductDto} from "../../data/product/ProductDto.Type.ts";
import {Link} from "react-router-dom";

type Props = {
  getAllProductDtoList: ProductDto[]
}

const CardGrid = ({getAllProductDtoList}: Props) => {

  return (
    <Grid container style={{
      padding:0,

    }}>
      {getAllProductDtoList.map((item) => (
        <Grid key={item.pid} item xs={12} sm={6} md={4} sx={{padding: 0}}>
          <Card sx={{
            padding: 0,
            border: "2px solid grey",
            borderRadius: 0,
            height:"100%",
            width:"100%"
          }}>
            <Link to={`/product/${item.pid}`} className="nav-link">
              <CardMedia
                component="img"
                image={item.image_url}
                sx={{marginTop:2}}
              />
              <CardContent style={{padding:"16px"}}>

                <Typography gutterBottom variant="body1" component="div">
                  {item.product_name}
                </Typography>
                <Typography variant="body2" sx={{color:"grey"}}>
                  HKD {item.price}
                </Typography>

              </CardContent>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;