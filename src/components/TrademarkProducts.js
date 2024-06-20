import { useParams } from "react-router-dom";

export default function TrademarkProducts(){
    const { searchFor } = useParams();
    return (
        <div>{searchFor}</div>
    );
};