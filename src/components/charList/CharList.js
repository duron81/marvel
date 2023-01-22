import {
    Component
} from 'react/cjs/react.production.min';

import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';


class CharList extends Component {
  state = {
    data: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false,
  };

  marverService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest(offset) {
    this.onCharListLoading();
    this.marverService
      .getAllCharacters(offset)
      .then(this.onCharsLoaded)
      .catch(this.onError);
  }

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  onCharsLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    this.setState(({ data, offset }) => ({
      data: [...data, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  itemsRefs = [];

  setInputRef = elem => {
    this.itemsRefs.push(elem);
  }

  focusRef = (id) => {
    // console.log(this.itemsRefs);
    this.itemsRefs.forEach((elem) => {
      elem.classList.remove('char__item_selected');
    });
    this.itemsRefs[id].classList.add('char__item_selected');
    this.itemsRefs[id].focus();
  }

  renderItems(arr) {
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
              this.props.onCharSelected(item.id);
              this.focusRef(i);
            }
          }
          onKeyPress={
            (e) => {
              if (e.key === ' ' || e.key === "Enter") {
                this.props.onCharSelected(item.id);
                this.focusOnItem(i);
              }
            }
          }
          ref={this.setInputRef}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />{' '}
          <div className="char__name"> {item.name} </div>{' '}
        </li>
      );
    });

    return items;
  }

  render() {
    const { data, loading, error, newItemLoading, offset, charEnded } =
      this.state;
    const items = this.renderItems(data);
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
          onClick={() => this.onRequest(offset)}
        >
          <div className="inner"> load more </div>{' '}
        </button>{' '}
      </div>
    );
  }
}

export default CharList;