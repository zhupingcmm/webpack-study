import  React,{useState,useEffect} from "react";
import * as pages from "./pages";
import RenderPropsCom from "./render-props-com";
import {connect} from "react-redux";
import { store } from "./redux-study";

function Details (props){
    const{count} = props;
    const [data,setData] = useState([
        {
            type:'sports',
            content:"football"
        },
        {
            type:'history',
            content:"china"
        }
    ]);



    return (
        <div>
            <RenderPropsCom
                data ={data}
                renderItem ={item=>{
                    let PageComp = pages[item.type];
                return <PageComp/>
                }}
            />
            {
                count
            }
        </div>

    )


}


function mapStateToProps(state){
    console.log("state:::",state)
    return {
        count: state.count
    }
}

function mapDispatchToProps(dispatch){
    return{

    }

}
export default connect(mapStateToProps,mapDispatchToProps)(Details);