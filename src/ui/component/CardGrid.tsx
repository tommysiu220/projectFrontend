import React from 'react';
import {Grid, Card, CardContent, Typography, CardMedia} from '@mui/material';
import {ProductDto} from "../../data/ProductDto.Type.ts";
import {Link} from "react-router-dom";

type Props = {
    getAllProductDtoList: ProductDto[]
}

const CardGrid = ({getAllProductDtoList}: Props) => {
    return (
        <Grid container spacing={8} >
            {getAllProductDtoList.map(item => (
                <Grid key={item.pid} item xs={4} sx={{padding: 0}}>
                    <Card sx={{height:600, padding:0}}>
                        <Link to={`/product/${item.pid}`} >
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
                                    $ {item.price}
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