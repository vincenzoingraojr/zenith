import { useParams } from "react-router-dom";
import { PageBlock } from "../../styles/global";

function EditPost() {
    const params = useParams();

    console.log("itemId:", params.itemId);

    return (
        <PageBlock>
            Edit post page
        </PageBlock>
    );
}

export default EditPost;