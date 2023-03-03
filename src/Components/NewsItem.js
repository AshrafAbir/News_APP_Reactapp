import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {

    let { title, description, imgUrl, newsUrl, date, author, source } = this.props; {/*Object destructuring like taking in varibles = "this.props" is the another object in class based component to access props*/ }

    return (
      <div className='my-3'>
        <div className="card" > {/*Inline CSS style need to be Object and these syntaxes*/}
          <div style={
            {
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'absolute',
              right: 0
            }}>
            <span className=" badge rounded-pill bg-danger"> {source}</span>
          </div>

          <img src={imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>

            <p className="card-text"><small className="text-danger"> {/*text-danger == shows in red*/}
              <h6>By {!author ? "unknown" : author} on {new Date(date).toGMTString()} </h6>  </small></p>

            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sn btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
