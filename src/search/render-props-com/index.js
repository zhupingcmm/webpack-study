import React,{useState,useEffect} from "react";

function RenderPropsCom (props){
    const {renderItem} = props;

    const [data, setData] = useState(props.data);

    useEffect(()=>{
        setData(props.data);
    },[props.data])

    return(
        <>
            {
                data && data.map(item=>{
                    return renderItem(item);
                })
            }
        </>

    )

}

export default RenderPropsCom;