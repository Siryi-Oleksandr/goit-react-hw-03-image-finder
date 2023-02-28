import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import { FcSearch } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
// FcSearch;

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    const { search } = values;
    onSubmit(search);
    resetForm();
  };

  return (
    <header className="searchbar">
      <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
        <Form className="searchForm">
          <button type="submit" className="searchForm-button">
            <FcSearch size="2em" />
          </button>

          <Field
            className="searchForm-input"
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
