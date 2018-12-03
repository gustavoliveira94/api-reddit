import React, { Component, Fragment } from 'react';

class Rising extends Component {

    state = {
        rising: [],
        limit: 10
    }

    componentWillMount() {
        const url = 'https://www.reddit.com/r/reactjs/rising.json';
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data.data.children)
                this.setState({ rising: data.data.children.map(data => data.data) });
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
                    this.state.rising.slice(0, this.state.limit).map((rising) => {
                        return (
                            <a className="item" key={rising.id} href={rising.url} target="window.open();">
                                <div className="box" key={rising.id}>
                                    <div className="thumb">
                                        <img alt={rising.title} src={rising.thumbnail === 'self' || rising.thumbnail === 'default' ? 'https://ugross.gallerycdn.vsassets.io/extensions/ugross/vscode-react-snippets/1.3.0/1519481679046/Microsoft.VisualStudio.Services.Icons.Default' : rising.thumbnail} width="100px" height="100px" />
                                    </div>
                                    <div className="infos">
                                        <h3>{rising.title}</h3>
                                        <p>Enviado <b>por</b><span>{rising.author}</span></p>
                                        <label>{rising.domain}</label>
                                    </div>
                                </div>
                            </a>
                        )
                    })
                }
                <Fragment>
                    {
                        this.state.rising.length > 10 &&
                        <button className="ver-mais" onClick={this.changeLimit}>+ Ver mais</button>
                        ? <button className="ver-mais" onClick={this.changeLimit}>+ Ver mais</button> : 'Nenhuma resultado encontrado!'
                    }
                </Fragment>
            </div>
        );
    }
}

export default Rising;