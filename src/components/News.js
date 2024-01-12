import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
// import PropTypes from 'prop-types';
export class News extends Component {
  //     static defaultProps = {
  //     category: 'general'
  // }
  // static propTypes ={
  //     category: PropTypes.string,
  // }
  constructor() {
    super();
    console.log("hellow");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=735a82ad09484094980f48dc6efa66d0`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({ articles: parseddata.articles, loading: false, totalResults: parseddata.totalResults });
  }
//   handlenextclick = async () => {
//     this.setState({
//       page: this.state.page + 1,
//     });
//     let url = `https://newsapi.org/v2/top-headlines?country=us&category=${
//       this.props.category
//     }&apiKey=735a82ad09484094980f48dc6efa66d0&page=${this.state.page + 1}`;
//     this.setState({ loading: true });
//     let data = await fetch(url);
//     let parseddata = await data.json();
//     this.setState({ articles: parseddata.articles, loading: false });
//     console.log(url);
//   };
//   handleprevclick = async () => {
//     this.setState({
//       page: this.state.page - 1,
//     });
//     let url = `https://newsapi.org/v2/top-headlines?country=us&category=${
//       this.props.category
//     }&apiKey=735a82ad09484094980f48dc6efa66d0&page=${this.state.page - 1}`;
//     this.setState({ loading: true });
//     let data = await fetch(url);
//     let parseddata = await data.json();
//     this.setState({ articles: parseddata.articles, loading: false });
//   };
  fetchMoreData = async () => {
      
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${
        this.props.category
      }&apiKey=735a82ad09484094980f48dc6efa66d0&page=${this.state.page + 1}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parseddata = await data.json();
      this.setState({ articles: this.state.articles.concat(parseddata.articles), loading: false, totalResults: parseddata.totalResults });
    //   console.log(url);
    this.setState({
        page: this.state.page + 1,
        });
  };
  render() {
    return (
        <>
        <h1 className=" text-center" style={{marginTop: '90px'}}>News Hub - Headlines</h1>
        {/* {this.state.loading && <Spinner/>} */}
        {/* <img src={loading} alt="loading" /> */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
            <div className="container">

        <div className="row">
          {this.state.articles.map((element) => {
              return (
                  <div className="col-md-4 my-4" key={element.url}>
                <Newsitem
                  title={element.title ? element.title : " "}
                  description={element.description ? element.description : " "}
                  imageurl={
                      !element.urlToImage
                      ? "https://i.ytimg.com/vi/MZJW1mu-f2M/maxresdefault.jpg"
                      : element.urlToImage
                    }
                    url={element.url}
                    author={element.author ? element.author : "Unknown"}
                    time={new Date(element.publishedAt).toGMTString()}
                    key={element.url}
                    />
              </div>
            );
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
          type="button"
          disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handleprevclick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handlenextclick}
          >
            Next &rarr;
          </button>
        </div> */}
      
        </>
    );
  }
}

export default News;
