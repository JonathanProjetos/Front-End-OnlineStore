import React, { Component } from 'react';
import FormPayment from '../components/FormPayment';

class Payment extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      cep: '',
      endereco: '',
      complemento: '',
      numero: '',
      cidade: '',
      estado: '',
      check: '',
      btnPayment: true,
    };

    this.handleChangeClient = this.handleChangeClient.bind(this);
  }

  componentDidMount() {
    this.ValidateFromPayment();
  }

  handleChangeClient({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.ValidateFromPayment());
  }

  ValidateFromPayment = () => {
    const {
      cep,
      cidade,
      complemento,
      cpf,
      email,
      endereco,
      estado,
      nome,
      numero,
      telefone,
    } = this.state;

    const booleanValidade = [
      nome.length > 0,
      telefone.length > 0,
      complemento.length > 0,
      cpf.length > 0,
      email.length > 0,
      cidade.length > 0,
      estado.length > 0,
      numero.length > 0,
      cep.length > 0,
      endereco.length > 0,
    ];
    console.log(booleanValidade);
    const resultValidate = booleanValidade.every((el) => el === true);
    console.log(!resultValidate);
    this.setState({
      btnPayment: !resultValidate,
    });
  }

  render() {
    const {
      btnPayment,
      check,
      cep,
      cidade,
      complemento,
      cpf,
      email,
      endereco,
      estado,
      nome,
      numero,
      telefone,
    } = this.state;

    return (
      <section>
        <FormPayment
          btnPayment={ btnPayment }
          cep={ cep }
          cidade={ cidade }
          complemento={ complemento }
          cpf={ cpf }
          email={ email }
          endereco={ endereco }
          estado={ estado }
          nome={ nome }
          numero={ numero }
          check={ check }
          telefone={ telefone }
          handleChangeClient={ this.handleChangeClient }
        />
      </section>
    );
  }
}

export default Payment;
