import React, { Component, Fragment } from 'react';

class News extends Component {

    state = {
        news: [],
        limit: 10
    }

    componentWillMount() {
        const url = 'https://www.reddit.com/r/reactjs/new.json';
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data.data.children)
                this.setState({ news: data.data.children.map(data => data.data) });
            })
            .catch(error => {
                console.error("Não foi possível carregar a api.", error)
            })
    }

    changeLimit = () => {
        this.setState({
            limit: 100000
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.news.slice(0, this.state.limit).map((news) => {
                        return (
                            <a className="item" key={news.id} href={news.url} target="window.open();">
                                <div className="box" key={news.id}>
                                    <div className="thumb">
                                        <img alt={news.title} src={news.thumbnail === 'self' || news.thumbnail === 'default' ? 'https://ugross.gallerycdn.vsassets.io/extensions/ugross/vscode-react-snippets/1.3.0/1519481679046/Microsoft.VisualStudio.Services.Icons.Default' : news.thumbnail} width="100px" height="100px" />
                                    </div>
                                    <div className="infos">
                                        <h3>{news.title}</h3>
                                        <p>Enviado <b>por</b><span>{news.author}</span></p>
                                        <label>{news.domain}</label>
                                    </div>
                                </div>
                            </a>
                        )
                    })
                }
                <Fragment>
                    {
                        this.state.news.length > 10 &&
                        <button className="ver-mais" onClick={this.changeLimit}>+ Ver mais</button>
                        ? <button className="ver-mais" onClick={this.changeLimit}>+ Ver mais</button> : 'Nenhuma resultado encontrado!'
                    }
                </Fragment>
            </div>
        );
    }
}

export default News;