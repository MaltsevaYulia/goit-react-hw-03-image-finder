import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import {
  Header,
  Searchform,
  Formbutton,
  SearchInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    // this.setState({ query: '', });
  };

  render() {
    const { query } = this.state.query;
    return (
      <Header>
        <Searchform onSubmit={this.handleSubmit}>
          <Formbutton type="submit">
            <BsSearch />
          </Formbutton>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            name="query"
            value={query}
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </Searchform>
      </Header>
    );
  }
}
Searchbar.protoType = {
  onSubmit: PropTypes.func.isRequired,
};
