import React, {Component} from 'react';

class CrearTask extends Component{
    constructor(props){
        super(props);
        this.addPost = this.addPost.bind(this);
    }

    addPost(){
       this.props.addPost(this.textInput.value);
       this.textInput.value = '';
       this.textInput.focus();
        
    }
    render(){
        return(
            <div className="mainCreate">
                <div className="container">
                    <textarea 
                    ref={input=>this.textInput=input}
                    name="texts" cols="30" rows="5" className="form-control" placeholder="Write an education post"></textarea>
                </div>
                <div>
                    <div className="tools">
                        <button onClick={this.addPost} className="btn pull-right">Publish</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CrearTask;