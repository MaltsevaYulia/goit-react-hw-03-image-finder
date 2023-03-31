import { Loadmore } from './Button.styled';

export const Button = ({ loadMore }) => {
    return <Loadmore onClick={loadMore}>Load more</Loadmore>;
}