import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import { CardComponentProps } from "../../models/card.model";

const CardComponent: React.FC<CardComponentProps> = ({title, content, buttonLabel}) => {
    return (
        <Card sx={{ minWidth: 275, maxWidth: 300 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2">
                    {content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">{buttonLabel}</Button>
            </CardActions>
        </Card>
    )
}

export default CardComponent;