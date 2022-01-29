import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {id:"", subject: "", description: "", priority:"low", team:"", type:"", roles: "", username:""}
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event)  {
    event.preventDefault();
    let subj = event.target.elements.subject.value
    let desc = event.target.elements.desc.value
    let prty = event.target.elements.priority.value
    let typ = event.target.elements.dep.value
    let rol = event.target.elements.role.value
    console.log(subj + desc + prty + typ)
    this.setState({subject: subj, description: desc, priority: prty, type: typ, roles: rol});
  }
  
  render() {
    
    return (
      <div className='main'>
        <h1>Hello world</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="subject">Subject: </label>
          <input name="subject" id="subject" type="text"></input> <br/>

          <label htmlFor="desc">Description: </label>
          <textarea name="desc" id="desc"></textarea> <br/>

          <label htmlFor="priority">Priority: </label>
          <select name="priority" id="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          <p>Type: </p>
          <input type="radio" id="dep1" name="dep" value="dep1"/>
          <label htmlFor="dep1"> UI/UX Bug</label>

          <input type="radio" id="dep2" name="dep" value="dep2"/>
          <label htmlFor="dep2"> Back-end</label><br/>

          <input type="radio" id="dep3" name="dep" value="dep3"/>
          <label htmlFor="dep3"> User is retard</label>

          <input type="radio" id="dep4" name="dep" value="all"/>
          <label htmlFor="dep4"> Other</label> <br/>

          <p>Roles:</p>
          {/* <input type="checkbox" id="role1" name="role1" value="yes"/>
          <label htmlFor="role1">Best</label><br/>
          <input type="checkbox" id="role2" name="role2" value="yes"/>
          <label htmlFor="role2">Worst</label><br/>
          <input type="checkbox" id="role3" name="role3" value="yes"/>
          <label htmlFor="role3">Hooligan</label><br/><br/> */}
          <select name="roles" id="roles">
            <option value="leader">Leader</option>
            <option value="core">Core Team</option>
            <option value="every">Everyone</option>
          </select>

          <button type="submit">sus</button>
        </form>
      </div>
    );
  }
}

export default App;
