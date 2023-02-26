import { useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'
import PropTypes from 'prop-types';
import './charInfo.scss';

const CharInfo = (props) => {

  const {loading, error, getCharacter} = useMarvelService();

    const [char, setChar] = useState(null);



    // componentDidMount() {
    //     this.updateChar();
    // }

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    // function componentDidUpdate(prevProps, prevState) {
    //     if (props.charId !== prevProps.charId) {
    //         updateChar();
    //     }
    //     // this.updateChar();
    // }

    const onCharLoaded = (char) => {
        setChar(char);

        // this.setState({
        //     char,
        //     loading: false
        // });
    }

    const updateChar = () => {
        const {
            charId
        } = props;
        if (!charId) {
            return
        }
        getCharacter(charId)
          .then(onCharLoaded);
    }

    const skeleton = char || loading || error ? null : <Skeleton/> ;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(spinner || errorMessage || !char) ? <View char = {
        char
    }
    /> : null

    return ( <div className = "char__info" > {
            skeleton
        } {
            errorMessage
        } {
            spinner
        } {
            content
        } </div>
    )
    
}

const View = ({char}) => {
    const {
        name,
        description,
        thumbnail,
        homepage,
        wiki,
        comics
    } = char;
    let imgStyle = {
        'objectFit': 'cover'
    };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {
            'objectFit': 'unset'
        };
    }

    return (
      <>
        <div className="char__basics">
          <img src={thumbnail} alt={name} style={imgStyle} />
          <div>
            <div className="char__info-name"> {name} </div>
            <div className="char__btns">
              <a href={homepage} className="button button__main">
                <div className="inner"> homepage </div>
              </a>{' '}
              <a href={wiki} className="button button__secondary">
                <div className="inner"> Wiki </div>
              </a>
            </div>
          </div>
        </div>{' '}
        <div className="char__descr"> {description} </div>
        <div className="char__comics"> Comics: </div>
        <ul className="char__comics-list">
          {' '}
          {comics.length > 0
            ? null
            : 'There is no comics for this character'}{' '}
          {comics.map((item, i) => {
            if (i > 9) {
              // eslint-disable-next-line
              return;
            }
            return (
              <li key={i} className="char__comics-item">
                {' '}
                {item.name}{' '}
              </li>
            );
          })}{' '}
        </ul>
      </>
    );
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;