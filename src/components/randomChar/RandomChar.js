
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect} from 'react';

const RandomChar = () => {

    const [char, setChar] = useState({});

    // state = {
    //     char: {},
    //     loading: true,
    //     error: false
    // }

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect( () => {
        updateChar();
    }, [])

    // componentDidMount() {
    //     this.updateChar();
    // }

    const onCharLoaded = (char) => {
        setChar(char);
    }


    // marverService.getAllCharacters().then(res => res.data.results.forEach(element => console.log(element.name)));

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded);
    }


    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(spinner || errorMessage) ? <View char = {
        char
    }
    /> : null

    return ( 
        <div className = "randomchar" > {
            errorMessage
        } {
            spinner
        } {
            content
        } 
        <div className = "randomchar__static" >
            <p className = "randomchar__title" >
            Random character
            for today! <br/>
            Do you want to get to know him better ?
            </p> 
            <p className = "randomchar__title" >
            Or choose another one
            </p> 
            <button className = "button button__main"
                onClick = {
                    updateChar
                }>
                <div className = "inner" >
                try it 
                </div> 
            </button> 
            <img src = {
                mjolnir
            }
            alt = "mjolnir"
            className = "randomchar__decoration" />
            </div>
        </div>
    )
}

const View = ({
    char
}) => {
    const {
        name,
        description,
        thumbnail,
        homepage,
        wiki
    } = char;
    let className = 'randomchar__img';
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        className = 'randomchar__img__none';
    }
    return ( <div className = "randomchar__block" >
        <img src = {
            thumbnail
        }
        alt = "Random character"
        className = {
            className
        }
        /> 
        <div className = "randomchar__info" >
        <p className = "randomchar__name" > {
            name
        } 
        </p> 
        <p className = "randomchar__descr" > {
            description
        } 
        </p> 
        <div className = "randomchar__btns" >
        <a href = {
            homepage
        }
        className = "button button__main" >
        <div className = "inner" > homepage </div> 
        </a> 
        <a href = {
            wiki
        }
        className = "button button__secondary" >
        <div className = "inner" > Wiki </div> 
        </a> 
        </div> 
        </div> 
        </div>
    )
}

export default RandomChar;