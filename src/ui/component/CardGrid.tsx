import {Grid, Card, CardContent, Typography, CardMedia, CardActionArea, Button} from '@mui/material';
import {ProductDto} from "../../data/ProductDto.Type.ts";
import {Link} from "react-router-dom";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons/faCartShopping";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './componentStyle.css'

type Props = {
    getAllProductDtoList: ProductDto[]
}

const CardGrid = ({getAllProductDtoList}: Props) => {
    return (
        <Grid container spacing={0} sx={{margin: 0, padding: 0}}>
            {getAllProductDtoList.map(item => (
                <Grid key={item.pid} item xs={3} sx={{padding: 1}}><CardActionArea>
                    <Card sx={{height: 440, padding: 0}}>

                        <Link to={`/product/${item.pid}`} className="nav-link">
                            <CardMedia
                                component="img"
                                height="300"
                                image={item.image_url}
                                sx={{objectFit:"contain"}}
                            />
                            <CardContent>

                                <Typography gutterBottom variant="body1" component="div">
                                    {item.product_name}
                                </Typography>
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                    <Typography variant="body2" color="text.secondary" sx={{display:"flex", justifyContent: 'center', alignItems: 'center'}}>
                                        HKD {item.price.toLocaleString()}
                                    </Typography>
                                    <Button>
                                        <FontAwesomeIcon icon={faCartShopping} size="xl"/>
                                    </Button>
                                </div>

                            </CardContent>


                        </Link>

                    </Card></CardActionArea>
                </Grid>
            ))}
        </Grid>
    );
};

export default CardGrid;