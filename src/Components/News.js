import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`;
  }
    
  fetchMoreData = async () => {
    this.setState({page : this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1
              &pageSize=${this.props.pageSize}`;

    
    let data = await fetch(url);
    let parsedData = await data.json()
    
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      
    })
  };






  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1
              &pageSize=${this.props.pageSize}`;

    this.setState({ loading: true }); 
    // fetching the data here
    let data = await fetch(url); 
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);

  }

  async componentDidMount() {
    this.updateNews();

    // let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=64dd5c5f24934d0fb3fee57ba750bf15&page=1
    //           &pageSize=${this.props.pageSize}`;

    // this.setState({loading : true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading : false
    // })


  }

  handlePreviousButton = async () => {

    // let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=64dd5c5f24934d0fb3fee57ba750bf15
    //            &page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

    // this.setState({loading : true});           
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading : false

    // })
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }


  handleNextButton = async () => {

    this.setState({ page: this.state.page + 1 });
    this.updateNews();

    // if ( !(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

    //   let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=64dd5c5f24934d0fb3fee57ba750bf15
    //              &page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

    //   this.setState({loading : true});          
    //   let data = await fetch(url);
    //   let parsedData = await data.json()


    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading : false

    //   })

    //   this.setState({page : this.state.page +1 });
    // this.handleNextButton();
  }

  render() {
    return (
      // this div contain all the news and headline
      <>
        <h1><div className="text-center" style={{ margin: " 35px , 0px" }}>Top {this.capitalizeFirstLetter(this.props.category)} Head Lines</div></h1>

        {/* here calling the spinner element and checking the condition if the loading is true or false */}
        {/* {this.state.loading && <Spinner />} */}


        {/* In this div  -- setting up the NewsItem where settinf=g the title descriptio imgUrl newsUrl are sending as props and in the line 90 mapping all the  */}
        {/* elements of articles data to read out given props. */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
          {/* {!this.state.loading && this.state.articles.map((element) */}
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                  imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}
                  source={element.source.name} />
              </div>
            })}

          </div>
          </div>
        </InfiniteScroll>

        {/* inside the div there are two buttons -- next and previous */}
        {/* <div className="container d-flex justify-content-between">

          <button type="button" className="btn btn-dark" disabled={this.state.page <= 1}
            onClick={this.handlePreviousButton} >  &larr; Previous</button>

          <button type="button" className="btn btn-dark"
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            onClick={this.handleNextButton} >Next  &rarr;</button>

        </div> */}
      </>
    )
  }
}

export default News
