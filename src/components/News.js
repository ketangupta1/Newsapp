import React, { Component } from "react";
import NewsItem from "./NewsItem";
// import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";



export class News extends Component {
  constructor() {
    super();
    console.log("In news constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=b6bdcc93d1c14c45b9117d7d8c0077b7&pageSize=5&page=1";
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totatResults: parseData.totatResults,
      loading: false
    });
  }

  handlePrev = async () => {
    let url = `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=b6bdcc93d1c14c45b9117d7d8c0077b7&pageSize=5&page=${
      this.state.page - 1
    }`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      page: this.state.page - 1,
      loading: false
    });
  };

  handleNext = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totatResults /5)) {
      console.log(
        this.state.page + 1 > Math.ceil(this.state.totatResults / 5)
      );
    } else {
      let url = `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=b6bdcc93d1c14c45b9117d7d8c0077b7&pageSize=5&page=${
        this.state.page + 1
      }`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        articles: parseData.articles,
        page: this.state.page + 1,
        loading: false
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsMonkey - Top Headline!</h2>
        {this.state.loading && <Confetti width={50000} height={10000} />}

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlePrev}
            className="btn btn-dark"
          >
            &larr; Previous
          </button>
          <button
            type="button"
            onClick={this.handleNext}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
