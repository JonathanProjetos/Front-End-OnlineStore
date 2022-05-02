import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductDetails } from '../services/api';
import Comentarios from '../components/Comentarios';

class DetailsProduct extends Component {
  constructor() {
    super();
    this.state = {
      details: [],
    };
  }

  componentDidMount() {
    this.searchDetails();
  }

  searchDetails = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ details: [] });
    const result = await getProductDetails(id);
    this.setState({ details: [result] }, () => {
    });
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { addCartList, cartItens } = this.props;
    const { details } = this.state;
    return (
      <div>
        <nav>
          <div className="carrinho">
            <Link
              to="/cart"
              data-testid="shopping-cart-button"
              className="carrinho"
            >
              🛒
              <p data-testid="shopping-cart-size">{ cartItens }</p>
            </Link>
          </div>
        </nav>
        <div>
          {details.map((value) => (
            <div key={ value.id }>
              <p data-testid="product-detail-name">
                { value.title }
                {' '}
                -R$:
                {' '}
                { value.price }
              </p>
              <div>
                {
                  value.shipping.free_shipping
                  && <p data-testid="free-shipping">Frete Grátis!</p>
                }
              </div>
              <img src={ value.thumbnail } alt={ value.title } />
              <h3>Especifichções Técnicas</h3>
              <ul>
                {value.attributes.map((el) => (
                  <li key={ el.id }>
                    { el.name }
                    {' '}
                    -
                    {' '}
                    { el.value_name }
                  </li>
                ))}
              </ul>
              <button
                type="button"
                data-testid="product-detail-add-to-cart"
                value={ JSON.stringify(value) }
                onClick={ addCartList }
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>
        <Comentarios id={ id } />
      </div>
    );
  }
}

DetailsProduct.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  addCartList: PropTypes.func.isRequired,
  cartItens: PropTypes.number.isRequired,
};

export default DetailsProduct;
