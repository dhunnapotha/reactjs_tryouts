// Components:
// - ReactLinkInput - Dual Binding

var ReactLinkInput = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function  () {
    return {
      message: "hello!", 
      message2: "world!",
      boolenValue: false,
      selectValue: "volvo"
    };
  },

  handleClickMe: function  (event) {
    console.log(this.state.message);
    console.log(this.state.message2);
    console.log(this.state.boolenValue);
    console.log(this.state.selectValue)
    event.preventDefault();
  },

  render: function  () {
    return (
      <form>
        <div className="inputElements">
          <input type="text" valueLink={this.linkState('message')} name="inputField1" />
          <input type="text" valueLink={this.linkState('message2')} name="inputField2"/>
        </div>

        <div className="checkboxElements">
          <input type="checkbox" name="testCheckbox" checkedLink={this.linkState('boolenValue')} />
        </div>

        <div className="selectElements">
          <select name="selectElements" valueLink={this.linkState('selectValue')}>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>

        <div className="actionButtons">
          <input type="submit" onClick={this.handleClickMe}> Click Me!</input>
        </div>

      </form>
    )
  }
});

// React.render(<ReactLinkInput/>, document.getElementById('content'));


