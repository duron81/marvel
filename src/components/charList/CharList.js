import { useState, useEffect, useRef } from 'react';

import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';


const CharList = (props) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState (false);


  const marverService = new MarvelService();

  useEffect(() => {
    onRequest();
  }, []);



  const onRequest = (offset) => {
    onCharListLoading();
    marverService
      .getAllCharacters(offset)
      .then(onCharsLoaded)
      .catch(onError);
  }

  const onCharListLoading = () => {
    setNewItemLoading(true);
  };

  const onCharsLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    // this.setState(({ data, offset }) => ({
    //   data: [...data, ...newCharList],
    //   loading: false,
    //   newItemLoading: false,
    //   offset: offset + 9,
    //   charEnded: ended,
    // }))

    setData(data => [...data, ...newCharList] );
    setLoading(false);
    setNewItemLoading(newItemLoading => false);
    setOffset(offset => offset + 9);
    setCharEnded(charEnded => ended);
  };

  const onError = () => {
    // this.setState({
    //   loading: false,
    //   error: true,
    // });

    setLoading(false);
    setError(true);
  };

  const itemsRefs = useRef([]);

  // setInputRef = elem => {
  //   this.itemsRefs.push(elem);
  // }

  const focusRef = (id) => {
    // console.log(this.itemsRefs);
    itemsRefs.current.forEach((elem) => {
      elem.classList.remove('char__item_selected');
    });
    itemsRefs.current[id].classList.add('char__item_selected');
    itemsRefs.current[id].focus();
  }

  function renderItems (arr) {
    const items = arr.map((item, i) => {
      let imgStyle = {
        objectFit: 'cover',
      };
      if (
        item.thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ) {
        imgStyle = {
          objectFit: 'unset',
        };
      }

      return (
        <li
          className="char__item"
          key={item.id}
          onClick={
            () => {
              props.onCharSelected(item.id);
              focusRef(i);
            }
          }
          onKeyPress={
            (e) => {
              if (e.key === ' ' || e.key === "Enter") {
                props.onCharSelected(item.id);
                focusRef(i);
              }
            }
          }
          ref={el => itemsRefs.current[i] = el}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />{' '}
          <div className="char__name"> {item.name} </div>{' '}
        </li>
      );
    });

    return items;
  }


  const items = renderItems(data);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;

  return (
    <div className="char__list">
      <ul className="char__grid">
        {' '}
        {errorMessage} {spinner} {items}{' '}
      </ul>{' '}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{
          display: charEnded ? 'none' : 'block',
        }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner"> load more </div>{' '}
      </button>{' '}
    </div>
  );
}

export default CharList;