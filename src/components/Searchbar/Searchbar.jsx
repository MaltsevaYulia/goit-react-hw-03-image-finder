import { Component } from 'react';
import {
  Header,
  Searchform,
  Formbutton,
  BtnText,
  SearchInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value.trim() });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    // this.setState({ query: '' });
  };

  render() {
    const { query } = this.state.query;
    return (
      <Header>
        <Searchform onSubmit={this.handleSubmit}>
          <Formbutton type="submit">
            <BtnText>Search</BtnText>
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
