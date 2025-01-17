import {useParams} from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'
const BlogDetails = () => {

    const {_id} = useParams()
    const blog = useFetch(
      `https://blogsite-cxdu.onrender.com/api/v1/blogs/${_id}`
    );
    console.log(blog)
    
    const {loading,data,error} =blog;

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>An error occured</div>
    }
    
    return ( <>

        <div>
            <h1>{data.title}</h1>
            <p>{data.body}</p>
            <p>{data.category}</p>
            <p>{data.author}</p>

            <div>
                <p><span>Created</span></p>
            </div>

        </div>
    </> );

}
 
export default BlogDetails;