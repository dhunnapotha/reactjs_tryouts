// - CommentBox
//   - CommentList
//     - Comment
//   - CommentForm



var CommentBox = React.createClass({
  getInitialState: function  () {
    return {data: []};
  },

  onCommentSubmit: function  (commentData) {
    this.setState(commentData);
  },

  loadCommentsFromServer: function  () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function  (data) {
        this.setState({data: data});
      }.bind(this),
      failure: function  (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function  () {
    this.loadCommentsFromServer();
    // setInterval(this.loadCommentsFromServer, 1000)
  },
  render: function  () {
    var comments = this.props.data;
    return (
      <div className="commentbox">
        <h3>Comments</h3>
        <CommentList list={this.state.data} />
        <CommentForm onCommentSubmit={this.onCommentSubmit} url="comments.json"/>
      </div>
    );
  }
});



var CommentList = React.createClass({
  render: function  () {
    var commentNodes = this.props.list.map(function  (comment, index) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      )
    });

    return (
      <div className="commentlist">
      {commentNodes}
      </div>
    );
  }
});


var Comment = React.createClass({
  render: function  () {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    ) 
  }
});



var CommentForm = React.createClass({

  handleSubmit: function  (event) {
    // let us reset hte input fields on submit
    event.preventDefault();
    this.addComment();
  },


  resetFormElements: function  () {
    React.findDOMNode(this.refs.author).value = ''
    React.findDOMNode(this.refs.comment).value = ''
  },


  addComment: function  () {
    var author = React.findDOMNode(this.refs.author).value
    var comment = React.findDOMNode(this.refs.comment).value

    $.ajax({
      url: this.props.url,
      type: 'POST',
      dataType: 'json',
      cache: false,
      data: {author: author, text: comment},
      success: function  (data) {
        this.props.onCommentSubmit({data: data});
        this.resetFormElements();
      }.bind(this),
      failure: function  (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function  () {
    return (
      <div className="commentform">
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Your comment" ref="comment" />
        <input type="submit" value="submit" />
      </form>
      </div>
    )
  }
});

var comments = [{author: 'Gautam', text: 'First Comment'}, {author: 'Chandra', text: 'Second Comment'}]
React.render(<CommentBox url = "comments.json"/>, document.getElementById('content'));

