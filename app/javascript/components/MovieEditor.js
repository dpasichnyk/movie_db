import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';

import ErrorList from './ErrorList';

@inject( 'commonStore', 'editorStore')
@withRouter
@observer
export default class MovieEditor extends React.Component {

  state = {
    categoryInput: '',
  };

  componentWillMount() {
    this.props.editorStore.setMovieSlug(this.props.match.params.slug);
  }

  componentDidMount() {
    this.props.editorStore.loadInitialData().then(() => {
      this.props.commonStore.loadCategories();
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      this.props.editorStore.setMovieSlug(this.props.match.params.slug);
      this.props.editorStore.loadInitialData();
    }
  }

  changeTitle = e => this.props.editorStore.setTitle(e.target.value);
  changeText = e => this.props.editorStore.setText(e.target.value);

  handleCategoryChange = (value) => {
    this.props.editorStore.setCategories(value);
  };

  submitForm = ev => {
    ev.preventDefault();

    const { editorStore } = this.props;

    editorStore.submit()
      .then(movie => {
        editorStore.reset();
        this.props.history.replace(`/movie/${movie.slug}`)
      });
  };

  render() {
    const { inProgress, categoriesRegistry, errors, title, text } = this.props.editorStore;

    return (
      <div className='mt-3'>
        <div className='container page'>
          <div className='row'>
            <div className='col-md-10 offset-md-1 col-xs-12'>

              <ErrorList errors={errors} />

              <form>
                <fieldset>

                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='text'
                      placeholder='Movie Title'
                      value={title}
                      onChange={this.changeTitle}
                      disabled={inProgress}
                    />
                  </fieldset>

                  <fieldset className='form-group'>
                    <textarea
                      className='form-control'
                      rows='5'
                      placeholder='Write your movie'
                      value={text}
                      onChange={this.changeText}
                      disabled={inProgress}
                    />
                  </fieldset>

                  <fieldset className='form-group'>
                    <div className='category-list'>
                      <Select
                          isMulti={true}
                          isSearcable={true}
                          value={categoriesRegistry}
                          onChange={this.handleCategoryChange}
                          options={this.props.commonStore.categories.map(c => {
                            return( {value: c.id, label: c.name} )}
                          )}
                          placeholder='Categories'
                      />
                    </div>
                  </fieldset>

                  <button
                    className='btn btn-lg pull-xs-right btn-primary'
                    type='button'
                    disabled={inProgress}
                    onClick={this.submitForm}
                  >
                    Submit
                  </button>

                </fieldset>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
