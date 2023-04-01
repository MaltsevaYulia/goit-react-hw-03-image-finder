import { Loadmore } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ loadMore }) => {
    return <Loadmore onClick={loadMore}>Load more</Loadmore>;
}

Button.protoType = {
  loadMore: PropTypes.func.isRequired,
};