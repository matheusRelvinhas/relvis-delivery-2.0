'use client';

import { useGlobalContext } from '@/Context/store';
import AddressLookup from '../AddressLookup/AddressLookup';
import StyledButton from '../StyledButton/StyledButton';

interface FormContactProps {}

const FormContact: React.FC<FormContactProps> = () => {
  const {
    dataCss,
    road,
    number,
    complement,
    district,
    city,
    state,
    setRoad,
    setNumber,
    setComplement,
    setDistrict,
    setCity,
    setState,
    handleFinalize,
    setName,
    paymentMethod,
    setPaymentMethod,
    troco,
    setTroco,
    name,
    cellphone,
    setCellphone,
  } = useGlobalContext();

  return (
    <form onSubmit={handleFinalize}>
      <input
        type="text"
        placeholder="nome"
        value={name}
        required
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="number"
        placeholder="telefone"
        value={cellphone}
        required
        onChange={(event) => setCellphone(event.target.value)}
      />
      <AddressLookup />
      <input
        type="text"
        placeholder="rua"
        value={road}
        required
        onChange={(event) => setRoad(event.target.value)}
      />
      <input
        type="text"
        placeholder="numero"
        value={number}
        required
        onChange={(event) => setNumber(event.target.value)}
      />
      <input
        type="text"
        placeholder="complemento, ex: ap 102"
        value={complement}
        onChange={(event) => setComplement(event.target.value)}
      />
      <input
        type="text"
        placeholder="bairro"
        value={district}
        required
        onChange={(event) => setDistrict(event.target.value)}
      />
      <input
        type="text"
        placeholder="cidade"
        value={city}
        required
        onChange={(event) => setCity(event.target.value)}
      />
      <input
        type="text"
        placeholder="estado"
        value={state}
        required
        onChange={(event) => setState(event.target.value)}
      />
      <select
        onChange={(event) => setPaymentMethod(event.target.value)}
        required
      >
        <option value="">Selecione um método de pagamento</option>
        <option value="dinheiro">Dinheiro</option>
        <option value="credito">Crédito</option>
        <option value="debito">Débito</option>
        <option value="pix">Pix</option>
      </select>
      {paymentMethod === 'dinheiro' && (
        <input
          type="number"
          placeholder="troco para quanto?"
          value={troco}
          onChange={(event) => setTroco(event.target.value)}
        />
      )}
      <button type="submit">
        <h1>Finalizar pedido</h1>
      </button>
    </form>
  );
};

export default FormContact;
