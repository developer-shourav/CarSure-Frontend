import { useParams } from "react-router";

const UpdateProduct = () => {
      const { id } = useParams();
    return (
        <div>
            Product Id: {id}
        </div>
    );
};

export default UpdateProduct;