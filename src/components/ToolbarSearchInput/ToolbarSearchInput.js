/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { throttle } from 'lodash';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './ToolbarSearchInput.css';

export type Props = {
  className?: string,
  query: string,
  focus: boolean,
  onFocus: () => mixed,
  onBlur: () => mixed,
  onChange: (query: string) => mixed,
  onSearch: (query: string) => mixed
};

class ToolbarSearchInput extends PureComponent {
  props: Props;
  input: HTMLInputElement;

  constructor(props: Props) {
    super(props);

    this.handleSearch = throttle(this.handleSearch, 600);
  }

  handleChange = (event: SyntheticInputEvent) => {
    this.handleSearch(event.target.value);
    this.props.onChange(event.target.value);
  };

  handleClear = () => {
    this.props.onChange('');
    this.focus();
  };

  handleSearch = (query: string) => {
    this.props.onSearch(query);
  };

  handleFocus = () => {
    this.props.onFocus();
  };

  handleBlur = () => {
    this.props.onBlur();
  };

  setInput = (input: HTMLInputElement) => {
    this.input = input;
  };

  focus() {
    this.input.focus();
  }

  renderClearIcon() {
    if (!this.props.query) {
      return null;
    }

    return (
      <Icon
        glyph="close"
        className={styles.clear}
        size={18}
        onClick={this.handleClear}
      />
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <Icon glyph="search" className={styles.icon} size={22} />
        <input
          type="search"
          ref={this.setInput}
          className={styles.input}
          value={this.props.query}
          autoFocus={this.props.focus}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
        {this.renderClearIcon()}
      </div>
    );
  }
}

export default ToolbarSearchInput;
