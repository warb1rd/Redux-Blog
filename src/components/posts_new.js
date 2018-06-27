import React,  { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {

  renderField(field){
    const { meta: { touched, error } } = field
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}        {/*if user has touched the input and focused away from it (field.meta.touched and field.meta.error)*/}
        </div>
      </div>
    )
  }

  onSubmit(values){
    console.log(values);
  }

  render(){
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field 
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field 
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field 
          label="Content"
          name="content"
          component={this.renderField}
        />       
        <button type="submit" className="btn btn-primary"> Submit </button>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};
  if(!values.title) {                                                // Validate inputs from "values"
    errors.title = "Enter a title";
  }

  if(!values.categories) {
    errors.categories = "Enter some categories";
  }

  if(!values.content) {
    errors.content = "Enter some content";
  }
  return errors;
}
export default reduxForm({
  validate,                                       // validate: validate,
  form: "PostsNewForm"
})(PostsNew);

//redux-form is responsible for handling state and validation. Not responsible for making post request