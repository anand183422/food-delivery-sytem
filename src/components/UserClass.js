import React from "react";
class UserClass extends React.Component{

    constructor(props){
              super(props);
              this.state={
                count:0
              }
              console.log("child constructor");
    }
    componentDidMount(){
        console.log("child dom")
    }
    render(){
        console.log("child render");
        return(
            
            <div>
            <button onClick={()=>{
                this.setState({
                    count:this.state.count +1
                })
            }}>count : {this.state.count}</button>
            <h2>Name :{this.props.Name}</h2>
            <h3>Location : Jalgaon</h3>
            <h4>Contact:@anand</h4>
        </div>
            
        )
    }
}

export default UserClass;