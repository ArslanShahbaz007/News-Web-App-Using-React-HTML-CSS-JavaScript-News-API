import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title, description, imageurl, url, author, time}= this.props;
    return (
      <div>
       <div className="card">
       <img src={imageurl} className="card-img-top" alt="..." />
       <div className="card-body">
       <h5 className="card-title">{title}</h5>
       <p className="card-text">
        {description}
    </p>
    <p className="card-text"><small class="text-body-secondary">By {author} on {time}</small></p>
    <a rel="noreferrer" href={url} target="_blank" className="btn btn-primary">
      Read More
    </a>
  </div>
</div>

      </div>
    )
  }
}

export default Newsitem
