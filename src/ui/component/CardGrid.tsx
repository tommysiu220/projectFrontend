import {Grid, Card, CardContent, Typography, CardMedia} from '@mui/material';
import {ProductDto} from "../../data/product/ProductDto.Type.ts";
import {Link} from "react-router-dom";
import './cardStyle.css'

type Props = {
    getAllProductDtoList: ProductDto[]
}

const CardGrid = ({getAllProductDtoList}: Props) => {
    return (
        <Grid container sx={{
            my:4,
        }}>
            {getAllProductDtoList.map(item => (
                <Grid key={item.pid} item xs={4} sx={{padding: 2}}>
                    <Card sx={{ padding:0}} >
                        <Link to={`/product/${item.pid}`} className="nav-link">
                        <CardMedia
                            component="img"
                            height="400"
                            image={item.image_url}
                        />
                        <CardContent >

                                <Typography gutterBottom variant="h5" component="div" >
                                    {item.product_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
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