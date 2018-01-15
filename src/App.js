import React,{Component} from 'react';
import PostPage from './components/PostPage';

class App extends Component {
  render(){
    return(
      <div className = "home">
        <PostPage />
      </div>
    )
  }
}

export default App;
