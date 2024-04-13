import React from 'react';
import {Grid, Card, CardContent, Typography, CardMedia} from '@mui/material';
import {ProductDto} from "../../data/ProductDto.Type.ts";
import {Link} from "react-router-dom";

type Props = {
    getAllProductDtoList: ProductDto[]
}

const CardGrid = ({getAllProductDtoList}: Props) => {
    return (
        <Grid container spacing={3}>
            {getAllProductDtoList.map(item => (
                <Grid key={item.pid} item xs={12} sm={3}>
                    <Card sx={{maxWidth: 345}}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="240"
                            image={`${item.image_url}`}
                        />
                        <CardContent >
                            <Link to={`/product/${item.pid}`} >
                                <Typography gutterBottom variant="h5" component="div" >
                                    {item.product_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    $ {item.price}
                                </Typography>
                            </Link>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default CardGrid;