// Home.js

import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';



function Page2() {
    // alert("he");
    const [data,setData] = useState([]);
    const [imgName, setImgName] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const fun = async () => { 
        const fetchRes = await fetch("http://localhost:4000/img", {
            headers: { Accept: "*/*" }
        });
        const fetchData = await fetchRes.json();
        setData(fetchData.data);
        const temp = fetchData.nameList.map(x => x.key);
        setImgName(temp);
    }
    useEffect(()=>{
        fun();
        console.log("called");
    }, [deleted]);

    const deleteImg = async (index) => {
        const encoded_uri = encodeURIComponent(imgName[index]);
        console.log(encoded_uri);
        const fetchRes = await fetch(`http://localhost:4000/delImg?imgName=${encoded_uri}`, {
            method: "DELETE"
        });
        const fetchData = await fetchRes.json();
        console.log(fetchData);
        setDeleted(!deleted);
    }

    return (
        <div>
            <div>
                <h2>This is the page2</h2>
                <Link to="/">Go to page1</Link>
            </div>
            <div>
                {
                    data.map((url,index)=>(
                        <div>
                            <img src={url} alt={url} key={index} />
                            <button onClick={e => deleteImg(index)} >Delete</button>
                        </div>
                    )
                    )
                }
            </div>
        </div>
    );
}

export default Page2;
