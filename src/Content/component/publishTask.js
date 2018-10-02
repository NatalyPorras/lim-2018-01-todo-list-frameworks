import React, {Component} from 'react';

class PublishTask extends Component{
    constructor(props) {
        super(props);
        
        this.id = props.id;
        this.state={
          textInput:props.content,
        }
      }
   
      handleInput(e){
        this.setState({
          textInput:e.target.value
        })
      }
      handleChange(){
        const postData = {
          body: this.state.textInput,
        };
        const updatesPost = {};
    
        updatesPost["/task/" + this.id] = postData;
    
        return window.firebase
          .database()
          .ref()
          .update(updatesPost);
      }
      handleRemove(id) {
        this.props.removePost(id);
      }
    
      handleUpdate(e) {
        const postData = {
          body: this.state.textInput,
        };
        const updatesPost = {};
    
        updatesPost["/task/" + this.id] = postData;
    
        return window.firebase
          .database()
          .ref()
          .update(updatesPost);
      }
    render() {
    
        return (
          <div id="posts">
            <div id="loadedPost">
              <div className="card mt-3 mb-3">
                <div className="card-body">
                    <textarea
                      name="texts"
                      cols="30"
                      rows="5"
                      className="form-control"
                      value={this.state.textInput}
                      onChange={this.handleInput.bind(this)}
                    />


                  <div>
                    <a
                      onClick={() => this.handleRemove(this.id)}
                      className="btn btn-primary"
                    >
                      Delete
                    </a>
                    <a
                      href=""
                      onClick={() => this.handleChange()}
                      className="btn btn-primary"
                    >
                      Edit
                    </a>

                  </div>

                </div>
              </div>
            </div>
          </div>
        );
      }
}

export default PublishTask;